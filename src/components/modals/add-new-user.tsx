import { useEffect, useState } from "react";
import {
  X,
} from "lucide-react";
import { InputText } from "../ui/input-text";
import { useFormik } from "formik";
import * as yup from "yup";
import { InputSelect } from "../ui/input-select";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { InputDate } from "../ui/input-date";
import { InputLongtext } from "../ui/input-longtext";

const roles = [
  {
    id: "admin",
    name: "Admin",
  },
  {
    id: "doctor",
    name: "Doctor",
  },
  {
    id: "nurse",
    name: "Nurse",
  },
];

type Props = {
  isActive: boolean;
  setInactive: () => void;
};

export const AddNewUser = ({ isActive, setInactive }: Props) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [role, setRole] = useState("admin");
  const [valueFormUser, setValueFormUser] = useState<any>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const userSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    role: yup.string().required("Role is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    confirm_password: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const detailSchema = (role: string) =>
    getValidationSchema(role).omit(["email", "username", "password"]);

  const getValidationSchema = (role: string) => {
    return yup.object().shape({
      doctor_id:
        role === "doctor"
          ? yup.string().required("Doctor ID is required")
          : yup.string(),
      nurse_id:
        role === "nurse"
          ? yup.string().required("Nurse ID is required")
          : yup.string(),
      name: yup.string().required("Name is required"),
      place_of_birth:
        role !== "admin"
          ? yup.string().required("Place of birth is required")
          : yup.string(),
      date_of_birth:
        role !== "admin"
          ? yup.string().required("Date of birth is required")
          : yup.string(),
      gender:
        role !== "admin"
          ? yup.string().required("Gender is required")
          : yup.string(),
      address:
        role !== "admin"
          ? yup.string().required("Address is required")
          : yup.string(),
      last_education:
        role !== "admin"
          ? yup.string().required("Last education is required")
          : yup.string(),
      experience:
        role !== "admin"
          ? yup.string().required("Experience is required")
          : yup.string(),
      telp: yup.string().required("Phone number is required"),
      speciality:
        role === "doctor"
          ? yup.string().required("Speciality is required")
          : yup.string(),
      email: yup.string().email().required("Email is required"),
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password is required"),
    });
  };

  const formik = useFormik({
    initialValues: {
      doctor_id: "",
      nurse_id: "",
      name: "",
      place_of_birth: "",
      date_of_birth: "",
      gender: "",
      address: "",
      last_education: "",
      experience: "",
      telp: "",
      speciality: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
      role: role,
    },
    validationSchema:
      step === 1
        ? userSchema
        : yup.object().shape({
            ...userSchema.fields,
            ...detailSchema(role).fields,
          }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Submit Data:", values);
        showToast(null, "User added successfully", "success");
        setInactive();
      } catch (err) {
        console.error("Submit Error", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setInactive();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    formik.setFieldValue("role", role);
  }, [role]);

  return (
    <div
      onClick={setInactive}
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-xl">Add New User</p>
            <div className="flex items-center gap-2">
              <X className="cursor-pointer" onClick={setInactive} />
            </div>
          </div>
          {step === 2 && (
            <div className="flex flex-col gap-2 mt-4">
              <p>Role</p>
              <div className="flex justify-between bg-[#F3F4F6] px-3 py-2 rounded-2xl gap-3 shadow-[inset_0px_4px_4px_rgba(0,0,0,0.3)] transition-all duration-300">
                {roles.map((item) => {
                  const isSelected = role === item.id;
                  const isDisabled = step === 2 && !isSelected;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      disabled={isDisabled}
                      className={`
            w-full h-8 rounded-xl p-1 flex items-center justify-center transition-all duration-300
            ${
              isSelected
                ? "bg-blue-500 text-white shadow-[0px_4px_4px_rgba(0,0,0,0.3)] scale-105"
                : "bg-[#F3F4F6] hover:bg-blue-100"
            }
            ${
              isDisabled
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : "cursor-pointer"
            }
          `}
                      onClick={() => {
                        if (!isDisabled) {
                          setRole(item.id);
                          formik.setFieldValue("role", item.id); // <- update formik value juga
                        }
                      }}
                    >
                      <p className="text-sm">{item.name}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Content */}
          <form
            className="flex flex-col gap-2 transition-all duration-300"
            onSubmit={formik.handleSubmit}
          >
            <div
              className={`flex flex-col gap-2 overflow-y-auto ${
                step === 1 ? "h-[450px]" : "h-[500px]"
              }`}
            >
              {step === 1 ? (
                <FormUser formik={formik} setRole={setRole} />
              ) : role === "admin" ? (
                <FormAdmin formik={formik} />
              ) : role === "doctor" ? (
                <FormDoctor formik={formik} />
              ) : (
                <FormNurse formik={formik} />
              )}
            </div>

            {/* Button */}
            {step === 1 ? (
              <button
                type="submit"
                onClick={() => {
                  formik.validateForm().then((errors) => {
                    const hasError =
                      !!errors.email || !!errors.username || !!errors.password;
                    if (!hasError) {
                      setStep(2);
                    } else {
                      showToast(
                        null,
                        "Please complete account information.",
                        "warning"
                      );
                    }
                  });
                }}
                className="bg-white  text-blue-500 border-2 border-blue-500 p-3 rounded-xl font-bold cursor-pointer hover:bg-gray-200  mt-10"
              >
                Next
              </button>
            ) : (
              <div className="flex gap-2 w-full mt-10">
                <button
                  className="w-full bg-white  text-blue-500 border-2 border-blue-500 p-3 rounded-xl font-bold cursor-pointer hover:bg-gray-200 "
                  onClick={() => setStep(1)}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-xl font-bold cursor-pointer hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const FormUser = ({
  formik,
  setRole,
}: {
  formik: any;
  setRole: (value: string) => void;
}) => {
  return (
    <>
      <div className="flex w-full gap-2">
        <InputText
          type="text"
          label="Email"
          name="email"
          placeholder="youremail@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onTouch={formik.touched.email}
          onError={formik.errors.email}
          isRequired
        />
        <div className="w-1/2">
          <InputSelect
            label="Role"
            name="role"
            placeholder="Select Role"
            option={[
              { value: "admin", label: "Admin" },
              { value: "doctor", label: "Doctor" },
              { value: "nurse", label: "Nurse" },
            ]}
            value={formik.values.role}
            onChange={(value) => {
              formik.setFieldValue("role", value);
              setRole(value);
            }}
            onTouch={formik.touched.role}
            onError={formik.errors.role}
            isRequired
          />
        </div>
      </div>

      <InputText
        type="text"
        label="Username"
        name="username"
        placeholder="Input Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        onTouch={formik.touched.username}
        onError={formik.errors.username}
        isRequired
      />
      <InputText
        type="password"
        label="Password"
        name="password"
        placeholder="Input Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onTouch={formik.touched.password}
        onError={formik.errors.password}
        isRequired
      />
      <InputText
        type="password"
        label="Confirm password"
        name="confirm_password"
        placeholder="Input Confirm Password"
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        onTouch={formik.touched.confirm_password}
        onError={formik.errors.confirm_password}
        isRequired
      />
    </>
  );
};

const FormAdmin = ({ formik }: { formik: any }) => {
  return (
    <>
      <div className="flex gap-4">
        <InputText
          type="text"
          label="Name"
          name="name"
          placeholder="Input Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onTouch={formik.touched.name}
          onError={formik.errors.name}
          isRequired
        />
        <div className="w-1/3">
          <InputSelect
            label="Gender"
            name="gender"
            placeholder="Select Gender"
            option={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            onChange={(value) => {
              formik.setFieldValue("gender", value);
            }}
            value={formik.values.gender}
            onTouch={formik.touched.gender}
            onError={formik.errors.gender}
            isRequired
          />
        </div>
      </div>
      <div className="flex gap-4">
        <InputText
          type="text"
          label="Place of Birth"
          name="place_of_birth"
          placeholder="Input Place of Birth"
          value={formik.values.place_of_birth}
          onChange={formik.handleChange}
          onTouch={formik.touched.place_of_birth}
          onError={formik.errors.place_of_birth}
          isRequired
        />
        <div className="w-1/3">
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
      <InputText
        label="Telp"
        name="telp"
        placeholder="Input Telp"
        value={formik.values.telp}
        onChange={formik.handleChange}
        onTouch={formik.touched.telp}
        onError={formik.errors.telp}
        isRequired
      />
      <InputLongtext
        label="Address"
        name="address"
        placeholder="Input Address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onTouch={formik.touched.address}
        onError={formik.errors.address}
        isRequired
        maxLength={100}
      />
    </>
  );
};

const FormDoctor = ({ formik }: { formik: any }) => {
  return (
    <>
      <InputText
        type="text"
        label="ID Doctor"
        name="doctor_id"
        placeholder="Input ID Doctor"
        value={formik.values.doctor_id}
        onChange={formik.handleChange}
        onTouch={formik.touched.doctor_id}
        onError={formik.errors.doctor_id}
        isRequired
      />
      <div className="flex gap-2">
        <InputText
          type="text"
          label="Name"
          name="name"
          placeholder="Input Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onTouch={formik.touched.name}
          onError={formik.errors.name}
          isRequired
        />
        <div className="w-1/3">
          <InputSelect
            label="Gender"
            name="gender"
            placeholder="Select Gender"
            option={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            onChange={(value) => {
              formik.setFieldValue("gender", value);
            }}
            value={formik.values.gender}
            onTouch={formik.touched.role}
            onError={formik.errors.role}
            isRequired
          />
        </div>
      </div>

      <div className="flex gap-2">
        <InputText
          type="text"
          label="Place of Birth"
          name="place_of_birth"
          placeholder="Input Place of Birth"
          value={formik.values.place_of_birth}
          onChange={formik.handleChange}
          onTouch={formik.touched.place_of_birth}
          onError={formik.errors.place_of_birth}
          isRequired
        />
        <div className="w-1/3">
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
      <div className="flex gap-2">
        <InputText
          label="Telp"
          name="telp"
          placeholder="Input Telp"
          value={formik.values.telp}
          onChange={formik.handleChange}
          onTouch={formik.touched.telp}
          onError={formik.errors.telp}
          isRequired
        />
        <InputText
          label="Sepeciality"
          name="speciality"
          placeholder="Input Sepeciality"
          value={formik.values.speciality}
          onChange={formik.handleChange}
          onTouch={formik.touched.speciality}
          onError={formik.errors.speciality}
          isRequired
        />
      </div>

      <div className="flex gap-2">
        <InputText
          label="Last Education"
          name="last_education"
          placeholder="Input Last Education"
          value={formik.values.last_education}
          onChange={formik.handleChange}
          onTouch={formik.touched.last_education}
          onError={formik.errors.last_education}
          isRequired
        />
        <div className="w-1/2">
          <InputText
            label="Experience (Years)"
            name="experience"
            type="number"
            placeholder="Input Experience"
            value={formik.values.experience}
            onChange={formik.handleChange}
            onTouch={formik.touched.experience}
            onError={formik.errors.experience}
            isRequired
          />
        </div>
      </div>
      <InputLongtext
        label="Address"
        name="address"
        placeholder="Input Address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onTouch={formik.touched.address}
        onError={formik.errors.address}
        isRequired
        maxLength={100}
      />
    </>
  );
};

const FormNurse = ({ formik }: { formik: any }) => {
  return (
    <>
      <InputText
        type="text"
        label="Nurse ID"
        name="nurse_id"
        placeholder="Input Nurse ID"
        value={formik.values.nurse_id}
        onChange={formik.handleChange}
        onTouch={formik.touched.nurse_id}
        onError={formik.errors.nurse_id}
        isRequired
      />

      <div className="flex gap-4">
        <InputText
          type="text"
          label="Name"
          name="name"
          placeholder="Input Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onTouch={formik.touched.name}
          onError={formik.errors.name}
          isRequired
        />
        <div className="w-1/3">
          <InputSelect
            label="Gender"
            name="gender"
            placeholder="Select Gender"
            option={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            onChange={(value) => {
              formik.setFieldValue("gender", value);
            }}
            value={formik.values.gender}
            onTouch={formik.touched.gender}
            onError={formik.errors.gender}
            isRequired
          />
        </div>
      </div>

      <div className="flex gap-4">
        <InputText
          type="text"
          label="Place of Birth"
          name="place_of_birth"
          placeholder="Input Place of Birth"
          value={formik.values.place_of_birth}
          onChange={formik.handleChange}
          onTouch={formik.touched.place_of_birth}
          onError={formik.errors.place_of_birth}
          isRequired
        />
        <div className="w-1/3">
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
      <InputText
        label="Telp"
        name="telp"
        placeholder="Input Telp"
        value={formik.values.telp}
        onChange={formik.handleChange}
        onTouch={formik.touched.telp}
        onError={formik.errors.telp}
        isRequired
      />

      <div className="flex gap-4">
        <InputText
          label="Last Education"
          name="last_education"
          placeholder="Input Last Education"
          value={formik.values.last_education}
          onChange={formik.handleChange}
          onTouch={formik.touched.last_education}
          onError={formik.errors.last_education}
          isRequired
        />
        <div className="w-1/2">
          <InputText
            label="Experience (Years)"
            name="experience"
            type="number"
            placeholder="Input Experience"
            value={formik.values.experience}
            onChange={formik.handleChange}
            onTouch={formik.touched.experience}
            onError={formik.errors.experience}
            isRequired
          />
        </div>
      </div>
      <InputLongtext
        label="Address"
        name="address"
        placeholder="Input Address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onTouch={formik.touched.address}
        onError={formik.errors.address}
        isRequired
        maxLength={100}
      />
    </>
  );
};
