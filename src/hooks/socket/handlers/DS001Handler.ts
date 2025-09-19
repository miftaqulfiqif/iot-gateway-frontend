import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";
import { MqttManager } from "../MqttManager";

type PlethPoint = { time: number; value: number };

const SAMPLE_INTERVAL = 1; // ms, sampling rate (100 Hz)
const MAX_POINTS = 5000; // window chart realtime (20 detik @100Hz)

export class DS001Handler extends BaseHandler {
  private ip: string;
  private gatewaySn: string;
  private mqtt: MqttManager;
  private setData: React.Dispatch<React.SetStateAction<any>>;
  private setDataNibp: React.Dispatch<React.SetStateAction<any>>;
  private setDataPleth: React.Dispatch<
    React.SetStateAction<{ pleth_data: PlethPoint[] }>
  >;
  private bufferRef: React.MutableRefObject<number[]>;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private sampleCounter = 0;
  private isRegistered = false;

  constructor(
    socket: Socket,
    mqtt: MqttManager,
    ip: string,
    setData: React.Dispatch<React.SetStateAction<any>>,
    setDataNibp: React.Dispatch<React.SetStateAction<any>>,
    setDataPleth: React.Dispatch<
      React.SetStateAction<{ pleth_data: PlethPoint[] }>
    >,
    bufferRef: React.MutableRefObject<number[]>,
    gatewaySn: string
  ) {
    super(socket);
    this.mqtt = mqtt;
    this.gatewaySn = gatewaySn;
    this.ip = ip;
    this.setData = setData;
    this.setDataNibp = setDataNibp;
    this.setDataPleth = setDataPleth;
    this.bufferRef = bufferRef;

    this.register();
  }

  register(): void {
    if (this.isRegistered) return; // pastikan tidak register 2x
    this.isRegistered = true;

    // ---------- Socket listeners ----------
    this.socket.on("listen_ds001", this.handleSocketData);
    this.socket.on("listen_ds001_nibp", this.handleSocketNIBP);

    // ---------- MQTT pleth ----------
    const topic = `iotgateway/${this.gatewaySn}/tcpip/diagnostic_station_001/pleth`;
    this.mqtt.subscribe(topic, this.handleMQTTPleth);

    // ---------- Interval untuk push ke chart ----------
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        let values: number[] = [];

        if (this.bufferRef.current.length > 0) {
          // ambil chunk dari buffer
          values = this.bufferRef.current.splice(0, 2);
        } else {
          // device mati → isi dengan 0
          values = [0];
        }

        this.setDataPleth((prev) => {
          const updated = [...prev.pleth_data];

          values.forEach((val) => {
            updated.push({ time: this.sampleCounter++, value: val });
          });

          return { pleth_data: updated.slice(-MAX_POINTS) };
        });

        // batasi buffer agar tidak terlalu besar (opsional safety net)
        if (this.bufferRef.current.length > MAX_POINTS * 2) {
          this.bufferRef.current.splice(
            0,
            this.bufferRef.current.length - MAX_POINTS * 2
          );
        }
      }, SAMPLE_INTERVAL);
    }
  }

  unregister(): void {
    if (!this.isRegistered) return;

    this.socket.off("listen_ds001", this.handleSocketData);
    this.socket.off("listen_ds001_nibp", this.handleSocketNIBP);

    const topic = `iotgateway/${this.gatewaySn}/tcpip/diagnostic_station_001/pleth`;
    this.mqtt.unsubscribe(topic);

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.isRegistered = false;
  }

  private handleSocketData = (payload: { data_ds001?: any[] }) => {
    if (!payload?.data_ds001?.length) return;
    const last = payload.data_ds001.at(-1);
    if (!last || last.ip !== this.ip) return;

    this.setData({
      systolic: last.systolic ?? null,
      diastolic: last.diastolic ?? null,
      mean: last.mean ?? null,
      pulse_rate: last.pulse_rate ?? null,
      temp: last.temp ?? null,
      spo2: last.spo2 ?? null,
      pr_spo2: last.pr_spo2 ?? null,
      rr: last.rr ?? null,
    });
  };

  private handleSocketNIBP = (payload: { data_ds001_nibp?: any[] }) => {
    if (!payload?.data_ds001_nibp?.length) return;
    const last = payload.data_ds001_nibp.at(-1);
    if (!last || last.ip !== this.ip) return;

    this.setDataNibp({
      systolic: last.systolic ?? null,
      diastolic: last.diastolic ?? null,
      mean: last.mean ?? null,
    });
  };

  // ---------- Handler MQTT ----------
  private handleMQTTPleth = (message: any) => {
    try {
      const plethArray = message?.data?.pleth;
      const ipAddress = message?.data?.ip_address;

      if (!plethArray || !Array.isArray(plethArray)) return;
      if (ipAddress !== this.ip) return;

      const downsampled = plethArray.filter((_, i) => i % 2 === 0); // ambil 1 dari 2 sampel (50 Hz)

      const smoothed = smooth(downsampled, 3);

      // push ke buffer
      this.bufferRef.current.push(...smoothed);
    } catch (err) {
      console.error("MQTT pleth parse error:", err);
    }
  };
}

// --------- Moving average filter ---------
function smooth(values: number[], windowSize = 3): number[] {
  const result: number[] = [];
  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const subset = values.slice(start, i + 1);
    const avg = subset.reduce((a, b) => a + b, 0) / subset.length;
    result.push(avg);
  }
  return result;
}
