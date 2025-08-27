import { useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/context/ToastContext";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

type Props = {
  isActive: boolean;
  setInactive: () => void;
  patient: any;
  baby: any;
  deviceMac: string;
  result: {
    weight_mother: number;
    weight_baby: number;
  };
};

export const SaveMeasurementDigitProIDA = ({
  isActive,
  setInactive,
  patient,
  baby,
  deviceMac,
  result,
}: Props) => {
  const { showToast } = useToast();
  const [note, setNote] = useState("");

  const handleSave = async (data: any) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/measurement-histories-digit-pro-ida`,
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
      baby_id: baby?.id,
      device_mac: deviceMac,
      description: note,
      weight_mother: result.weight_mother,
      weight_baby: result.weight_baby,
    },
    validationSchema: yup.object().shape({
      patient_id: yup.string().nullable(),
      baby_id: yup.string().nullable(),
      device_mac: yup.string().required("Device MAC is required"),
      description: yup.string().nullable(),
      weight_mother: yup.number().required("Weight mother is required"),
      weight_baby: yup.number().required("Weight baby is required"),
    }),
    onSubmit: (values) => {
      console.log("VALUES : ", values);
      handleSave(values);
    },
  });

  return (
    <div
      onClick={setInactive}
      className={`fixed top-0 left-0 w-full h-full bg-opacity-50 z-40 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-1/2 transform bg-white rounded-xl p-6 z-50 w-full max-w-3xl transition-all duration-300 ease-in-out
        ${
          isActive
            ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
            : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
        }`}
      >
        <p className="font-semibold text-xl mb-4">Save Measurement</p>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          {/* Patient & Baby Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-b from-[#4956F4] to-[#6e79f4] text-white rounded-lg p-4">
              <p className="font-semibold mb-2">Patient Info</p>
              <div className="flex justify-between text-sm">
                <p>Patient ID:</p>
                <p className="font-semibold">{patient?.id}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Name:</p>
                <p className="font-semibold">{patient?.name}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Date of Birth:</p>
                <p className="font-semibold">
                  {patient?.date_of_birth
                    ? format(new Date(patient.date_of_birth), "dd MMMM yyyy")
                    : "--"}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#4956F4] to-[#6e79f4] text-white rounded-lg p-4">
              <p className="font-semibold mb-2">Baby Info</p>
              <div className="flex justify-between text-sm">
                <p>Name:</p>
                <p className="font-semibold">{baby?.name}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Date of Birth:</p>
                <p className="font-semibold">
                  {baby?.date_of_birth
                    ? format(new Date(baby.date_of_birth), "dd MMMM yyyy")
                    : "--"}
                </p>
              </div>
            </div>
          </div>

          {/* Result */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">Result:</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Mother's Weight</p>
                <p className="text-6xl font-bold text-blue-600">
                  {formik.values.weight_mother ?? "--"}{" "}
                  <span className="text-xl font-normal">kg</span>
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Baby's Weight</p>
                <p className="text-6xl font-bold text-blue-600">
                  {formik.values.weight_baby ?? "--"}{" "}
                  <span className="text-xl font-normal">kg</span>
                </p>
              </div>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="text-gray-700 font-semibold mb-1 block">
              Note:
            </label>
            <textarea
              name="description"
              maxLength={150}
              className="border w-full h-20 border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="Input Note Here (max 150 characters)"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <div className="flex justify-end mt-1 text-sm text-gray-500">
              {formik.values.description.length}/150
            </div>
          </div>

          {/* Save Button */}
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-lg font-semibold"
            type="submit"
          >
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};
