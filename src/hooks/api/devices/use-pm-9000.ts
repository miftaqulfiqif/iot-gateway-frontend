import { useToast } from "@/context/ToastContext";
import { PM9000MeasurementHistory } from "@/models/Devices/PM9000Model";
import axios from "axios";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const usePM9000 = () => {
  const { showToast } = useToast();
  const [historiesPM9000, setHistoriesPM9000] = useState<
    PM9000MeasurementHistory[]
  >([]);
  const [currentPagePM9000, setCurrentPagePM9000] = useState(1);
  const [totalItemsPM9000, setTotalItemsPM9000] = useState(0);
  const [totalPagePM9000, setTotalPagePM9000] = useState(0);
  const [limitPM9000, setLimitPM9000] = useState(10);
  const [searchPM9000, setSearchPM9000] = useState("");

  const fetchDataPM9000 = useCallback(
    async ({
      page = 1,
      limit = 10,
      search = "",
      patient_id = "",
    }: {
      page?: number;
      limit?: number;
      search?: string;
      patient_id?: string;
    }) => {
      try {
        const params: Record<string, any> = {
          page,
          limit,
          search,
        };
        if (patient_id !== "") {
          params.patient_id = patient_id;
        }

        const response = await axios.get(
          `${apiUrl}/api/measurement-histories-pm-9000`,
          {
            params,
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setCurrentPagePM9000(response.data.current_page);
          setTotalItemsPM9000(response.data.total_items);
          setTotalPagePM9000(response.data.total_pages);
          setHistoriesPM9000(response.data.data);
          setLimitPM9000(limit);
          setSearchPM9000(search);

          return {
            total_pages: response.data.total_pages,
            total_items: response.data.total_items,
          };
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      return { total_pages: 0, total_items: 0 };
    },
    []
  );

  return {
    fetchDataPM9000,
    historiesPM9000,
    currentPagePM9000,
    totalItemsPM9000,
    totalPagePM9000,
    limitPM9000,
    searchPM9000,
  };
};
