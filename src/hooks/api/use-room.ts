import { useToast } from "@/context/ToastContext";
import {
  BedsModel,
  DetailRoom,
  RoomsModel,
  RoomWithGateway,
} from "@/models/RoomModel";
import axios from "axios";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useRooms = () => {
  const { showToast } = useToast();
  const [rooms, setRooms] = useState<RoomsModel[]>([]);
  const [roomWithGateway, setRoomWithGateway] = useState<RoomWithGateway[]>([]);
  const [totalRooms, setTotalRooms] = useState<number>(0);
  const [beds, setBeds] = useState<BedsModel[]>([]);
  const [detailRoom, setDetailRoom] = useState<DetailRoom | null>(null);
  const [patientRoom, setPatientRoom] = useState<any>(null);

  const getAllRooms = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/rooms`, {
        withCredentials: true,
      });
      setRooms(response.data.data);
      setTotalRooms(response.data.total_rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  }, []);

  const getRoomWithGateway = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/rooms-with-gateway`, {
        withCredentials: true,
      });
      setRoomWithGateway(response.data.data);
    } catch (error) {
      console.error("Error fetching rooms with gateway:", error);
      throw error;
    }
  }, []);

  const getPatientRooms = useCallback(
    async (
      patientId: string,
      setShowSelectRoomModal: (value: boolean) => void
    ) => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/patient-room/patient/${patientId}`,
          {
            withCredentials: true,
          }
        );
        setPatientRoom(response.data.data);
        setShowSelectRoomModal(false);
      } catch (error) {
        setPatientRoom(null);

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setShowSelectRoomModal(true);
        }

        console.error("Error fetching patient rooms:", error);
      }
    },
    []
  );

  const getDetailRoom = useCallback(async (roomId: string) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/patient-rooms/detail/${roomId}`,
        {
          withCredentials: true,
        }
      );
      setDetailRoom(response.data.data);
    } catch (error) {
      console.error("Error fetching room details:", error);
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

  const getBeds = useCallback(async (roomId: string, isAvailable: string) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/beds-by-room-id/${roomId}`,
        {
          withCredentials: true,
          params: { is_available: isAvailable },
        }
      );
      setBeds(response.data.data);
    } catch (error) {
      console.error("Error fetching beds:", error);
      throw error;
    }
  }, []);

  return {
    rooms,
    roomWithGateway,
    totalRooms,
    beds,
    detailRoom,
    patientRoom,
    getBeds,
    getAllRooms,
    getRoomWithGateway,
    getDetailRoom,
    createNewRoom,
    getPatientRooms,
  };
};
