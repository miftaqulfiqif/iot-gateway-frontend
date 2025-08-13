import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useGateway = () => {
  const { user } = useAuth();
  const currentGateway = JSON.parse(
    localStorage.getItem("current_gateway") || "null"
  );
  const currentGatewayUser = user?.gateway;

  const [selectedGateway, setSelectedGateway] = useState<any>(
    currentGateway || currentGatewayUser
  );
  const [gateways, setGateways] = useState<any>([]);
  const [query, setQuery] = useState("");

  const getGateways = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/iot-gateways`, {
        withCredentials: true,
        params: {
          page: 1,
          limit: 100,
          query: query,
        },
      });
      setGateways(response.data.data.data);
    } catch (error) {
      console.error("Error fetching gateways:", error);
    }
  };

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

  return {
    selectedGateway,
    setSelectedGateway,
    gateways,
    getGateways,
    query,
    setQuery,
    changeGateway,
  };
};
