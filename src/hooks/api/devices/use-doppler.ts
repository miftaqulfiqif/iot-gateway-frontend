import { useToast } from "@/context/ToastContext";
import { DopplerMeasurementHistory } from "@/models/Devices/DopplerModel";
import axios from "axios";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useDoppler = () => {
  const { showToast } = useToast();
  const [historiesDoppler, setHistoriesDoppler] = useState<
    DopplerMeasurementHistory[]
  >([]);
  const [currentPageDoppler, setCurrentPageDoppler] = useState(1);
  const [totalItemsDoppler, setTotalItemsDoppler] = useState(0);
  const [totalPageDoppler, setTotalPageDoppler] = useState(0);
  const [limitDoppler, setLimitDoppler] = useState(10);
  const [searchDoppler, setSearchDoppler] = useState("");

  const fetchDataDoppler = useCallback(
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
          `${apiUrl}/api/measurement-histories-doppler`,
          {
            params,
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setCurrentPageDoppler(response.data.current_page);
          setTotalItemsDoppler(response.data.total_items);
          setTotalPageDoppler(response.data.total_pages);
          setHistoriesDoppler(response.data.data);
          setLimitDoppler(limit);
          setSearchDoppler(search);

          return {
            total_pages: response.data.total_pages,
            total_items: response.data.total_items,
          };
        }
      } catch (error) {
        console.error("Error fetching histories:", error);
      }

      // fallback return
      return { total_pages: 0, total_items: 0 };
    },
    []
  );

  const fetchDataDopplerByPatientId = useCallback(
    async (patientId: string, page: number) => {
      // fetch data
    },
    [fetchDataDoppler]
  );

  const fetchDataDopplerByDoctorId = useCallback(
    async (doctorId: string, page: number) => {
      // fetch data
    },
    [fetchDataDoppler]
  );

  const createHistoryDoppler = async ({
    patient_id,
    baby_id,
    device_id,
    weight_mother,
    weight_child,
  }: {
    patient_id: string;
    baby_id: string;
    device_id: string;
    weight_mother: number;
    weight_child: number;
  }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/measurement-histories-digit-pro-ida`,
        {
          patient_id,
          baby_id,
          device_id,
          weight_mother,
          weight_child,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        showToast(null, "Success", "success");
      }
    } catch (error) {
      console.error("Create history failed", error);
      showToast(null, "Gagal menyimpan data", "error");
    }
  };

  return {
    historiesDoppler,
    fetchDataDoppler,
    fetchDataDopplerByPatientId,
    fetchDataDopplerByDoctorId,
    limitDoppler,
    searchDoppler,
    currentPageDoppler,
    totalItemsDoppler,
    totalPageDoppler,
    createHistoryDoppler,
  };
};
