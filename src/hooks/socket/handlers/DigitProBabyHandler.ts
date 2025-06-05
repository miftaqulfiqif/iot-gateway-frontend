import { Socket } from "socket.io-client";
import { DigitProBabyModel } from "@/models/Devices/DigitProBabyModel";

export class DigitProBabyHandler {
  constructor(
    private socket: Socket,
    private setBaby: (baby: DigitProBabyModel) => void
  ) {
    this.listen();
    this.listenRealtime();
  }

  private listen() {
    this.socket.on(
      "listen_digitprobaby",
      (payload: { data_baby?: DigitProBabyModel[] }) => {
        if (payload?.data_baby?.[0]) {
          this.setBaby(payload.data_baby[0]);
        }
      }
    );
  }

  private listenRealtime() {
    this.socket.on(
      "listen_digitprobaby_realtime",
      (payload: { data_baby?: DigitProBabyModel[] }) => {
        if (payload?.data_baby?.[0]) {
          this.setBaby(payload.data_baby[0]);
        }
      }
    );
  }

  public start(userId: string) {
    this.socket.emit("start_digitpro_baby", {
      user_id: userId,
      data: {
        topic: "ble/start_digitpro_baby",
        payload: "1",
      },
    });
  }
}
