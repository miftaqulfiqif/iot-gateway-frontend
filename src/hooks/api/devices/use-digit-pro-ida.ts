import { useToast } from "@/context/ToastContext";
import { DigitProIDAMeasurementHistory } from "@/models/Devices/DigitProIDAModel";
import axios from "axios";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useDigitProIDA = () => {
  const { showToast } = useToast();
  const [historiesDigitProIDA, setHistoriesDigitProIDA] = useState<
    DigitProIDAMeasurementHistory[]
  >([]);
  const [currentPageIDA, setCurrentPageIDA] = useState(1);
  const [totalItemsIDA, setTotalItemsIDA] = useState(0);
  const [totalPageIDA, setTotalPageIDA] = useState(0);
  const [limitIDA, setLimitIDA] = useState(10);
  const [searchIDA, setSearchIDA] = useState("");

  const fetchDataIDA = useCallback(
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
          `${apiUrl}/api/measurement-histories-digit-pro-ida`,
          {
            params,
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setCurrentPageIDA(response.data.current_page);
          setTotalItemsIDA(response.data.total_items);
          setTotalPageIDA(response.data.total_pages);
          setHistoriesDigitProIDA(response.data.data);
          setLimitIDA(limit);
          setSearchIDA(search);

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

  const fetchDataIDAByPatientId = useCallback(
    async (patientId: string, page: number) => {
      // fetch data
    },
    [fetchDataIDA]
  );

  const fetchDataIDAByDoctorId = useCallback(
    async (doctorId: string, page: number) => {
      // fetch data
    },
    [fetchDataIDA]
  );

  const createHistoryDigitProIDA = async ({
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
    historiesDigitProIDA,
    fetchDataIDA,
    fetchDataIDAByPatientId,
    fetchDataIDAByDoctorId,
    limitIDA,
    searchIDA,
    currentPageIDA,
    totalItemsIDA,
    totalPageIDA,
    createHistoryDigitProIDA,
  };
};
