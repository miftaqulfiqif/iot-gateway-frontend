import { useState } from "react";
import { formatDate } from "date-fns";
import { useToast } from "@/context/ToastContext";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Mars, Venus } from "lucide-react";
import { PatientInfoMeasurement } from "@/components/ui/patient-info-measurement";
import { DigitProBabyModel } from "@/models/Devices/DigitProBabyModel";

const apiUrl = import.meta.env.VITE_API_URL;

type Props = {
  isActive: boolean;
  setInactive: () => void;
  patient: any;
  device: any;
  room: String;
  result?: DigitProBabyModel;
};

export const SaveMeasurementDigitProBaby = ({
  isActive,
  setInactive,
  patient,
  device,
  room,
  result,
}: Props) => {
  const { showToast } = useToast();

  const [note, setNote] = useState("");

  const handleSave = async (data: any) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/measurement-histories-digit-pro-baby`,
        data,
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Measurement saved successfully : ", response.data);
        setInactive();
        showToast(null, "Measurement saved successfully", "success");
      }
    } catch (error) {
      showToast(null, "Failed to save measurement", "error");
      throw error;
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      patient_id: patient?.id,
      device_mac: device?.mac_address,
      room: room,
      weight: result?.weight ?? 0,
      description: note,
    },
    validationSchema: yup.object().shape({
      patient_id: yup.string().required("Patient ID is required"),
      device_mac: yup.string().required("Device MAC is required"),
      room: yup.string().required("Room is required"),
      weight: yup.number().required("Weight is required"),
      description: yup.string().nullable(),
    }),
    onSubmit: (values) => {
      console.log("Values:", values);
      handleSave(values);
    },
  });

  return (
    <div
      onClick={setInactive}
      className={`fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 z-40 transition-opacity duration-300 ${
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
        <p className="font-semibold text-xl mb-2">Save Measurement</p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          {/* Baby Info */}
          <p>Patient info: </p>
          <PatientInfoMeasurement patient={patient} />

          {/* Result */}
          <p>Result</p>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Weight</p>
            <p className="text-6xl font-bold text-blue-600">
              {formik.values.weight ?? "--"}
              <span className="text-xl font-normal">kg</span>
            </p>
          </div>

          {/* Note */}
          <div className="">
            <p>Note :</p>
            <textarea
              name="description"
              maxLength={150}
              className="border w-full h-20 border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="Input Note Here (max 150 characters)"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <div className="flex justify-end">
              <p>{formik.values.description?.length}/150</p>
            </div>
          </div>
          <button
            className="w-full h-12 bg-blue-500 text-white py-2 rounded-lg cursor-pointer font-semibold"
            type="submit"
          >
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};
