import { Devices } from "@/models/DeviceModel";
import axios from "axios";
import { useState } from "react";

export const useDevices = () => {
  const [devices, setDevices] = useState<Devices[]>([]);

  const getAllDevices = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/devices", {
        withCredentials: true,
      });
      setDevices(response.data.data);
    } catch (error) {
      console.error("Error fetching babies:", error);
    }
  };

  return {
    getAllDevices,
    devices,
  };
};
