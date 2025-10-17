import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";

export class Mft01Handler extends BaseHandler {
  private mac: string;
  private setData: (data: { temperature: number }) => void;

  constructor(socket: Socket, mac: string, setData: (data: any) => void) {
    super(socket);
    this.mac = mac;
    this.setData = setData;
    this.register();
  }

  register() {
    this.socket.on("listen_mft01", (payload) => {
      console.log("[Mft01] Received Result:", payload);
      const data = payload?.data_mft01;
      const deviceMac = data?.mac;
      if (deviceMac !== this.mac) return;

      this.setData({ temperature: data?.temperature ?? 0 });
    });
  }

  unregister() {
    this.socket.off("listen_mft01");
  }
}
