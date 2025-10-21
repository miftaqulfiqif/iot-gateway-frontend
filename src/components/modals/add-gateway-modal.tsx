import { useEffect, useState } from "react";
import { InputText } from "../ui/input-text";
import { useFormik } from "formik";
import axios from "axios";
import { InputLongtext } from "../ui/input-longtext";
import * as yup from "yup";
import RoomSelect, { RoomOption } from "../forms/input/room-select";
import { useToast } from "@/context/ToastContext";

const apiUrl = import.meta.env.VITE_API_URL;

type Props = {
  isActive: boolean;
  setInactive: () => void;
};

export const AddGatewayModal = ({ isActive, setInactive }: Props) => {
  const { showToast } = useToast();
  const [selectedRoom, setSelectedRoom] = useState<RoomOption | null>(null);
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

  const handleSave = async (data: any) => {
    try {
      const response = await axios.post(`${apiUrl}/api/iot-gateways`, data, {
        withCredentials: true,
      });

      if (response.status === 201) {
        showToast("Success", "Gateway created successfully", "success");
        setInactive();
      }
      if (response.status === 401) {
        showToast("Error", "Failed to create gateway", "error");
      }
    } catch (error) {
      console.error("Error creating gateway:", error);
      showToast("Error", "Something went wrong", "error");
    }
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      ip_address: "",
      name: "",
      room_id: selectedRoom?.value || "",
      description: "",
    },
    validationSchema: yup.object().shape({
      id: yup.string().required("Gateway serial number is required"),
      ip_address: yup.string().required("IP address is required"),
      name: yup.string().required("Gateway name is required"),
      room_id: yup.string().nullable(),
      description: yup.string().nullable(),
    }),
    onSubmit: (values) => {
      console.log(values);
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
        <p className="font-semibold text-xl mb-5">Add Gateway</p>
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div className="flex gap-4">
            <InputText
              label="Gateway ID / Serial Number"
              name="id"
              placeholder="Input Gateway Serial Number"
              onChange={formik.handleChange}
              value={formik.values.id}
              onTouch={formik.touched.id}
              onError={formik.errors.id}
              isRequired
            />
            <InputText
              name="name"
              label="Gateway Name"
              placeholder="Input Gateway Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onTouch={formik.touched.name}
              onError={formik.errors.name}
              isRequired
            />
          </div>
          <div className="flex gap-4 ">
            <div className="w-1/2">
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
            </div>
            <div className="w-1/2">
              <p className="mb-2">Location</p>
              <RoomSelect
                name="room_id`"
                value={selectedRoom}
                onChange={(option) => {
                  setSelectedRoom(option);
                  formik.setFieldValue("room_id", option?.value || "");
                }}
                onBlur={() => formik.setFieldTouched("room_id", true)}
              />
            </div>
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
