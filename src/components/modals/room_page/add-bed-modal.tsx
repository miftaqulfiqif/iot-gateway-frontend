import { InputSelect } from "@/components/ui/input-select";
import { InputText } from "@/components/ui/input-text";
import { useToast } from "@/context/ToastContext";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

type Props = {
  isActive: boolean;
  setNonactive: () => void;
  roomId: string;
};

export const AddBedModal = ({ isActive, setNonactive, roomId }: Props) => {
  const { showToast } = useToast();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      room_id: roomId,
      bed_number: "",
      type: "",
    },
    validationSchema: yup.object().shape({
      bed_number: yup.string().required("Bed number is required"),
      type: yup.string().required("Bed type is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${apiUrl}/api/beds`, values, {
          withCredentials: true,
        });
        if (response.status === 200) {
          showToast(null, "Bed added successfully", "success");
          setNonactive();
        }
      } catch (error) {
        showToast(null, "Failed to add bed", "error");
        throw error;
      }
    },
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNonactive();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [setNonactive]);

  if (!isActive) return null;

  return (
    <div
      onClick={setNonactive}
      className={`fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 z-50 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-1/2 transform bg-white rounded-xl p-8 z-50 w-2xl h-fit transition-all duration-300 ease-in-out
        ${
          isActive
            ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
            : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
        }
      `}
      >
        <h2 className="text-xl font-bold mb-4">Add Bed</h2>
        <form onSubmit={formik.handleSubmit}>
          <InputText
            label="Bed Number"
            name="bed_number"
            placeholder="Bed Number"
            value={formik.values.bed_number}
            onChange={formik.handleChange}
            onTouch={formik.touched.bed_number}
            onError={formik.errors.bed_number}
            isRequired
          />
          <InputSelect
            name="type"
            label="Room Type"
            placeholder="Room Type"
            option={[
              { value: "ICU", label: "ICU" },
              { value: "HCU", label: "HCU" },
            ]}
            onChange={(value) => formik.setFieldValue("type", value)}
            value={formik.values.type}
            onTouch={formik.touched.type}
            onError={formik.errors.type}
            isRequired
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={setNonactive}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
