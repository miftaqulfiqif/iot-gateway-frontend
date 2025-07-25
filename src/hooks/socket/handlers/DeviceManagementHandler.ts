import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";
import { Devices } from "@/models/DeviceModel";

export class DeviceManagementHandler extends BaseHandler {
  private setData: any;
  private setIsScaning: any;

  constructor(socket: Socket, setData: any, setIsScanning: any) {
    super(socket);
    this.setData = setData;
    this.setIsScaning = setIsScanning;
  }

  register(): void {
    this.socket.on("found_devices", (payload: { devices?: Devices[] }) => {
      if (payload?.devices && Array.isArray(payload.devices)) {
        this.setData((prev: any) => {
          const newDevices = payload.devices || [];

          const existingMacs = new Set(prev.map((d: any) => d.id));
          const filteredNew = newDevices.filter((d) => !existingMacs.has(d.id));

          return [...prev, ...filteredNew];
        });
      } else {
        console.warn("⚠️ Invalid device payload received:", payload);
      }
    });
  }

  handleScan() {
    this.socket.emit("scan", {
      user_id: "UserTest",
      data: {
        topic: "iotgateway/{id-unik}/bluetooth/scan",
        payload: "start",
      },
    });
  }

  unregister(): void {}
}
