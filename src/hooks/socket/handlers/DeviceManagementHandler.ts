import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";
import { Devices } from "@/models/DeviceModel";

export class DeviceManagementHandler extends BaseHandler {
  private setData: any;
  private setIsScanning: any;
  private gatewayId: string;
  private scanTimeout: NodeJS.Timeout | null = null;

  constructor(
    socket: Socket,
    setData: any,
    setIsScanning: React.Dispatch<React.SetStateAction<boolean>>,
    gatewayId: string
  ) {
    super(socket);
    this.setData = setData;
    this.setIsScanning = setIsScanning;
    this.gatewayId = gatewayId;
  }

  register(): void {
    this.socket.on("found_devices", (payload: { devices?: Devices[] }) => {
      if (payload?.devices && Array.isArray(payload.devices)) {
        console.log("Devices found:", payload.devices);

        this.resetScanTimeout();

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
    this.setIsScanning(true);
    this.socket.emit("scan", {
      gateway_sn: this.gatewayId,
      data: {
        topic: `iotgateway/${this.gatewayId}/bluetooth/scan/set`,
        payload: "start",
      },
    });

    // Pasang timer auto stop 5 detik kalau tidak ada data
    this.resetScanTimeout();
  }

  handleDisconnectBluetooth(
    gatewaySn: string,
    mac: string,
    deviceFunction: string
  ) {
    this.socket.emit("disconnect_bluetooth_device", {
      gateway_sn: gatewaySn,
      data: {
        topic: `iotgateway/${gatewaySn}/bluetooth/remove_device`,
        payload: {
          mac_address: mac,
          device_function: deviceFunction,
        },
      },
    });
  }

  handleDisconnectTcpIp(ip: string, deviceFunction: string) {
    this.socket.emit("disconnect_device", {
      gateway_sn: this.gatewayId,
      data: {
        topic: `iotgateway/${this.gatewayId}/bluetooth/remove_device`,
        payload: {
          ip_address: ip,
          device_function: deviceFunction,
        },
      },
    });
  }

  handleGetIpAddressIotGateway() {
    this.socket.emit("get_ip_address_iot_gateway", {
      gateway_sn: this.gatewayId,
      data: {
        topic: `iotgateway/${this.gatewayId}/ip/get`,
        payload: "get",
      },
    });
  }

  unregister(): void {
    this.socket.off("found_devices");
    if (this.scanTimeout) {
      clearTimeout(this.scanTimeout);
    }
  }

  private resetScanTimeout() {
    if (this.scanTimeout) {
      clearTimeout(this.scanTimeout);
    }

    this.scanTimeout = setTimeout(() => {
      console.log("⏱️ No devices found in 5s, stop scanning.");
      this.setIsScanning(false);
    }, 5000);
  }
}
