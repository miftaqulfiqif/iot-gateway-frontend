import { Socket } from "socket.io-client";
import { DopplerModel } from "@/models/Devices/DopplerModel";

export class DopplerHandler {
  constructor(
    private socket: Socket,
    private setData: (data: DopplerModel) => void
  ) {
    this.listen();
  }

  private listen() {
    this.socket.on(
      "listen_doppler",
      (payload: { data_doppler?: DopplerModel[] }) => {
        const data = payload?.data_doppler?.[0];
        if (data) {
          this.setData({
            fhr: data.fhr,
            soundQuality: data.soundQuality,
            batteryLevel: data.batteryLevel,
          });
        }
      }
    );
  }

  public start(userId: string) {
    this.socket.emit("start_doppler", {
      user_id: userId,
      data: {
        topic: "ble/start_doppler",
        payload: "1",
      },
    });
  }

  public stop(userId: string) {
    this.socket.emit("stop_doppler", {
      user_id: userId,
      data: {
        topic: "ble/stop_doppler",
        payload: "1",
      },
    });
  }
}
