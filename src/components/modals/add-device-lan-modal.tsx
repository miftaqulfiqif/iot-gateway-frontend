import { useEffect, useState } from "react";
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

const apiUrl = import.meta.env.VITE_API_URL;

type Props = {
  isActive: boolean;
  setInactive: () => void;
  getAllDevices: () => void;
};

export const AddDeviceLan = ({
  isActive,
  setInactive,
  getAllDevices,
}: Props) => {
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
        `${apiUrl}/api/devices/connect-tcpip`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        showToast(null, "Device connected successfully", "success");
        getAllDevices();
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-xl">Connection devices - WiFi / LAN</p>
          </div>
          <ul className="mt-4 space-y-2">
            <div className="flex flex-row bg-white rounded-2xl gap-4 ">
              <form
                className="flex flex-col w-full gap-4"
                onSubmit={formik.handleSubmit}
              >
                <InputText
                  name="name"
                  label="Device name"
                  placeholder="Input device name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onTouch={formik.touched.name}
                  onError={formik.errors.name}
                />
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <label className="text-lg ml-1 mb-2">
                      IP Address <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      {ipSegments.map((segment, i) => (
                        <div key={i} className="flex items-center">
                          <input
                            id={`ip-segment-${i}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={3}
                            className="bg-gray-100 text-sm px-4 py-2 rounded-lg w-16 text-center disabled:bg-slate-200 focus:outline-none"
                            value={segment}
                            onChange={(e) => handleIpChange(i, e.target.value)}
                          />
                          {i < 3 && (
                            <span className="mx-1 text-lg font-semibold">
                              .
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    {formik.touched.id && formik.errors.id && (
                      <p className="text-sm text-red-500 mt-1">
                        {formik.errors.id}
                      </p>
                    )}
                  </div>

                  <InputSelect
                    name="device_function"
                    label="Device "
                    placeholder="Select device "
                    option={[
                      {
                        value: JSON.stringify({
                          device_function: "pasien_monitor_9000",
                          device: "PM 9000",
                        }),
                        label: "PM 9000",
                      },
                      {
                        value: JSON.stringify({
                          device_function: "diagnostic_station_001",
                          device: "DS 001",
                        }),
                        label: "DS 001",
                      },
                    ]}
                    onChange={(value) => {
                      formik.setFieldValue("device_function", value);
                    }}
                    value={formik.values.device_function}
                    onTouch={formik.touched.device_function}
                    onError={formik.errors.device_function}
                    isRequired
                    className="w-40"
                  />
                </div>

                <div className="flex flex-row gap-2 w-full h-10">
                  <button
                    className="w-full border rounded-sm cursor-pointer"
                    onClick={() => setInactive()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white w-full rounded-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};
