import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";

export class PTBDigiHandler extends BaseHandler {
  private mac: string;
  private setData: (data: { distance: number }) => void;

  constructor(socket: Socket, mac: string, setData: (data: any) => void) {
    super(socket);
    this.mac = mac;
    this.setData = setData;
    this.register();
  }

  register() {
    this.socket.on("listen_ptb_digi", (payload) => {
      console.log("[PTB Digi] Received Result:", payload);
      const data = payload?.data_ptb_digi;
      const deviceMac = data?.mac;
      if (deviceMac !== this.mac) return;

      this.setData({
        distance: data?.distance ?? 0,
      });
    });
  }

  unregister() {
    this.socket.off("listen_ptb_digi");
  }
}
