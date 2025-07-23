import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";

type RealtimeData = { index: number; weight: number };

export class DigitProBabyHandler extends BaseHandler {
  private mac: string;
  private setData: (data: { weight: number }) => void;
  private setRealtime: (
    data: RealtimeData[] | ((prev: RealtimeData[]) => RealtimeData[])
  ) => void;

  constructor(
    socket: Socket,
    mac: string,
    setData: (data: any) => void,
    setRealtime: (
      data: RealtimeData[] | ((prev: RealtimeData[]) => RealtimeData[])
    ) => void
  ) {
    super(socket);
    this.mac = mac;
    this.setData = setData;
    this.setRealtime = setRealtime;
    this.register();
  }

  register() {
    this.socket.on("listen_digitprobaby_result", (payload) => {
      console.log("[DigitProBaby] Received Result:", payload);
      const data = payload?.data_digitprobaby;
      if (!Array.isArray(data) || data.length === 0) return;

      const deviceMac = data[0]?.mac;
      if (deviceMac !== this.mac) return;

      const last = data.at(-1);
      this.setData({ weight: last?.weight ?? 0 });
    });

    this.socket.on("listen_digitprobaby_realtime", (payload) => {
      console.log("[DigitProBaby] Received Realtime:", payload);
      const data = payload?.data_digitprobaby_realtime;
      if (!Array.isArray(data) || data.length === 0) return;

      const latest = data[0];
      if (latest?.mac !== this.mac) return;

      this.setRealtime((prev) => {
        const next = [
          ...prev,
          {
            index: prev.length,
            weight: latest.weight,
          },
        ];
        return next.slice(-100);
      });
    });
  }

  handleTare(gatewayId: string) {
    this.socket.emit("tare_digit_pro_baby", {
      user_id: gatewayId,
      data: {
        topic: "iotgateway/{id-unik}/bluetooth/digitpro_baby_tare",
        payload: "tare",
      },
    });
  }

  unregister() {
    this.socket.off("listen_digitprobaby_result");
    this.socket.off("listen_digitprobaby_realtime");
  }
}
