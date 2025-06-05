import { Socket } from "socket.io-client";
import { BMIModel } from "@/models/Devices/BMIModel";

export class BMIHandler {
  constructor(private socket: Socket, private setBMI: (bmi: BMIModel) => void) {
    this.listen();
  }

  private listen() {
    this.socket.on("listen_bmi", (payload: { data_bmi?: BMIModel[] }) => {
      if (payload?.data_bmi?.[0]) {
        this.setBMI(payload.data_bmi[0]);
      }
    });
  }

  public start(userId: string, height: number, age: number, gender: string) {
    this.socket.emit("start_bmi", {
      user_id: userId,
      data: {
        topic: "ble/start_bmi",
        payload: "1",
        patient: { height, age, gender },
      },
    });
  }
}
