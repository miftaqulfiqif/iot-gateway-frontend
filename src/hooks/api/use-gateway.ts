import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useGateway = () => {
  const currentGateway = JSON.parse(
    localStorage.getItem("current_gateway") || "null"
  );

  const [selectedGateway, setSelectedGateway] = useState<any>(
    currentGateway || {
      id: "gw-001",
      name: "Gateway 001",
    }
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

  return {
    selectedGateway,
    setSelectedGateway,
    gateways,
    getGateways,
    query,
    setQuery,
  };
};
