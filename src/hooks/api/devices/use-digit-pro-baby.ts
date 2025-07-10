import { useToast } from "@/context/ToastContext";
import { DigitProBabyMeasurementHistory } from "@/models/Devices/DigitProBabyModel";
import axios from "axios";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useDigitProBaby = () => {
  const { showToast } = useToast();
  const [dataDigitProBaby, setDataDigitProBaby] = useState<
    DigitProBabyMeasurementHistory[]
  >([]);
  const [currentPageDigitProBaby, setCurrentPageDigitProBaby] = useState(1);
  const [totalItemsDigitProBaby, setTotalItemsDigitProBaby] = useState(0);
  const [totalPageDigitProBaby, setTotalPageDigitProBaby] = useState(0);
  const [limitDigitProBaby, setLimitDigitProBaby] = useState(10);
  const [searchDigitProBaby, setSearchDigitProBaby] = useState("");

  const createDigitProBabyHistory = async ({
    patient_id,
    baby_id,
    device_id,
    weight,
  }: {
    patient_id: string;
    baby_id: string;
    device_id: string;
    weight: number;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/measurement-histories-digit-pro-baby",
        {
          patient_id,
          baby_id,
          device_id,
          weight,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Baby created successfully");
        showToast(null, "Baby created successfully", "success");
      }
    } catch (error) {
      console.error("Error creating baby : ", error);
    }
  };

  const fetchDataDigitProBaby = useCallback(
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
        if (patient_id && patient_id.trim() !== "") {
          params.patient_id = patient_id;
        }

        console.log(params.patient_id);

        const response = await axios.get(
          `${apiUrl}/api/measurement-histories-digit-pro-baby`,
          {
            params,
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setCurrentPageDigitProBaby(response.data.current_page);
          setTotalItemsDigitProBaby(response.data.total_items);
          setTotalPageDigitProBaby(response.data.total_pages);
          setDataDigitProBaby(response.data.data);
          setLimitDigitProBaby(limit);
          setSearchDigitProBaby(search);

          // ⬇️ return nilai dari sini ke parent
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

  const fetchDataDigitProBabyByPatientId = useCallback(
    async (patientId: string) => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/measurement-histories-digit-pro-baby/patient/${patientId}`,
          {
            withCredentials: true,
          }
        );
        setDataDigitProBaby(response.data.data);
      } catch (error) {
        console.error("Error fetching babies:", error);
      }
    },
    []
  );

  return {
    dataDigitProBaby,
    currentPageDigitProBaby,
    totalItemsDigitProBaby,
    totalPageDigitProBaby,
    limitDigitProBaby,
    searchDigitProBaby,
    fetchDataDigitProBaby,
    fetchDataDigitProBabyByPatientId,
    createDigitProBabyHistory,
  };
};
