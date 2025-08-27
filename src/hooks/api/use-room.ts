import { useToast } from "@/context/ToastContext";
import { RoomsModel } from "@/models/RoomModel";
import axios from "axios";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useRooms = () => {
  const { showToast } = useToast();
  const [rooms, setRooms] = useState<RoomsModel[]>([]);

  const getAllRooms = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/rooms`, {
        withCredentials: true,
      });
      setRooms(response.data.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  }, []);

  const createNewRoom = async (data: any) => {
    try {
      const response = await axios.post(`${apiUrl}/api/rooms`, data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        showToast(null, "Room created successfully", "success");
      } else {
        showToast(
          null,
          `Failed to create room, status: ${response.status}`,
          "error"
        );
        throw new Error("Failed to create room");
      }
    } catch (error) {
      showToast(null, "Failed to create room", "error");
      console.error("Error creating room:", error);
      throw error;
    } finally {
      getAllRooms();
    }
  };

  return { rooms, getAllRooms, createNewRoom };
};
