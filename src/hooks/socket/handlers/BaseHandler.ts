import { Socket } from "socket.io-client";

export abstract class BaseHandler {
  protected socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  abstract register(): void;
  abstract unregister(): void;
}
