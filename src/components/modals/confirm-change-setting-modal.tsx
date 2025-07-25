import { useEffect } from "react";
import { InputText } from "../ui/input-text";
import { useFormik } from "formik";
import * as yup from "yup";
import { useToast } from "@/context/ToastContext";

type Props = {
  isActive: boolean;
  setInactive: () => void;
};

export const ConfirmChangeSettingModal = ({ isActive, setInactive }: Props) => {
  const { showToast } = useToast();

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

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Userbane is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      showToast(null, "Gateway added successfully", "success");
      setInactive();
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
        <p className="font-semibold text-xl mb-5">Add Gateway</p>
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <InputText
            name="username"
            label="Username"
            placeholder="Input Username"
            onChange={formik.handleChange}
            value={formik.values.username}
            onTouch={formik.touched.username}
            onError={formik.errors.username}
            isRequired
          />
          <InputText
            name="password"
            label="Password"
            placeholder="Input Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onTouch={formik.touched.password}
            onError={formik.errors.password}
            isRequired
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-blue-500 text-white text-center rounded-sm py-2 mx-auto font-bold mt-4 cursor-pointer w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
