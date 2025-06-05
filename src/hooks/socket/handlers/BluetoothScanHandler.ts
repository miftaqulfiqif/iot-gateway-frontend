import { Socket } from "socket.io-client";
import { Devices } from "@/models/DeviceModel";
import { Data } from "@/models/DataModel";

export class BluetoothScanHandler {
  private socket: Socket;
  private userId: string;
  private setDevices: React.Dispatch<React.SetStateAction<Devices[]>>;
  private setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
  private scanTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;

  constructor(
    socket: Socket,
    userId: string,
    setDevices: React.Dispatch<React.SetStateAction<Devices[]>>,
    setIsScanning: React.Dispatch<React.SetStateAction<boolean>>,
    scanTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) {
    this.socket = socket;
    this.userId = userId;
    this.setDevices = setDevices;
    this.setIsScanning = setIsScanning;
    this.scanTimeoutRef = scanTimeoutRef;

    this.listenFoundDevices();
  }

  private listenFoundDevices() {
    this.socket.on("found_devices", (payload: { devices?: Devices[] }) => {
      if (payload?.devices && Array.isArray(payload.devices)) {
        console.log("📡 Device(s) received:", payload.devices);

        this.setDevices((prevDevices) => {
          const newDevices = payload.devices || [];

          const existingMacs = new Set(prevDevices.map((d) => d.id));
          const filteredNew = newDevices.filter((d) => !existingMacs.has(d.id));

          return [...prevDevices, ...filteredNew];
        });
      } else {
        console.warn("⚠️ Invalid device payload received:", payload);
      }

      if (this.scanTimeoutRef.current) {
        clearTimeout(this.scanTimeoutRef.current);
      }

      this.scanTimeoutRef.current = setTimeout(() => {
        this.setIsScanning(false);
        console.log("No device found after 3s, scanning stopped.");
      }, 3000);
    });
  }

  public startScan() {
    this.setDevices([]);
    this.setIsScanning(true);
    this.socket.emit("scan", <Data>{
      user_id: this.userId,
      data: {
        topic: "IoTGateway/{ID-Unik}/Bluetooth/Scan",
        payload: "Start",
      },
    });
  }

  public cleanup() {
    this.socket.off("found_devices");
  }
}
