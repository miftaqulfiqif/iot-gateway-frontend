import { useState } from "react";
import {
  Bluetooth,
  Cpu,
  EthernetPort,
  Key,
  LandPlot,
  ScanSearch,
  Wifi,
} from "lucide-react";
import { Devices } from "@/models/DeviceModel";
import { InputText } from "../ui/input-text";
import { useFormik } from "formik";
import * as yup from "yup";
import { InputSelect } from "../ui/input-select";
import { useToast } from "@/context/ToastContext";
import { useSocketHandler } from "@/hooks/socket/SocketHandler";
import axios from "axios";
import { useDevices } from "@/hooks/api/use-device";
import { useAuth } from "@/context/AuthContext";

type Props = {
  isActive: boolean;
  setInactive: () => void;
};

export const AddNewUser = ({ isActive, setInactive }: Props) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [ipSegments, setIpSegments] = useState(["", "", "", ""]);

  const handleConnectDevice = async (value: any) => {
    try {
      const parsed = JSON.parse(value.device_function);

      const data = {
        id: value.id,
        device: parsed.device,
        device_function: parsed.device_function,
        name: parsed.name ? parsed.name : value.name,
        hospital_id: user?.hospital?.id,
        connection: "lan",
      };

      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/api/devices/connect-tcpip",
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        showToast(null, "Device connected successfully", "success");
        setInactive();
      }
    } catch (error: any) {
      console.error("❌ Error connecting device:", error);
      showToast(
        "Error",
        error.response?.data?.message || "Failed to connect device",
        "error"
      );
    }
  };

  const handleIpChange = (index: number, value: string) => {
    if (!/^\d{0,3}$/.test(value)) return; // hanya angka dan max 3 digit
    const newSegments = [...ipSegments];
    newSegments[index] = value;
    setIpSegments(newSegments);

    // Auto focus ke input berikutnya
    if (value.length === 3 && index < 3) {
      const nextInput = document.getElementById(`ip-segment-${index + 1}`);
      nextInput?.focus();
    }

    // Update formik value
    formik.setFieldValue("id", newSegments.join("."));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      name: "",
      device_function: "",
    },
    validationSchema: yup.object().shape({
      id: yup
        .string()
        .required("IP address is required")
        .test("is-valid-ip", "Invalid IP address format", (value) => {
          if (!value) return false;
          const segments = value.split(".");
          if (segments.length !== 4) return false;

          return segments.every((seg) => {
            const num = Number(seg);
            return /^\d+$/.test(seg) && num >= 0 && num <= 255;
          });
        }),
      name: yup.string(),
      device_function: yup.string().required("Device function is required"),
    }),
    onSubmit: (values) => {
      handleConnectDevice(values);
    },
  });

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
          </div>
        </div>
      </div>
    </div>
  );
};
