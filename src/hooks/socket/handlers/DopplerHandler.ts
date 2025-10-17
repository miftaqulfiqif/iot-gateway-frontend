import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";

export class DopplerHandler extends BaseHandler {
  private mac: string;
  private setData: (data: {
    heart_rate: number;
    sound_quality: string;
    battery_level: number;
  }) => void;
  private setRealtime: any;

  constructor(
    socket: Socket,
    mac: string,
    setData: (data: any) => void,
    setRealtime: (data: any[]) => void
  ) {
    super(socket);
    this.mac = mac;
    this.setData = setData;
    this.setRealtime = setRealtime;
    this.register();
  }

  register(): void {
    this.socket.on("listen_doppler", (payload) => {
      console.log("[Doppler] Reviced:", payload);
      const data = payload.data_doppler;

      console.log("Data Doppler:", data);

      this.setData({
        heart_rate: data.heart_rate,
        sound_quality: data.sound_quality,
        battery_level: data.battery_level,
      });

      this.setRealtime((prev: any) => {
        if (data.sound_quality !== "good") return prev;
        let heartRateSum = 0;
        let heartRateCount = 0;

        prev.forEach((item: any) => {
          heartRateSum += item.heart_rate;
          heartRateCount += 1;
        });

        const heartRateAvg =
          heartRateCount > 0 ? heartRateSum / heartRateCount : 0;

        const next = [
          ...prev,
          {
            index: prev.length,
            heart_rate: data.heart_rate,
            heart_rate_avg: parseFloat(heartRateAvg.toFixed(1)),
          },
        ];
        return next;
      });
    });
  }

  unregister(): void {
    this.socket.off("listen_doppler");
  }
}
