import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";

export class DS001Handler extends BaseHandler {
  private ip: string;
  private setData: any;
  private setDataNibp: any;
  private setDataPleth: any;

  constructor(
    socket: Socket,
    ip: string,
    setData: any,
    setDataNibp: any,
    setDataPleth: any
  ) {
    super(socket);
    this.ip = ip;
    this.setData = setData;
    this.setDataNibp = setDataNibp;
    this.setDataPleth = setDataPleth;
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

    this.socket.on(
      "listen_ds001_pleth",
      (payload: { data_ds001_pleth: any }) => {
        const data = payload.data_ds001_pleth[0];
        const deviceIp = data?.ip;

        console.log("DATA : ", data);
        console.log("Device IP : ", deviceIp);

        if (!data || deviceIp !== this.ip) return;

        const lastPleth = data.pleth_data?.at(-1);

        this.setDataPleth({
          pleth_data: data.pleth_data || [],
        });
      }
    );
  }

  unregister(): void {
    this.socket.off("listen_ds001");
    this.socket.off("listen_ds001_nibp");
    this.socket.off("listen_ds001_pleth");
  }
}
