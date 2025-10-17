import { InputDate } from "@/components/ui/input-date";
import { InputText } from "@/components/ui/input-text";
import { InputSelect } from "@/components/ui/input-select";

import { useFormik } from "formik";
import * as yup from "yup";
import { Patients } from "@/models/PatientModel";
import { X } from "lucide-react";
import { usePatient } from "@/hooks/api/use-patient";
import { useEffect, useState } from "react";
import CitySelect, { CityOption } from "../forms/input/city-select";
import ProvinceSelect, { ProvinceOption } from "../forms/input/province-select";
import DistrictSelect, { DistrictOption } from "../forms/input/district-select";
import VillageSelect, { VillageOption } from "../forms/input/village-select";

type CreateNewPatientProps = {
  form: boolean;
  setPatient: (e: any) => void;
  closeModal: () => void;
  fetchPatients?: () => void;
  openFormSelectPatient?: () => void;
  openFormBarcode?: () => void;
  patient?: Patients;
  showToast?: any;
};

export const CreateNewPatient = (props: CreateNewPatientProps) => {
  const {
    form,
    setPatient,
    closeModal,
    fetchPatients,
    openFormSelectPatient,
    openFormBarcode,
    patient,
    showToast,
  } = props;

  const { updatePatient, savePatient } = usePatient({
    fetchPatients,
    closeModal,
    showToast,
  });

  const [selectedProvince, setSelectedProvince] =
    useState<ProvinceOption | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [selectedDistrict, setSelectedDistrict] =
    useState<DistrictOption | null>(null);
  const [selectedVillage, setSelectedVillage] = useState<VillageOption | null>(
    null
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: patient?.name || "",
      nik: patient?.nik || "",
      no_kk: patient?.no_kk || "",
      gender: patient?.gender || "",
      address: patient?.address || "",
      phone: patient?.phone || "",
      place_of_birth: patient?.place_of_birth || "",
      date_of_birth: patient?.date_of_birth
        ? patient.date_of_birth.split("T")[0]
        : "",
      use: patient?.address.use || "",
      line: patient?.address.line || "",
      city: patient?.address.city || "",
      postal_code: patient?.address.postal_code || "",
      country: patient?.address.country || "ID",
      rt: patient?.address.rt || "",
      rw: patient?.address.rw || "",
      province: patient?.address.province
        ? {
            value: patient.address.province.id,
            label: patient.address.province.name,
          }
        : null,
      regency: patient?.address.regency
        ? {
            value: patient.address.regency.id,
            label: patient.address.regency.name,
          }
        : null,
      district: patient?.address.district
        ? {
            value: patient.address.district.id,
            label: patient.address.district.name,
          }
        : null,
      village: patient?.address.village
        ? {
            value: patient.address.village.id,
            label: patient.address.village.name,
          }
        : null,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      nik: yup.string().required("NIK is required"),
      no_kk: yup.string(),
      gender: yup.string().required("Gender is required"),
      phone: yup.number(),
      place_of_birth: yup.string(),
      date_of_birth: yup.string().required("Date of birth is required"),
      use: yup.string().required("Use is required"),
      // line: yup.string().required("Line is required"),
      city: yup.string().required("City is required"),
      postal_code: yup.string().required("Postal code is required"),
      country: yup.string().required("Country is required"),
      rt: yup.string().required("RT is required"),
      rw: yup.string().required("RW is required"),
      province: yup.string().required("Province is required"),
      regency: yup.string().required("Regency is required"),
      district: yup.string().required("District is required"),
      village: yup.string().required("Village is required"),
    }),
    onSubmit: (values) => {
      const data = {
        nik: values.nik,
        name: values.name,
        no_kk: values.no_kk,
        gender: values.gender,
        phone: values.phone,
        place_of_birth: values.place_of_birth,
        date_of_birth: values.date_of_birth,
        address: {
          use: values.use,
          line: values.line,
          city: values.city,
          postal_code: values.postal_code,
          country: values.country,
          rt: values.rt,
          rw: values.rw,
          province_id: values.province,
          regency_id: values.regency,
          district_id: values.district,
          village_id: values.village,
        },
      };

      if (openFormSelectPatient) {
        if (!patient) {
          setPatient(values);
        }
      } else {
        console.log("CREATED PATIENT : ", data);
        if (patient) {
          console.log("UPDATE PATIENT");
          const updatedPatient = {
            ...patient,
            name: values.name,
            nik: values.nik,
            gender: values.gender,
            phone: values.phone,
            place_of_birth: values.place_of_birth,
            date_of_birth: values.date_of_birth,
          };
          updatePatient(updatedPatient);
        } else {
          savePatient(data);
        }
      }
      closeModal();
    },
  });

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

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
        className={`fixed top-1/2 left-1/2 transform bg-white rounded-xl p-8 z-50 w-4xl h-[700px] transition-all duration-300 ease-in-out
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
          <div className="flex flex-col gap-5 overflow-x-auto h-[500px] px-1 pb-30">
            <div className="flex flex-row gap-4 justify-between w-full">
              <InputText
                name="nik"
                label="NIK"
                placeholder="Input NIK"
                onChange={formik.handleChange}
                value={formik.values.nik}
                onTouch={formik.touched.nik}
                onError={formik.errors.nik}
                isRequired
              />
              <InputText
                name="no_kk"
                label="No KK"
                placeholder="Input No KK"
                onChange={formik.handleChange}
                value={formik.values.no_kk}
                onTouch={formik.touched.no_kk}
                onError={formik.errors.no_kk}
              />
            </div>
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
            <div className="flex flex-row gap-4">
              <div className="w-full">
                <InputText
                  name="place_of_birth"
                  label="Place of birth"
                  placeholder="Input place of birth"
                  onChange={formik.handleChange}
                  value={formik.values.place_of_birth}
                  onTouch={formik.touched.place_of_birth}
                  onError={formik.errors.place_of_birth}
                />
              </div>
              <div className="w-fit">
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
            </div>
            <hr className="mt-4" />
            <p>Address :</p>
            <InputSelect
              label="Use"
              name="use"
              placeholder="Select use"
              value={formik.values.use}
              onChange={(value) => formik.setFieldValue("use", value)}
              option={[
                { value: "home", label: "Home" },
                { value: "work", label: "Work" },
                { value: "other", label: "Other" },
              ]}
            />
            {formik.touched.use && formik.errors.use && (
              <p className="text-red-500 text-sm">{formik.errors.use}</p>
            )}
            <div className="flex flex-col gap-2">
              <p>Province</p>
              <ProvinceSelect
                name="province"
                value={selectedProvince}
                onChange={(option) => {
                  setSelectedProvince(option);
                  formik.setFieldValue("province", option?.value || "");
                  if (option !== selectedProvince) {
                    setSelectedCity(null);
                    setSelectedDistrict(null);
                    setSelectedVillage(null);
                    formik.setFieldValue("regency", null);
                    formik.setFieldValue("city", null);
                    formik.setFieldValue("district", null);
                    formik.setFieldValue("village", null);
                  }
                }}
                onBlur={() => formik.setFieldTouched("province", true)}
              />
              {formik.touched.province && formik.errors.province && (
                <p className="text-red-500 text-sm">{formik.errors.province}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p>City</p>
              <CitySelect
                name="regency"
                provinceId={selectedProvince?.value}
                value={selectedCity}
                onChange={(option) => {
                  setSelectedCity(option);
                  formik.setFieldValue("regency", option?.value || "");
                  formik.setFieldValue("city", option?.label || "");
                  if (option !== selectedCity) {
                    setSelectedDistrict(null);
                    setSelectedVillage(null);
                    formik.setFieldValue("district", null);
                    formik.setFieldValue("village", null);
                  }
                }}
                onBlur={() => formik.setFieldTouched("regency", true)}
                disabled={!selectedProvince}
              />
              {formik.touched.regency && formik.errors.regency && (
                <p className="text-red-500 text-sm">{formik.errors.regency}</p>
              )}
            </div>
            <div className="flex flex-row gap-4 justify-between w-full">
              <div className="flex flex-col gap-2 w-1/2">
                <p>District</p>
                <DistrictSelect
                  name="district"
                  regencyId={selectedCity?.value}
                  value={selectedDistrict}
                  onChange={(option) => {
                    setSelectedDistrict(option);
                    formik.setFieldValue("district", option?.value || "");
                    if (option !== selectedDistrict) {
                      setSelectedVillage(null);
                      formik.setFieldValue("village", null);
                    }
                  }}
                  onBlur={() => formik.setFieldTouched("district", true)}
                  disabled={!selectedCity}
                />
                {formik.touched.district && formik.errors.district && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.district}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <InputText
                  name="postal_code"
                  label="Postal Code"
                  placeholder="Input Postal Code"
                  onChange={formik.handleChange}
                  value={formik.values.postal_code}
                  onTouch={formik.touched.postal_code}
                  onError={formik.errors.postal_code}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Village</p>
              <VillageSelect
                name="village"
                districtId={selectedDistrict?.value}
                value={selectedVillage}
                onChange={(option) => {
                  setSelectedVillage(option);
                  formik.setFieldValue("village", option?.value || "");
                }}
                onBlur={() => formik.setFieldTouched("village", true)}
                disabled={!selectedDistrict}
              />
              {formik.touched.village && formik.errors.village && (
                <p className="text-red-500 text-sm">{formik.errors.village}</p>
              )}
            </div>

            <div className="flex flex-row gap-4 justify-between w-full">
              <div className="w-3/4">
                <InputText
                  name="line"
                  label="Line"
                  placeholder="Input Line"
                  onChange={formik.handleChange}
                  value={formik.values.line}
                  onTouch={formik.touched.line}
                  onError={formik.errors.line}
                />
              </div>
              <div className="flex gap-4 w-1/2">
                <InputText
                  name="rt"
                  label="RT"
                  placeholder="Input RT"
                  onChange={formik.handleChange}
                  value={formik.values.rt}
                  onTouch={formik.touched.rt}
                  onError={formik.errors.rt}
                />
                <InputText
                  name="rw"
                  label="RW"
                  placeholder="Input RW"
                  onChange={formik.handleChange}
                  value={formik.values.rw}
                  onTouch={formik.touched.rw}
                  onError={formik.errors.rw}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-white border-blue-700 text-blue-700 border-2 rounded-full w-xs mt-8 disabled:bg-red-500 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
