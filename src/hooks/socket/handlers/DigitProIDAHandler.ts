import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";

export class DigitProIDAHandler extends BaseHandler {
  private mac: string;
  private setData: any;
  private setRealtime: any;

  constructor(
    socket: Socket,
    mac: string,
    setData: (data: any) => void,
    setRealtime: (data: any[]) => void
  ) {
    super(socket);
    this.mac = mac;
    this.setData = setData;
    this.setRealtime = setRealtime;
    this.register();
  }

  register() {
    this.socket.on("listen_digitproida_result", (payload) => {
      console.log("[DigitProIDA] Reviced:", payload);
      const deviceMac = payload.data_digitproida[0].mac;
      if (deviceMac !== this.mac) return;
      if (!payload?.data_digitproida) return;

      const last = payload.data_digitproida.at(-1);
      const processed = payload.data_digitproida.map(
        (item: any, index: number) => ({
          index,
          weight_mother: item.weight_mother,
          weight_baby: item.weight_baby,
        })
      );

      this.setData({
        weight_mother: last?.weight_mother ?? 0,
        weight_baby: last?.weight_baby ?? 0,
      });

      this.setRealtime(processed);
    });
  }

  unregister() {
    this.socket.off("listen_digitproida_result");
  }
}
