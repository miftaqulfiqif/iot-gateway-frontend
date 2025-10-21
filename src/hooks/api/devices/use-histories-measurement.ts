import { HistoriesMeasurement } from "@/models/HistoriesMeasurementModel";
import axios from "axios";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useHistoriesMeasurement = () => {
  const [historiesMeasurement, setHistoriesMeasurement] =
    useState<HistoriesMeasurement>({
      current_page: 1,
      total_items: 0,
      total_pages: 1,
      total_patient: 0,
      total_today: 0,
      data: [],
    });

  const getHistoriesMeasurement = useCallback(
    async ({
      page,
      limit,
      query,
      patientId,
    }: {
      page: number;
      limit: number;
      query: string;
      patientId?: string;
    }) => {
      try {
        let response = null;
        if (patientId) {
          response = await axios.get(
            `${apiUrl}/api/histories-measurements-by-patient-id`,
            {
              withCredentials: true,
              params: { page, limit, query, patient_id: patientId },
            }
          );
        } else {
          response = await axios.get(`${apiUrl}/api/histories-measurements`, {
            withCredentials: true,
            params: { page, limit, query },
          });
        }

        setHistoriesMeasurement({
          current_page: response.data.current_page,
          total_items: response.data.total_items,
          total_pages: response.data.total_pages,
          total_patient: response.data.total_patient,
          total_today: response.data.total_today,
          data: response.data.data || [],
        });
      } catch (error) {
        console.error("Error fetching histories measurement:", error);
      }
    },
    []
  );

  return {
    historiesMeasurement,
    getHistoriesMeasurement,
  };
};
