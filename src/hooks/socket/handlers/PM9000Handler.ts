import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";
import { PM9000Model } from "@/models/Devices/PM9000Model";

export class PM9000Handler extends BaseHandler {
  private ip: string;
  private setData: any;
  private setDataNibp: any;

  constructor(socket: Socket, ip: string, setData: any, setDataNibp: any) {
    super(socket);
    this.ip = ip;
    this.setData = setData;
    this.setDataNibp = setDataNibp;
    this.register();
  }

  register(): void {
    this.socket.on(
      "listen_pm9000",
      (payload: { data_pm9000: PM9000Model[] }) => {
        const deviceIp = payload.data_pm9000[0].ip;
        if (deviceIp !== this.ip) return;
        if (!payload?.data_pm9000) return;

        const last = payload.data_pm9000.at(-1);

        this.setData({
          ecg_bpm: last?.ecg_bpm,
          ecg_bpm_spo2: last?.ecg_bpm_spo2,
          spo2: last?.spo2,
          resp: last?.resp,
          temp1: last?.temp1,
          temp2: last?.temp2,
          delta_temp: last?.delta_temp,
        });
      }
    );

    this.socket.on(
      "listen_pm9000_nibp",
      (payload: { data_pm9000_nibp: any }) => {
        const deviceIp = payload.data_pm9000_nibp[0].ip;
        console.log("DATA : ", deviceIp);
        if (deviceIp !== this.ip) return;
        if (!payload?.data_pm9000_nibp) return;

        const last = payload.data_pm9000_nibp.at(-1);

        this.setDataNibp({
          systolic: last?.systolic,
          diastolic: last?.diastolic,
          mean: last?.mean,
        });
      }
    );
  }

  unregister(): void {
    this.socket.off("listen_pm9000");
    this.socket.off("listen_pm9000_nibp");
  }
}
