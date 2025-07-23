import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";

export class DS001Handler extends BaseHandler {
  private ip: string;
  private setData: any;
  private setDataNibp: any;

  constructor(socket: Socket, ip: string, setData: any, setDataNibp: any) {
    super(socket);
    this.ip = ip;
    this.setData = setData;
    this.setDataNibp = setDataNibp;
    this.register;
  }

  register(): void {
    this.socket.on("listen_ds001", (payload: { data_ds001?: any }) => {
      const deviceIp = payload.data_ds001[0].ip;
      if (deviceIp !== this.ip) return;
      if (!payload?.data_ds001) return;

      const last = payload.data_ds001.at(-1);

      this.setData({
        systolic: last.systolic,
        diastolic: last.diastolic,
        mean: last.mean,
        pulse_rate: last.pulse_rate,
        temp: last.temp,
        spo2: last.spo2,
        pr_spo2: last.pr_spo2,
        rr: last.rr,
      });
    });

    this.socket.on("listen_ds001_nibp", (payload: { data_ds001_nibp: any }) => {
      const deviceIp = payload.data_ds001_nibp[0].ip;
      console.log("DATA : ", deviceIp);
      if (deviceIp !== this.ip) return;
      if (!payload?.data_ds001_nibp) return;

      const last = payload.data_ds001_nibp.at(-1);

      this.setDataNibp({
        systolic: last?.systolic,
        diastolic: last?.diastolic,
        mean: last?.mean,
      });
    });
  }

  unregister(): void {
    this.socket.off("listen_ds001");
    this.socket.off("listen_ds001_nibp");
  }
}
