import { useEffect, useState } from "react";
import { Cpu, X } from "lucide-react";
import { useSocketHandler } from "@/hooks/socket/SocketHandler";
import { Devices } from "@/models/DeviceModel";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useDevices } from "@/hooks/api/use-device";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

type Props = {
  isActive: boolean;
  setInactive: () => void;
  selectedDevice?: Devices | null;
  closeModal: () => void;
};

export const ConnectingDeviceModal = ({
  isActive,
  setInactive,
  selectedDevice,
  closeModal,
}: Props) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { getAllDevices } = useDevices();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (selectedDevice?.device) {
      setDisplayName(selectedDevice.device);
    }
  }, [selectedDevice]);

  const handleConnectDevice = async (value: any) => {
    try {
      const data = {
        id: selectedDevice?.mac,
        hospital_id: user?.hospital?.id,
        device: selectedDevice?.device,
        device_function: selectedDevice?.device_function,
        connection: selectedDevice?.connection,
        name: value.device_name ? value.device_name : selectedDevice?.device,
      };

      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/api/devices/connect-bluetooth",
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        showToast(null, "Device connected successfully", "success");
        getAllDevices();
        closeModal();
        location.reload();
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      device_name: "",
    },
    validationSchema: yup.object().shape({
      device_name: yup.string(),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleConnectDevice(values);
    },
  });

  return (
    <div
      onClick={setInactive}
      className={`fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 z-50 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ background: "rgba(0, 0, 0, 0.2)" }}
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
        <div className="flex flex-row justify-between">
          <p className="font-semibold text-xl mb-4">Connecting Device</p>
          <X className="w-6 h-6 cursor-pointer" onClick={setInactive} />
        </div>

        {selectedDevice && (
          <div className="flex px-4 py-2 items-center rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] pl-4 justify-between bg-blue-100 font-semibold mb-8">
            <div className="flex flex-row gap-3 items-center">
              <Cpu className="w-10 h-10" />
              <div className="flex flex-col">
                <p className="text-lg">{selectedDevice.device}</p>
                <p className="text-sm">{selectedDevice.mac}</p>
              </div>
            </div>
            <div className="flex flex-row gap-2 bg-green-300 px-4 py-2 rounded-full">
              <p>ONLINE</p>
            </div>
          </div>
        )}

        <p className="text-lg">Alias device name</p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 mt-1"
        >
          <input
            name="device_name"
            type="text"
            value={formik.values.device_name}
            onChange={formik.handleChange}
            placeholder="Device name"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-xl cursor-pointer"
          >
            Connect
          </button>
        </form>
      </div>
    </div>
  );
};
