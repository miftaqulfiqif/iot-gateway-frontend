import { io, Socket } from "socket.io-client";
import { BaseHandler } from "./handlers/BaseHandler";
import mqtt, { MqttClient } from "mqtt";

export class SocketManager {
  private socket: Socket;
  private handler: BaseHandler[] = [];

  constructor(private url: string, private gatewaySn: string) {
    this.socket = io(this.url, {
      reconnection: true,
      reconnectionAttempts: 3,
      query: { gateway_sn: this.gatewaySn },
    });

    this.socket.on("connect", () => {
      console.log("Socket connected : ", this.socket.id);
      console.log("Room connected : ", this.gatewaySn);
      this.socket?.emit("join", this.gatewaySn);
    });

    this.socket.onAny((event, ...args) => {
      console.log("Socket event:", event, args);
    });
  }

  registerHandler(handler: BaseHandler) {
    handler.register();
    this.handler.push(handler);
  }

  unregisterHandler(handler: BaseHandler) {
    handler.unregister();
    this.handler = this.handler.filter((h) => h !== handler);
  }

  getSocket(): Socket {
    return this.socket;
  }

  disconnect() {
    this.socket.disconnect();
  }
}
