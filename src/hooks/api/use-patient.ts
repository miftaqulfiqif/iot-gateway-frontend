import { DetailPatient, Patients } from "@/models/PatientModel";
import axios from "axios";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

type CreateNewPatientProps = {
  fetchPatients?: () => void;
  closeModal?: () => void;
  showToast?: any;
};

export const usePatient = ({
  fetchPatients,
  closeModal,
  showToast,
}: CreateNewPatientProps) => {
  const [patients, setPatients] = useState<Patients[]>([]);
  const [detailPatient, setDetailPatient] = useState<DetailPatient>();

  const getPatients = useCallback(async (query: string, limit: number) => {
    try {
      const response = await axios.get(`${apiUrl}/api/patients`, {
        withCredentials: true,
        params: {
          query: query || "",
          limit: limit || 10,
        },
      });
      setPatients(response.data.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }, []);

  // Update patient
  const updatePatient = async (patient: Patients) => {
    try {
      await axios
        .patch(`${apiUrl}/api/patient-update/${patient.id}`, patient, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Patient updated successfully : ", response.data);
            showToast(null, "Patient updated successfully", "success");
          }
        })
        .catch((error) => {
          console.error("Error updating patient:", error);
        });
      fetchPatients?.();
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  // Save Patient
  const savePatient = async (values: any) => {
    try {
      const response = await axios.post(`${apiUrl}/api/patients`, values, {
        withCredentials: true,
      });

      if (response.status === 200) {
        closeModal?.();
        fetchPatients?.();
        showToast(null, "Patient saved successfully", "success");
      } else {
      }
    } catch (error) {
      throw error;
    }
  };

  // Update patient height
  const updatePatientHeight = async (patientId: string, newHeight: number) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/api/patient-update/${patientId}`,
        {
          height: newHeight,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const patient = JSON.parse(localStorage.getItem("patient") || "{}");
        patient.height = newHeight;
        localStorage.setItem("patient", JSON.stringify(patient));
      } else {
      }
    } catch (error) {}
  };

  const getDetailPatient = useCallback(async (patientId: string) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/patient/detail/${patientId}`,
        {
          withCredentials: true,
        }
      );
      setDetailPatient(response.data.data);
    } catch (error) {
      console.error("Error get detail patient : ", error);
      throw error;
    }
  }, []);

  // Return callback
  return {
    getPatients,
    updatePatient,
    savePatient,
    updatePatientHeight,
    getDetailPatient,
    patients,
    detailPatient,
  };
};
