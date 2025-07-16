import { useToast } from "@/context/ToastContext";
import { Devices } from "@/models/DeviceModel";
import axios from "axios";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useDevices = () => {
  const { showToast } = useToast();
  const [devices, setDevices] = useState<Devices[]>([]);

  const getAllDevices = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/devices`, {
        withCredentials: true,
      });
      setDevices(response.data.data);
    } catch (error) {
      console.error("Error fetching babies:", error);
    }
  }, []);

  const deleteDeviceBluetooth = async (deviceId: string) => {
    try {
      await axios.delete(`${apiUrl}/api/devices/disconnect-ble/${deviceId}`, {
        withCredentials: true,
      });
      showToast(null, "Device disconnected successfully", "success");
      await getAllDevices();
    } catch (error) {
      console.error("Error deleting device:", error);
      showToast(null, "Failed to disconnect device", "error");
    }
  };
  const deleteDeviceTcpIP = async (deviceId: string) => {
    try {
      await axios.delete(`${apiUrl}/api/devices/disconnect-tcpip/${deviceId}`, {
        withCredentials: true,
      });
      showToast(null, "Device disconnected successfully", "success");
      await getAllDevices();
    } catch (error) {
      console.error("Error deleting device:", error);
      showToast(null, "Failed to disconnect device", "error");
    }
  };

  const updateDeviceBluetooth = async (deviceId: string) => {
    try {
      alert("Device updated successfully! : " + deviceId);
    } catch (error) {
      console.error("Error updating device:", error);
    }
  };
  const updateDeviceTcpIP = async (deviceId: string) => {
    try {
      alert("Device updated successfully! : " + deviceId);
    } catch (error) {
      console.error("Error updating device:", error);
    }
  };

  return {
    getAllDevices,
    devices,
    deleteDeviceBluetooth,
    deleteDeviceTcpIP,
    updateDeviceBluetooth,
    updateDeviceTcpIP,
  };
};
