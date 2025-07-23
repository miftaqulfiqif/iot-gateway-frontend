import { io, Socket } from "socket.io-client";
import { BaseHandler } from "./handlers/BaseHandler";

export class SocketManager {
  private socket: Socket;
  private handler: BaseHandler[] = [];

  constructor(private url: string, private userId: string) {
    this.socket = io(this.url, {
      reconnection: true,
      reconnectionAttempts: 3,
      query: { user_id: this.userId },
    });

    this.socket.on("connect", () => {
      console.log("Socket connected : ", this.socket?.id);
      this.socket?.emit("join", this.userId);
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
