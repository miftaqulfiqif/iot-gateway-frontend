import { useToast } from "@/context/ToastContext";
import { DS001MeasurementHistory } from "@/models/Devices/DS001Model";
import axios from "axios";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useDS001 = () => {
  const { showToast } = useToast();
  const [historiesDS001, setHistoriesDS001] = useState<
    DS001MeasurementHistory[]
  >([]);
  const [currentPageDS001, setCurrentPageDS001] = useState(1);
  const [totalItemsDS001, setTotalItemsDS001] = useState(0);
  const [totalPageDS001, setTotalPageDS001] = useState(0);
  const [limitDS001, setLimitDS001] = useState(10);
  const [searchDS001, setSearchDS001] = useState("");

  const fetchDataDS001 = useCallback(
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
          setCurrentPageDS001(response.data.current_page);
          setTotalItemsDS001(response.data.total_items);
          setTotalPageDS001(response.data.total_pages);
          setHistoriesDS001(response.data.data);
          setLimitDS001(limit);
          setSearchDS001(search);

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
    fetchDataDS001,
    historiesDS001,
    currentPageDS001,
    totalItemsDS001,
    totalPageDS001,
    limitDS001,
    searchDS001,
  };
};
