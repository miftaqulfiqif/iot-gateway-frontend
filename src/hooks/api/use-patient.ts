import { Patients } from "@/models/PatientModel";
import axios from "axios";

type CreateNewPatientProps = {
  fetchPatients?: () => void;
  closeModal: () => void;
};

export const UsePatient = ({
  fetchPatients,
  closeModal,
}: CreateNewPatientProps) => {
  const updatePatient = async (patient: Patients) => {
    try {
      await axios
        .patch(
          `http://localhost:3000/api/patient-update/${patient.id}`,
          patient,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log("Patient updated successfully : ", response.data);
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

  const savePatient = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/patients",
        values,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        closeModal();
        fetchPatients?.();
      } else {
      }
    } catch (error) {
      throw error;
    }
  };

  return { updatePatient, savePatient };
};
