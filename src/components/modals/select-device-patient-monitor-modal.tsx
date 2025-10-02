import { useEffect, useState } from "react";
import { TrainTrack, X } from "lucide-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { InputSelect } from "../ui/input-select";
import { useToast } from "@/context/ToastContext";
import Sidebar from "../layouts/sidebar";
import { useDevices } from "@/hooks/api/use-device";
import { useRooms } from "@/hooks/api/use-room";

const dummyDeviceAvailable = [
  {
    id: 1,
    name: "Patient Monitor 20010",
    ip: "192.168.1.2",
  },
  {
    id: 2,
    name: "Patient Monitor 20011",
    ip: "192.168.1.3",
  },
  {
    id: 3,
    name: "Patient Monitor 20012",
    ip: "192.168.1.4",
  },
  {
    id: 4,
    name: "Patient Monitor 20013",
    ip: "192.168.1.5",
  },
];

const option = [
  {
    value: "pasien_monitor_9000",
    label: "PM 9000",
  },
  {
    value: "diagnostic_station_001",
    label: "DS 001",
  },
];

type Props = {
  isActive: boolean;
  setInactive: () => void;
  closeAllModals: () => void;
  patientSelected: any;
  setShowSelectDeviceModal: (value: boolean) => void;
  setShowSelectRoomModal: (value: boolean) => void;
};

export const SelectDevicePatientMonitorModal = ({
  isActive,
  setInactive,
  closeAllModals,
  patientSelected,
  setShowSelectDeviceModal,
  setShowSelectRoomModal,
}: Props) => {
  const { patientMonitoringDevices, getPatientMonitoringDevices } =
    useDevices();
  const { showToast } = useToast();
  const { patientRoom, getPatientRooms } = useRooms();
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [deviceFunction, setDeviceFunction] = useState("");

  useEffect(() => {
    if (patientSelected) {
      getPatientRooms(patientSelected.id, setShowSelectRoomModal);
    }
  }, [patientSelected]);

  useEffect(() => {
    getPatientMonitoringDevices(search, deviceFunction);
  }, [search, deviceFunction]);

  const handleSubmit = () => {
    try {
      const data = {
        patient_id: patientSelected.id,
        device_id: selectedDevice.id,
      };
      console.log("DATA : ", data);

      showToast(null, "Device selected successfully", "success");
      // closeAllModals();
    } catch (error) {
      console.error("❌ Error connecting device:", error);
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 w-full h-full bg-transparent bg-opacity-50 z-50 transition-opacity duration-300  ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="w-full h-full p-4">
        {/* Component Sidebar */}
        <Sidebar state="Central Monitoring" />
      </div>
      {/* Show Modal */}
      <div
        onClick={setInactive}
        className={`fixed top-1/2 left-1/3 transform bg-white rounded-xl p-8 z-50 w-4xl h-fit transition-all duration-300 ease-in-out ${
          isActive ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backdropFilter: "blur(5px)",
          background: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-1/2 left-1/2 transform bg-white rounded-xl p-8 z-50 w-4xl h-fit transition-all duration-300 ease-in-out
          ${
            isActive
              ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
              : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
          }
        `}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <p className="font-bold text-xl">Select Device</p>
              <X className="cursor-pointer" onClick={setInactive} />
            </div>
            <p className="mt-2 font-semibold">Patient info</p>
            {/* Patient Info */}
            <div className="flex flex-col bg-gradient-to-b from-[#6e79f4] to-[#4956F4] shadow-[4px_4px_4px_rgba(0,0,0,0.16),-4px_-4px_4px_rgba(255,255,255,1)] p-4 rounded-xl text-white w-full">
              <div className="flex justify-between w-full">
                <p className="font-semibold text-xl">{patientSelected?.name}</p>
                {patientRoom && (
                  <div className="flex w-fit bg-white text-black justify-center gap-2 px-4 py-2 rounded-2xl font-bold">
                    <p className="font-bold mr-4">{patientRoom.room.name}</p>
                    <p>{patientRoom.room.number}</p>
                    <p>-</p>
                    <p className="bg-green-200 text-green-900 w-20 text-center rounded-full">
                      {patientRoom.room.type}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row">
                  <p className="w-20">NIK</p>
                  <p className="w-4">:</p>
                  <p className="w-full">{patientSelected?.nik}</p>
                </div>
                <div className="flex flex-row">
                  <p className="w-20">Gender</p>
                  <p className="w-4">:</p>
                  <p className="w-full">
                    {patientSelected?.gender === "male" ? "Male" : "Female"}
                  </p>
                </div>
              </div>
            </div>

            {/* LIST DEVICE */}
            <p className="mt-2 font-semibold">Device available</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 w-full">
                <input
                  name="search"
                  type="text"
                  className=" bg-gray-100 text-sm px-4 py-2 rounded-lg w-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="w-1/4">
                  <InputSelect
                    name="device_function"
                    placeholder="Filter  device"
                    option={[
                      {
                        value: "pasien_monitor_9000",
                        label: "PM 9000",
                      },
                      {
                        value: "diagnostic_station_001",
                        label: "DS 001",
                      },
                      {
                        value: "all",
                        label: "All",
                      },
                    ]}
                    onChange={(value) => {
                      setDeviceFunction(value);
                    }}
                    value={deviceFunction}
                  />
                </div>
              </div>
              {/* List of devices */}
              <div className="flex flex-col gap-3 overflow-x-auto h-[250px]">
                {patientMonitoringDevices?.map((device) => (
                  <div
                    key={device.id}
                    className={`flex flex-col gap-2 border rounded-2xl px-4 py-2 cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out ${
                      selectedDevice?.id === device.id
                        ? "bg-gray-100 border-blue-400 border-2"
                        : "bg-white"
                    }`}
                    onClick={() => setSelectedDevice(device)}
                  >
                    <p className="font-semibold">{device.name}</p>
                    <p className="text-base text-gray-500">
                      {device.ip_address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              className={`flex gap-2 justify-center text-white px-4 py-2 rounded-xl mt-10 transition-all duration-300
      ${
        selectedDevice
          ? "bg-gradient-to-b from-[#6e79f4] to-[#4956F4] cursor-pointer hover:brightness-110"
          : "bg-gray-300 text-gray-600 cursor-not-allowed"
      }
    `}
              typeof=""
              disabled={!selectedDevice}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
