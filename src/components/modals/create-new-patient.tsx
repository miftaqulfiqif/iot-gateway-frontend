import { InputDate } from "@/components/ui/input-date";
import { InputText } from "@/components/ui/input-text";
import { InputSelect } from "@/components/ui/input-select";

import patients from "@/assets/icons/patients-icon.png";

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Patients } from "@/models/PatientModel";
import { BarcodeIcon, ScanBarcode, X } from "lucide-react";
import { UsePatient } from "@/hooks/api/use-patient";

type CreateNewPatientProps = {
  form: boolean;
  setPatient: (e: any) => void;
  closeModal: () => void;
  fetchPatients?: () => void;
  openFormSelectPatient?: () => void;
  openFormBarcode?: () => void;
  buttonLoading?: boolean;
  patient?: Patients;
};

export const CreateNewPatient = (props: CreateNewPatientProps) => {
  const {
    form,
    setPatient,
    closeModal,
    fetchPatients,
    openFormSelectPatient,
    openFormBarcode,
    buttonLoading,
    patient,
  } = props;

  const { updatePatient, savePatient } = UsePatient({
    fetchPatients,
    closeModal,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: patient?.name || "",
      gender: patient?.gender || "",
      address: patient?.address || "",
      phone: patient?.phone || "",
      last_education: patient?.last_education || "",
      place_of_birth: patient?.place_of_birth || "",
      date_of_birth: patient?.date_of_birth
        ? patient.date_of_birth.split("T")[0]
        : "",
      work: patient?.work || "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      gender: yup.string().required("Gender is required"),
      address: yup.string(),
      phone: yup.number(),
      last_education: yup.string(),
      place_of_birth: yup.string(),
      date_of_birth: yup.string().required("Date of birth is required"),
      work: yup.string(),
    }),
    onSubmit: (values) => {
      if (openFormSelectPatient) {
        if (!patient) {
          setPatient(values);
        }
      } else {
        console.log("CREATED PATIENT");
        if (patient) {
          console.log("UPDATE PATIENT");
          const updatedPatient = {
            ...patient,
            name: values.name,
            gender: values.gender,
            phone: values.phone,
            last_education: values.last_education,
            place_of_birth: values.place_of_birth,
            date_of_birth: values.date_of_birth,
            work: values.work,
          };
          updatePatient(updatedPatient);
        } else {
          savePatient(values);
        }
      }
      closeModal();
    },
  });

  return (
    <div
      onClick={closeModal}
      className={`fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 z-90 transition-opacity duration-300 ${
        form ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-1/2 transform bg-white rounded-xl p-8 z-50 w-4xl h-[600px] transition-all duration-300 ease-in-out
    ${
      form
        ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
        : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
    }
  `}
      >
        <div className="flex flex-row justify-between mb-8">
          <p className="text-2xl font-semibold">
            {patient ? "Edit patient" : "Create new patient"}
          </p>
          {openFormSelectPatient ? (
            <div className="flex flex-row gap-4 bg-[#f0f0f0] px-4 py-2 rounded-xl">
              <div
                className={
                  openFormBarcode
                    ? ` items-center px-4 py-2 rounded-xl cursor-pointer `
                    : `bg-white items-center px-4 py-2 rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.2)] cursor-pointer`
                }
                onClick={openFormBarcode}
              >
                <p className="text-blue-700 font-semibold">Scan Barcode</p>
              </div>
              <div
                className={
                  !openFormSelectPatient
                    ? `bg-white items-center px-4 py-2 rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.2)]`
                    : `items-center px-4 py-2 rounded-xl cursor-pointer `
                }
                onClick={openFormSelectPatient}
              >
                <p className="text-blue-700 font-semibold">Select Patient</p>
              </div>
              <div
                className={
                  form
                    ? `bg-white items-center px-4 py-2 rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.2)]`
                    : ` items-center px-4 py-2 rounded-xl `
                }
              >
                <p className="text-blue-700 font-semibold">Create Patient</p>
              </div>
            </div>
          ) : (
            <X className="cursor-pointer w-5 h-5" onClick={closeModal} />
          )}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-4 justify-between w-full">
              <InputText
                name="name"
                label="Name"
                placeholder="Input name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onTouch={formik.touched.name}
                onError={formik.errors.name}
                isRequired
              />

              <InputSelect
                label="Gender"
                name="gender"
                placeholder="Select gender"
                option={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                onChange={(value) => formik.setFieldValue("gender", value)}
                value={formik.values.gender}
                onTouch={formik.touched.gender}
                onError={formik.errors.gender}
                isRequired
              />
            </div>
            <div className="flex flex-row gap-4 justify-between w-full">
              <InputText
                name="phone"
                type="tel"
                label="Phone"
                placeholder="Input phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onTouch={formik.touched.phone}
                onError={formik.errors.phone}
              />
              <InputText
                name="last_education"
                label="Last education"
                placeholder="Input last education"
                onChange={formik.handleChange}
                value={formik.values.last_education}
                onTouch={formik.touched.last_education}
                onError={formik.errors.last_education}
              />
            </div>
            <div className="flex flex-row gap-4 justify-between w-full">
              <InputText
                name="place_of_birth"
                label="Place of birth"
                placeholder="Input place of birth"
                onChange={formik.handleChange}
                value={formik.values.place_of_birth}
                onTouch={formik.touched.place_of_birth}
                onError={formik.errors.place_of_birth}
              />
              <InputDate
                name="date_of_birth"
                label="Date of birth"
                onChange={formik.handleChange}
                value={formik.values.date_of_birth}
                onTouch={formik.touched.date_of_birth}
                onError={formik.errors.date_of_birth}
                isRequired
              />
            </div>
            <div className="flex flex-row gap-4 justify-between w-full">
              <InputText
                name="address"
                label="Address"
                placeholder="Input address"
                onChange={formik.handleChange}
                value={formik.values.address}
                onTouch={formik.touched.address}
                onError={formik.errors.address}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={buttonLoading}
              className="px-4 py-2 bg-blue-white border-blue-700 text-blue-700 border-2 rounded-full w-xs mt-8 disabled:bg-red-500 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
