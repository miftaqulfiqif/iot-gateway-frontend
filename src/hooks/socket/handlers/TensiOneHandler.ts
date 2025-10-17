import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";

export class TensiOneHandler extends BaseHandler {
  private mac: string;
  private setData: (data: {
    systolic: number;
    diastolic: number;
    map: number;
    pulse_rate: number;
    spo2: number;
    user_type: number;
    error_status: number;
  }) => void;

  constructor(socket: Socket, mac: string, setData: (data: any) => void) {
    super(socket);
    this.mac = mac;
    this.setData = setData;
    this.register();
  }

  register() {
    this.socket.on("listen_tensione", (payload) => {
      console.log("[TensiOne] Received Result:", payload);
      const data = payload?.data_tensione;
      const deviceMac = data?.mac;
      if (deviceMac !== this.mac) return;

      this.setData({
        systolic: data?.systolic ?? 0,
        diastolic: data?.diastolic ?? 0,
        map: data?.map ?? 0,
        pulse_rate: data?.pulse_rate ?? 0,
        spo2: data?.spo2 ?? 0,
        error_status: data?.error_status ?? 0,
        user_type: data?.user_type ?? 0,
      });
    });
  }

  unregister() {
    this.socket.off("listen_tensione");
  }
}
