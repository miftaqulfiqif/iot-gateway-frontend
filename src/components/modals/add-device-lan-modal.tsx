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

type Props = {
  isActive: boolean;
  setInactive: () => void;
};

export const AddDeviceLan = ({ isActive, setInactive }: Props) => {
  const [selectedDevice, setSelectedDevice] = useState<Devices | null>(null);
  const { showToast } = useToast();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ip_address: "",
      device_name: "",
      device_function: "",
    },
    validationSchema: yup.object().shape({
      ip_address: yup.string().required("IP address is required"),
      device_name: yup.string(),
      device_function: yup.string().required("Device function is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      showToast(null, "Device added successfully", "success");
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
                  name="device_name"
                  label="Device name"
                  placeholder="Input device name"
                  onChange={formik.handleChange}
                  value={formik.values.device_name}
                  onTouch={formik.touched.device_name}
                  onError={formik.errors.device_name}
                />
                <div className="flex flex-row gap-4">
                  <InputText
                    name="ip_address"
                    label="IP Address"
                    placeholder="Input IP address"
                    onChange={formik.handleChange}
                    value={formik.values.ip_address}
                    onTouch={formik.touched.ip_address}
                    onError={formik.errors.ip_address}
                    isRequired
                  />
                  <InputSelect
                    name="device_function"
                    label="Device "
                    placeholder="Select device "
                    option={[
                      { value: "pasien_monitor_9000", label: "PM 9000" },
                      { value: "diagnostic_station_001", label: "DS 001" },
                    ]}
                    onChange={(value) =>
                      formik.setFieldValue("device_function", value)
                    }
                    value={formik.values.device_function}
                    onTouch={formik.touched.device_function}
                    onError={formik.errors.device_function}
                    isRequired
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
