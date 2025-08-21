import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const apiUrl = import.meta.env.VITE_API_URL;

export const useBabies = (patientId: string) => {
  const [babies, setBabies] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getBabiesByPatientId = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/baby-by-patient-id/${patientId}`,
        {
          withCredentials: true,
        }
      );
      setBabies(response.data.data);
    } catch (error) {
      console.error("Error fetching babies:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      patient_id: patientId,
      name: "",
      gender: "",
      date_of_birth: "",
      place_of_birth: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      gender: yup.string().required("Gender is required"),
      date_of_birth: yup.string().required("Date of birth is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(`${apiUrl}/api/babies`, values, {
          withCredentials: true,
        });
        getBabiesByPatientId();
        setShowCreateModal(false);
      } catch (error) {
        console.error("Error creating baby:", error);
      }
    },
  });

  return {
    getBabiesByPatientId,
    babies,
    formik,
    showCreateModal,
    setShowCreateModal,
  };
};
