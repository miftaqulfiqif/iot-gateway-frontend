import { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { useToast } from "@/context/ToastContext";
import { BMIModel } from "@/models/Devices/BMIModel";
import { InputText } from "@/components/ui/input-text";
import { useFormik } from "formik";
import { useAuth } from "@/context/AuthContext";
import * as yup from "yup";
import axios from "axios";
import { Mars, Venus } from "lucide-react";
import { PatientInfoMeasurement } from "@/components/ui/patient-info-measurement";

const apiUrl = import.meta.env.VITE_API_URL;

const ResultItem = ({
  label,
  value,
  unit,
}: {
  label: string;
  value?: number;
  unit?: string;
}) => (
  <div className="flex flex-col bg-gray-100 p-3 rounded-lg">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-base font-semibold">
      {value !== undefined && value !== null ? `${value} ${unit ?? ""}` : "--"}
    </span>
  </div>
);

type Props = {
  isActive: boolean;
  setInactive: () => void;
  patient: any;
  device: any;
  room: String;
  patientHeight?: number;
  result?: BMIModel;
};

export const SaveMeasurementBMI = ({
  isActive,
  setInactive,
  patient,
  device,
  room,
  patientHeight,
  result,
}: Props) => {
  const { showToast } = useToast();
  const [patientImage, setPatientImage] = useState<string | null>(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleSave = async (data: any) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/measurement-histories-digit-pro-bmi`,
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
      height: patientHeight === 0 ? null : patientHeight,
      weight: result?.weight,
      age: result?.age,
      bmi: result?.bmi,
      body_fat: result?.bodyFat,
      muscle_mass: result?.muscleMass,
      water: result?.water,
      visceral_fat: result?.visceralFat,
      bone_mass: result?.boneMass,
      metabolism: result?.metabolism,
      protein: result?.protein,
      obesity: result?.obesity,
      body_age: result?.bodyAge,
      lbm: result?.lbm,
      note: "",
      encounter_id: "",
      patient_ihs_number: patient?.ihs_number ? patient?.ihs_number : "",
    },
    validationSchema: yup.object().shape({
      patient_id: yup.string().required("Patient id is required"),
      device_mac: yup.string().required("Mac Address id is required"),
      room: yup.string().required(),
      height: yup.number().nullable(),
      weight: yup.number().required("Weight is required"),
      age: yup.number().required("Age is required"),
      bmi: yup.number().required("BMI is required"),
      body_fat: yup.number().required("Body fat is required"),
      muscle_mass: yup.number().required("Muscle mass is required"),
      water: yup.number().required("Water is required"),
      visceral_fat: yup.number().required("Visceral fat is required"),
      bone_mass: yup.number().required("Bone mass is required"),
      metabolism: yup.number().required("Metabolism is required"),
      protein: yup.number().required("Protein is required"),
      obesity: yup.number().required("Obesity is required"),
      body_age: yup.number().required("Body age is required"),
      lbm: yup.number().required("LBM is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Values: ", values);

      const data = {
        patient_id: values.patient_id,
        device_mac: values.device_mac,
        room: values.room,
        height: values.height,
        weight: values.weight,
        age: values.age,
        bmi: values.bmi,
        body_fat: values.body_fat,
        muscle_mass: values.muscle_mass,
        water: values.water,
        visceral_fat: values.visceral_fat,
        bone_mass: values.bone_mass,
        metabolism: values.metabolism,
        protein: values.protein,
        obesity: values.obesity,
        body_age: values.body_age,
        lbm: values.lbm,
        note: values.note,
        satusehat_env: {
          encounter_id: values.encounter_id,
          patient_ihs_number: values.patient_ihs_number,
        },
      };

      handleSave(data);
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
        <div className="flex flex-col gap-3">
          {/* Patient Info */}
          <p>Patient info : </p>
          <PatientInfoMeasurement patient={patient} />

          {/* Result */}
          <form onSubmit={formik.handleSubmit}>
            <div>
              <p className="text-gray-700 font-semibold mb-1">Result:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                {formik.values.height && (
                  <ResultItem
                    label="Height"
                    value={formik.values.height}
                    unit="cm"
                  />
                )}
                <ResultItem
                  label="Weight"
                  value={formik.values.weight}
                  unit="kg"
                />
                <ResultItem label="BMI" value={formik.values.bmi} />
                <ResultItem label="Age" value={formik.values.age} unit="yrs" />
                <ResultItem
                  label="Body Fat"
                  value={formik.values.body_fat}
                  unit="%"
                />
                <ResultItem
                  label="Muscle Mass"
                  value={formik.values.muscle_mass}
                  unit="kg"
                />
                <ResultItem
                  label="Water"
                  value={formik.values.water}
                  unit="%"
                />
                <ResultItem
                  label="Visceral Fat"
                  value={formik.values.visceral_fat}
                />
                <ResultItem
                  label="Bone Mass"
                  value={formik.values.bone_mass}
                  unit="kg"
                />
                <ResultItem
                  label="Metabolism"
                  value={formik.values.metabolism}
                  unit="kcal"
                />
                <ResultItem
                  label="Protein"
                  value={formik.values.protein}
                  unit="%"
                />
                <ResultItem
                  label="Obesity"
                  value={formik.values.obesity}
                  unit="%"
                />
                <ResultItem
                  label="Body Age"
                  value={formik.values.body_age}
                  unit="yrs"
                />
                <ResultItem label="LBM" value={formik.values.lbm} unit="kg" />
              </div>
            </div>

            {/* Note */}
            <div className="mt-4">
              <div className="flex flex-col gap-2">
                <p>Encounter ID (Optional)</p>
                {isFocused ? (
                  <p
                    className={`text-sm transition-colors duration-200 ${
                      isFocused ? "text-blue-800" : "text-gray-600"
                    }`}
                  >
                    Fill in Encounter ID if you want to directly connect to
                    SATUSEHAT platform
                  </p>
                ) : (
                  ""
                )}
              </div>
              <InputText
                type="text"
                name="encounter_id"
                placeholder="Input Encounter ID Here"
                className="w-full"
                value={formik.values.encounter_id}
                onTouch={formik.touched.encounter_id}
                onError={formik.errors.encounter_id}
                onChange={(e) => {
                  formik.setFieldValue("encounter_id", e.target.value);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <p>Note :</p>
              <textarea
                maxLength={150}
                value={formik.values.note}
                className="border w-full h-20 border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="Input Note Here (max 150 characters)"
                onChange={(e) => formik.setFieldValue("note", e.target.value)}
              />
              <div className="flex justify-end">
                <p>{formik.values.note.length}/150</p>
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
    </div>
  );
};
