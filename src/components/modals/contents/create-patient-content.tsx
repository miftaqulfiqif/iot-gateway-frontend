import { InputDate } from "@/components/ui/input-date";
import { InputSelect } from "@/components/ui/input-select";
import { InputText } from "@/components/ui/input-text";
import { UsePatient } from "@/hooks/api/use-patient";
import { useFormik } from "formik";
import * as yup from "yup";

type Props = {
  patientSelected: (patient: any) => void;
};

export const CreatePatientContent = ({ patientSelected }: Props) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      gender: "",
      address: "",
      phone: "",
      last_education: "",
      place_of_birth: "",
      date_of_birth: "",
      work: "",
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
    onSubmit: (values, { resetForm }) => {
      patientSelected(values);
      resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" flex flex-col pt-10 h-full justify-between"
    >
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
          className="px-4 py-2 bg-blue-white border-blue-700 text-blue-700 border-2 rounded-full w-xs mt-8 disabled:bg-red-500 "
        >
          Submit
        </button>
      </div>
    </form>
  );
};
