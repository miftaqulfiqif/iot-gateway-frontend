import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

const apiUrl = import.meta.env.VITE_API_URL;

export const useAuthHook = () => {
  const { login } = useAuth();
  const { showToast } = useToast();

  const loginUser = async () => {
    try {
      await axios
        .post(`${apiUrl}/api/users-login`, formik.values, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            const user = response.data;
            login(user);
            window.location.href = "/patient-monitor";
          } else {
            showToast(null, response.data.message, "error");
            formik.setStatus(response.data.errors || "Login failed.");
          }
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          showToast(null, "Login failed", "error");

          formik.setStatus(
            error.response.data.message || "Invalid credentials"
          );
        } else {
          showToast(null, "Network error, please try again.", "error");
          formik.setStatus("Network error, please try again.");
        }
      } else {
        showToast(null, "Unexpected error occurred.", "error");
        formik.setStatus("Unexpected error occurred.");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: loginUser,
  });

  return formik;
};
