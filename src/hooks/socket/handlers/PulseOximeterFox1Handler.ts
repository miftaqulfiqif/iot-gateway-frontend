import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";

export class PulseOximeterFox1Handler extends BaseHandler {
  private mac: string;
  private setData: (data: { spo2: number; pulse_rate: number }) => void;

  constructor(socket: Socket, mac: string, setData: (data: any) => void) {
    super(socket);
    this.mac = mac;
    this.setData = setData;
    this.register();
  }

  register() {
    this.socket.on("listen_pulse_oximeter_fox_1", (payload) => {
      console.log("[Pulse Oximeter Fox 1] Received Result:", payload);
      const data = payload?.data_pulse_oximeter_fox_1;
      const deviceMac = data?.mac;
      if (deviceMac !== this.mac) return;

      this.setData({
        spo2: data?.spo2 ?? 0,
        pulse_rate: data?.pulse_rate ?? 0,
      });
    });
  }

  unregister() {
    this.socket.off("listen_pulse_oximeter_fox_1");
  }
}
