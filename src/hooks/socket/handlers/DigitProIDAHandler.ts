import { Socket } from "socket.io-client";
import { DigitProIDAModel } from "@/models/Devices/DigitProIDAModel";

export class DigitProIDAHandler {
  constructor(
    private socket: Socket,
    private setWeight: (data: DigitProIDAModel) => void
  ) {
    this.listen();
  }

  private listen() {
    this.socket.on(
      "listen_digitproida",
      (payload: { data_digitproida?: DigitProIDAModel[] }) => {
        const data = payload?.data_digitproida?.[0];
        if (data) {
          this.setWeight({
            babyWeight: data.babyWeight,
            adultWeight: data.adultWeight,
          });
        }
      }
    );
  }

  public start(userId: string) {
    this.socket.emit("start_digit_pro_ida", {
      user_id: userId,
      data: {
        topic: "ble/start_digitproidanew",
        payload: "1",
      },
    });
  }
}
