import { Patients } from "@/models/PatientModel";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

type CreateNewPatientProps = {
  fetchPatients?: () => void;
  closeModal?: () => void;
  showToast?: any;
};

export const UsePatient = ({
  fetchPatients,
  closeModal,
  showToast,
}: CreateNewPatientProps) => {
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

  // Return callback
  return { updatePatient, savePatient, updatePatientHeight };
};
