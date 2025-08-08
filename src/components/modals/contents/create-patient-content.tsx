import CitySelect, { CityOption } from "@/components/forms/input/city-select";
import DistrictSelect, {
  DistrictOption,
} from "@/components/forms/input/district-select";
import ProvinceSelect, {
  ProvinceOption,
} from "@/components/forms/input/province-select";
import VillageSelect, {
  VillageOption,
} from "@/components/forms/input/village-select";
import { InputDate } from "@/components/ui/input-date";
import { InputSelect } from "@/components/ui/input-select";
import { InputText } from "@/components/ui/input-text";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

type Props = {
  patientSelected: (patient: any) => void;
};

export const CreatePatientContent = ({ patientSelected }: Props) => {
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
      name: "",
      nik: "",
      no_kk: "",
      gender: "",
      address: "",
      phone: "",
      place_of_birth: "",
      date_of_birth: "",
      use: "",
      line: "",
      city: "",
      postal_code: "",
      country: "ID",
      rt: "",
      rw: "",
      province_id: "",
      regency_id: "",
      district_id: "",
      village_id: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      nik: yup.string().required("NIK is required"),
      no_kk: yup.string(),
      gender: yup.string().required("Gender is required"),
      address: yup.string(),
      phone: yup.number(),
      place_of_birth: yup.string(),
      date_of_birth: yup.string().required("Date of birth is required"),
      use: yup.string().required("Use is required"),
      line: yup.string().required("Line is required"),
      city: yup.string().required("City is required"),
      postal_code: yup.string().required("Postal code is required"),
      country: yup.string().required("Country is required"),
      rt: yup.string().required("RT is required"),
      rw: yup.string().required("RW is required"),
      province_id: yup.string().required("Province is required"),
      regency_id: yup.string().required("Regency is required"),
      district_id: yup.string().required("District is required"),
      village_id: yup.string().required("Village is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      patientSelected(values);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-5 overflow-x-auto h-[550px] px-1 pb-30">
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
            isRequired
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
        <div className="flex flex-col gap-2">
          <p>Province</p>
          <ProvinceSelect
            value={selectedProvince}
            onChange={setSelectedProvince}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>City</p>
          <CitySelect
            provinceId={selectedProvince?.value}
            value={selectedCity}
            onChange={setSelectedCity}
          />
        </div>
        <div className="flex flex-row gap-4 justify-between w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <p>District</p>
            <DistrictSelect
              regencyId={selectedCity?.value}
              value={selectedDistrict}
              onChange={setSelectedDistrict}
            />
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
            districtId={selectedDistrict?.value}
            value={selectedVillage}
            onChange={setSelectedVillage}
          />
        </div>

        <div className="flex flex-row gap-4 justify-between w-full">
          <div className="w-3/4">
            <InputText
              name="Line"
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
  );
};
