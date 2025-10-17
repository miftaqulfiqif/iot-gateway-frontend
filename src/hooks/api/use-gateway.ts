import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { IotGatewayModel } from "@/models/GatewayModel";
import axios from "axios";
import { error } from "console";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useGateway = () => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const currentGateway = JSON.parse(
    localStorage.getItem("current_gateway") || "null"
  );
  const currentGatewayUser = user?.gateway;

  const [selectedGateway, setSelectedGateway] = useState<any>(
    currentGateway || currentGatewayUser
  );
  const [gateways, setGateways] = useState<IotGatewayModel>({
    current_page: 1,
    total_items: 0,
    total_page: 1,
    online_count: 0,
    offline_count: 0,
    data: [],
  });
  const [gatewayOnlineCount, setGatewayOnlineCount] = useState(0);
  const [gatewayOfflineCount, setGatewayOfflineCount] = useState(0);
  const [query, setQuery] = useState("");

  const getGateways = useCallback(
    async ({
      page,
      limit,
      query,
    }: {
      page: number;
      limit: number;
      query: string;
    }) => {
      try {
        const response = await axios.get(`${apiUrl}/api/iot-gateways`, {
          withCredentials: true,
          params: { page, limit, query },
        });

        const data = response.data.data;

        setGateways({
          current_page: data.current_page,
          total_items: data.total_items,
          total_page: data.total_page,
          online_count: data.online_count,
          offline_count: data.offline_count,
          data: data.data,
        });

        setGatewayOnlineCount(data.online_count);
        setGatewayOfflineCount(data.offline_count);
      } catch (error) {
        console.error("Error fetching gateways:", error);
      }
    },
    []
  );

  const changeGateway = async (selectedGateway: any) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/api/user/change-gateway`,
        { gateway_id: selectedGateway.id },
        { withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.setItem(
          "current_gateway",
          JSON.stringify(selectedGateway)
        );

        window.location.reload();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error change gateway:", error);
    }
  };

  const createGateway = async (data: any) => {
    try {
      const response = await axios.post(`${apiUrl}/api/iot-gateways`, data, {
        withCredentials: true,
      });
      if (response.status !== 201) {
        showToast("Error", response.data.errors, "error");
      }
    } catch (error) {
      console.error("Error creating gateway:", error);
    }
  };

  return {
    selectedGateway,
    setSelectedGateway,
    gateways,
    gatewayOnlineCount,
    gatewayOfflineCount,
    getGateways,
    query,
    setQuery,
    changeGateway,
    createGateway,
  };
};
