import { io, Socket } from "socket.io-client";

export class SocketManager {
  private socket: Socket;

  constructor(private userId: string, private url: string) {
    this.socket = io(this.url, {
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnection: true,
    });

    this.socket.on("connect", () => {
      console.log("✅ Socket connected:", this.socket.id);
      this.socket.emit("join", this.userId);
    });
  }

  getSocket() {
    return this.socket;
  }

  disconnect() {
    this.socket.disconnect();
  }
}
