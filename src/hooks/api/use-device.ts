import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { DetailDevice, Devices, PatientMonitoringDevices } from "@/models/DeviceModel";
import axios from "axios";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useDevices = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [devices, setDevices] = useState<Devices[]>([]);
  const [detailDevice, setDetailDevice] = useState<DetailDevice>();
  const [patientMonitoringDevices, setPatientMonitoringDevices] = useState<
    PatientMonitoringDevices[]
  >([]);

  const getAllDevices = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/devices-connected`, {
        withCredentials: true,
        params: {
          gateway_id: user?.gateway?.id,
        },
      });
      setDevices(response.data.data);
    } catch (error) {
      console.error("Error fetching device connected:", error);
    }
  }, []);

  const getDetailDevice = useCallback(async (deviceId: string) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/detail-device/${deviceId}`,
        {
          withCredentials: true,
        }
      );
      setDetailDevice(response.data.data);
    } catch (error) {
      console.error("Error get detail device connected:", error);
    }
  }, []);

  const deleteDeviceBluetooth = async (deviceId: string) => {
    try {
      await axios.delete(`${apiUrl}/api/device/delete/${deviceId}`, {
        withCredentials: true,
      });
      showToast(null, "Delete device successfully", "success");
      await getAllDevices();
    } catch (error) {
      console.error("Error deleting device:", error);
      showToast(null, "Failed to deleted device", "error");
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

  const getPatientMonitoringDevices = useCallback(
    async (query: string, device_function: string) => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/device-connected/monitor`,
          {
            withCredentials: true,
            params: {
              gateway_id: user?.gateway?.id,
              query: query,
              device_function: device_function,
            },
          }
        );
        setPatientMonitoringDevices(response.data.data);
      } catch (error) {
        console.error("Error fetching device connected:", error);
      }
    },
    []
  );

  return {
    getAllDevices,
    devices,
    detailDevice,
    patientMonitoringDevices,
    deleteDeviceBluetooth,
    deleteDeviceTcpIP,
    updateDeviceBluetooth,
    updateDeviceTcpIP,
    getDetailDevice,
    getPatientMonitoringDevices,
  };
};
