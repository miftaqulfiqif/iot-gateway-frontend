import { useToast } from "@/context/ToastContext";
import { DigitProBMIMeasurementHistory } from "@/models/Devices/BMIModel";
import axios from "axios";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useDigitProBMI = () => {
  const { showToast } = useToast();
  const [dataDigitProBMI, setDataDigitProBMI] = useState<
    DigitProBMIMeasurementHistory[]
  >([]);
  const [currentPageBMI, setCurrentPageBMI] = useState(1);
  const [totalItemsBMI, setTotalItemBMI] = useState(0);
  const [totalPageBMI, setTotalPageBMI] = useState(0);
  const [limitBMI, setLimitBMI] = useState(10);
  const [searchBMI, setSearchBMI] = useState("");

  const fetchDataBMI = useCallback(
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
          `${apiUrl}/api/measurement-histories-digit-pro-baby`,
          {
            params,
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setCurrentPageBMI(response.data.current_page);
          setTotalItemBMI(response.data.total_items);
          setTotalPageBMI(response.data.total_pages);
          setDataDigitProBMI(response.data.data);
          setLimitBMI(response.data.limit);
          setSearchBMI(response.data.search);

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

  const createHistoryDigitProBMI = async ({
    patient_id,
    device_id,
    weight,
    age,
    bmi,
    body_fat,
    muscle_mass,
    water,
    visceral_fat,
    bone_mass,
    metabolism,
    protein,
    obesity,
    body_age,
    lbm,
  }: {
    patient_id: string;
    device_id: string;
    weight: number;
    age: number;
    bmi: number;
    body_fat: number;
    muscle_mass: number;
    water: number;
    visceral_fat: number;
    bone_mass: number;
    metabolism: number;
    protein: number;
    obesity: number;
    body_age: number;
    lbm: number;
  }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/measurement-histories-digit-pro-bmi`,
        {
          patient_id,
          device_id,
          weight,
          age,
          bmi,
          body_fat,
          muscle_mass,
          water,
          visceral_fat,
          bone_mass,
          metabolism,
          protein,
          obesity,
          body_age,
          lbm,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        showToast(null, "Success", "success");
      }
    } catch (error) {
      console.error("Error creating history:", error);
      showToast(null, "Failed to create history", "error");
    }
  };

  return {
    dataDigitProBMI,
    currentPageBMI,
    totalItemsBMI,
    totalPageBMI,
    limitBMI,
    searchBMI,
    fetchDataBMI,
    createHistoryDigitProBMI,
  };
};
