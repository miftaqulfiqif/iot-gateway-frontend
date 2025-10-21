import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";

export class MTRBaby002Handler extends BaseHandler {
  private mac: string;
  private setData: (data: { baby_height: number }) => void;

  constructor(socket: Socket, mac: string, setData: (data: any) => void) {
    super(socket);
    this.mac = mac;
    this.setData = setData;
    this.register();
  }

  register() {
    this.socket.on("listen_mtr_baby002", (payload) => {
      console.log("[MTR Baby-002] Received Result:", payload);
      const data = payload?.data_mtr_baby002;
      const deviceMac = data?.mac;
      if (deviceMac !== this.mac) return;

      this.setData({
        baby_height: data?.baby_height ?? 0,
      });
    });
  }

  unregister() {
    this.socket.off("listen_mtr_baby002");
  }
}
