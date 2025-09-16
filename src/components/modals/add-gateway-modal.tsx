import { useEffect } from "react";
import { InputText } from "../ui/input-text";
import { useFormik } from "formik";
import { InputLongtext } from "../ui/input-longtext";
import * as yup from "yup";
import { useToast } from "@/context/ToastContext";

type Props = {
  isActive: boolean;
  setInactive: () => void;
};

export const AddGatewayModal = ({ isActive, setInactive }: Props) => {
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
      gateway_sn: "",
      ip_address: "",
      gateway_name: "",
      location: "",
      description: "",
    },
    validationSchema: yup.object().shape({
      gateway_sn: yup.string().required("Gateway serial number is required"),
      ip_address: yup.string().required("IP address is required"),
      gateway_name: yup.string().required("Gateway name is required"),
      location: yup.string().required("Location is required"),
      description: yup.string().required("Description is required"),
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
          <div className="flex gap-4">
            <InputText
              label="Gateway ID / Serial Number"
              name="gateway_sn"
              placeholder="Input Gateway Serial Number"
              onChange={formik.handleChange}
              value={formik.values.gateway_sn}
              onTouch={formik.touched.gateway_sn}
              onError={formik.errors.gateway_sn}
              isRequired
            />
            <InputText
              name="gateway_name"
              label="Gateway Name"
              placeholder="Input Gateway Name"
              onChange={formik.handleChange}
              value={formik.values.gateway_name}
              onTouch={formik.touched.gateway_name}
              onError={formik.errors.gateway_name}
              isRequired
            />
          </div>
          <div className="flex gap-4">
            <InputText
              name="ip_address"
              label="IP Address"
              placeholder="Input Gateway IP Address"
              onChange={formik.handleChange}
              value={formik.values.ip_address}
              onTouch={formik.touched.ip_address}
              onError={formik.errors.ip_address}
              isRequired
            />
            <InputText
              name="location"
              label="Gateway Location"
              placeholder="Input Gateway Location"
              onChange={formik.handleChange}
              value={formik.values.location}
              onTouch={formik.touched.location}
              onError={formik.errors.location}
              isRequired
            />
          </div>
          <InputLongtext
            name="description"
            label="Description"
            placeholder="Input Description"
            onChange={formik.handleChange}
            value={formik.values.description}
            onTouch={formik.touched.description}
            onError={formik.errors.description}
            rows={4}
            maxLength={150}
            isRequired
          />

          <button
            type="submit"
            className="flex items-center justify-center bg-blue-500 text-white text-center rounded-lg py-2 mx-auto font-bold mt-4 cursor-pointer w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
