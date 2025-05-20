import { Devices } from "@/models/DeviceModel";
import axios from "axios";
import { useState } from "react";

export const UseDevices = () => {
  const [devices, setDevices] = useState<Devices[]>([]);

  const deviceResponse = axios.get("http://localhost:3000/api/devices", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  deviceResponse.then((response) => {
    setDevices(response.data.data);
  });

  return {
    devices,
  };
};
