import { useToast } from "@/context/ToastContext";
import axios from "axios";
import { useCallback } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useCentralMonitor = () => {
  const { showToast } = useToast();

  const getAllCentralMonitor = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/central-monitor`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error fetching central monitor data:", error);
      throw error;
    }
  }, []);

  const createCentralMonitor = useCallback(
    async (data: {
      patient_id: string;
      device_id: string;
      room_id: string;
      bed_id: string;
    }) => {
      try {
        const response = await axios.post(
          `${apiUrl}/api/central-monitor`,
          data,
          {
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          showToast(null, "Central Monitor created successfully", "success");
        }
      } catch (error) {
        showToast(null, "Failed to create Central Monitor", "error");
        console.error("Error creating central monitor:", error);
        throw error;
      }
    },
    []
  );

  return {
    getAllCentralMonitor,
    createCentralMonitor,
  };
};
