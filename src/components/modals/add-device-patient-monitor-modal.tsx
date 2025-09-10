import { ArrowLeft, BedSingle, EllipsisVertical, User, X } from "lucide-react";
import Sidebar from "../layouts/sidebar";

import barcodeImg from "@/assets/gif/scan-barcode.gif";
import { SelectPatientContent } from "./contents/select-patient-content";
import { CreatePatientContent } from "./contents/create-patient-content";
import React, { use, useEffect, useState } from "react";
import { useRooms } from "@/hooks/api/use-room";
import { BedsModel, RoomsModel } from "@/models/RoomModel";
import { RoomItems } from "../sections/rooms-page/room-item";
import { be } from "date-fns/locale";
import { InputSelect } from "../ui/input-select";
import { useDevices } from "@/hooks/api/use-device";
import { useCentralMonitor } from "@/hooks/api/use-central-monitor";

const step = [
  { id: 1, title: "Select Patient" },
  { id: 2, title: "Select Room" },
  { id: 3, title: "Select Device" },
];
type Props = {
  isActive: boolean;
  setNonactive: () => void;
  stateSidebar: string;
};

export const AddDevicePatientMonitorModal = ({
  isActive,
  setNonactive,
  stateSidebar,
}: Props) => {
  const { patientMonitoringDevices, getPatientMonitoringDevices } =
    useDevices();

  const [indexStep, setIndexStep] = useState(0);
  const { createCentralMonitor, getAllCentralMonitor } = useCentralMonitor();
  const { rooms, beds, getAllRooms, getBeds } = useRooms();
  const [state, setState] = useState("barcode");
  const [patientSelected, setPatientSelected] = useState<any>(null);
  const [roomSelected, setRoomSelected] = useState<any>(null);
  const [bedSelected, setBedSelected] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [deviceFunction, setDeviceFunction] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  useEffect(() => {
    if (indexStep === 0) {
      console.log("Step 1: Select Patient");
      setRoomSelected(null);
      setBedSelected(null);
    } else if (indexStep === 1) {
      console.log("Step 2: Select Room");
      getAllRooms();
    } else if (indexStep === 2) {
      console.log("Step 3: Select Device");
      console.log("Patient Selected:", patientSelected);
      console.log("Room Selected:", roomSelected);
      console.log("Bed Selected:", bedSelected);
      getPatientMonitoringDevices(search, deviceFunction);
    }
  }, [indexStep, search, deviceFunction]);

  console.log("Patient Monitoring Devices:", patientMonitoringDevices);

  const openBarcodeContent = () => {
    setState("barcode");
  };
  const openSelectPatientContent = () => {
    setState("select");
  };
  const openCreatePatientContent = () => {
    setState("create");
  };
  const handleSelectPatient = (patient: any) => {
    setPatientSelected(patient);
    if (patient.patient_room) {
      setRoomSelected(patient.patient_room.room);
      setBedSelected(patient.patient_room.bed);
      setIndexStep(2);
    } else {
      setIndexStep(1);
    }
  };

  const handleSelectRoom = (room: RoomsModel) => {
    try {
      setRoomSelected(room);
      getBeds(room.id, "true");
    } catch (error) {
      console.error("Error fetching beds:", error);
    }
  };

  const handleSelectBed = (bed: BedsModel) => {
    try {
      setBedSelected(bed);
      setIndexStep(2);
    } catch (error) {
      console.error("Error selecting bed:", error);
    }
  };

  const handleSubmit = () => {
    createCentralMonitor({
      patient_id: patientSelected.id,
      device_id: selectedDevice.id,
      room_id: roomSelected.id,
      bed_id: bedSelected.id,
    });
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
        <Sidebar state={stateSidebar} />
      </div>

      {/* Show Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-3/5 transform bg-white rounded-xl p-8 z-50 w-7xl h-[920px] transition-all duration-300 ease-in-out
        ${
          isActive
            ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
            : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
        }
      `}
      >
        <div className="flex flex-col gap-2 h-full">
          <div className="flex flex-row items-center justify-between">
            <p className="w-6"></p>
            <p className="font-bold text-xl">Add Patient Monitor</p>
            <X className="cursor-pointer w-6" onClick={setNonactive} />
          </div>
          <div className="flex gap-4 items-center mx-auto">
            {step.map((item, index) => (
              <React.Fragment key={item.id}>
                {stepForm(index < indexStep + 1, item.title, item.id)}
                {/* Progress line */}
                {index !== step.length - 1 && (
                  <div
                    className={`w-40 border-t-2 ${
                      index < indexStep ? "border-blue-500" : "border-gray-300"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* CONTENT */}
          <div className="w-full h-20 mt-10">
            {indexStep === 0 && (
              <>
                {selectPatient(
                  state,
                  openBarcodeContent,
                  openSelectPatientContent,
                  openCreatePatientContent,
                  handleSelectPatient
                )}
              </>
            )}
            {indexStep === 1 && (
              <>
                <p>Select Room</p>
                {selectRoom(rooms, handleSelectRoom)}
                <p className="mt-6">Select Bed</p>
                {!roomSelected ? (
                  <p className="text-sm text-gray-500">
                    Please select a room first.
                  </p>
                ) : (
                  ""
                )}
                {roomSelected && selectBed(beds, handleSelectBed)}
              </>
            )}
            {indexStep === 2 && (
              <p>
                {selectDevice(
                  patientSelected,
                  roomSelected!,
                  bedSelected!,
                  setSearch,
                  setDeviceFunction,
                  deviceFunction,
                  patientMonitoringDevices,
                  selectedDevice,
                  setSelectedDevice,
                  handleSubmit
                )}
              </p>
            )}
          </div>

          {/* BUTTON PREVIOUS */}
          <div className="absolute top-30  left-10 w-full flex gap-2">
            {indexStep > 0 ? (
              <button
                className="w-40 bg-blue-500 text-white rounded-full py-2 hover:bg-blue-600"
                onClick={() => {
                  if (patientSelected.patient_room) {
                    setIndexStep(0);
                    return;
                  }
                  setIndexStep((prev) => Math.max(prev - 1, 0));
                }}
              >
                <ArrowLeft className="inline w-4 h-4 mr-2" />
                {indexStep === 1 && "Change Patient"}
                {indexStep === 2 && "Change Room"}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const stepForm = (isActive: boolean, title: string, number: number) => {
  return (
    <div className="space-y-2">
      <p
        className={`w-6 h-6 text-center mx-auto rounded-full ${
          isActive ? "bg-blue-500" : "bg-gray-300"
        } text-white `}
      >
        {number}
      </p>
      <p
        className={`text-sm text-gray-700 ${
          isActive ? "font-semibold" : "font-normal"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

// Select Patient
const selectPatient = (
  state: string,
  openBarcodeContent: () => void,
  openSelectPatientContent: () => void,
  openCreatePatientContent: () => void,
  patientSelected: React.Dispatch<React.SetStateAction<any>>
) => {
  return (
    <div className="flex flex-col gap-4 h-[600px]">
      {/* Option Select Patient */}
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold text-xl">Select patient</p>
        <div className="flex items-center gap-4">
          <div className="flex flex-row gap-4 bg-[#f0f0f0] px-4 py-2 rounded-xl text-sm">
            {/* Scan Barcode */}
            <div
              className={
                state === "barcode"
                  ? `bg-white items-center px-4 py-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.2)]`
                  : ` items-center px-4 py-2 rounded-xl cursor-pointer`
              }
              onClick={openBarcodeContent}
            >
              <p className="text-blue-700 font-semibold">Scan Barcode</p>
            </div>

            {/* Select Patient by Name */}
            <div
              className={
                state === "select"
                  ? `bg-white items-center px-4 py-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.2)]`
                  : ` items-center px-4 py-2 rounded-xl cursor-pointer`
              }
              onClick={openSelectPatientContent}
            >
              <p className="text-blue-700 font-semibold">Select Patient</p>
            </div>

            {/* Create Patient */}
            <div
              className={
                state === "create"
                  ? `bg-white items-center px-4 py-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.2)]`
                  : ` items-center px-4 py-2 rounded-xl cursor-pointer `
              }
              onClick={openCreatePatientContent}
            >
              <p className="text-blue-700 font-semibold">Create Patient</p>
            </div>
          </div>
        </div>
      </div>

      {/* Show Content */}
      <div className="w-full h-full">
        {/* Barcode content */}
        {state === "barcode" && (
          <div className="h-full flex items-center justify-center">
            <img src={barcodeImg} alt="" />
          </div>
        )}

        {/* Select Patient Content */}
        {state === "select" && (
          <div className="h-full">
            <SelectPatientContent patientSelected={patientSelected} />
          </div>
        )}

        {/* Create new patient content */}
        {state === "create" && (
          <div className="h-full">
            <CreatePatientContent patientSelected={patientSelected} />
          </div>
        )}
      </div>
    </div>
  );
};

// Select Room
const selectRoom = (
  rooms: RoomsModel[],
  roomSelected: React.Dispatch<React.SetStateAction<any>>
) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* List Room */}
      {rooms.map((room) => (
        <div
          key={room.id}
          className="flex flex-col gap-2 bg-blue-50 rounded-2xl p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.3)]"
          onClick={() => roomSelected(room)}
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-lg">{room.name}</p>
              <div className="flex gap-2 items-center">
                <p className="bg-green-200 text-green-900 flex rounded-full px-4 font-bold text-xl">
                  {room.number}
                </p>
                <p>-</p>
                <p className="font-bold items-center">{room.type}</p>
              </div>
            </div>
            <div className="flex items-start   gap-4">
              <p
                className={`font-bold flex rounded-full px-4 items-center ${
                  room.status === "full"
                    ? "bg-red-200 text-red-900"
                    : "bg-green-200 text-green-900"
                }`}
              >
                {room.status}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <p>Capacity</p>
            </div>
            <div className="flex bg-blue-200 font-bold rounded-sm px-2 items-center">
              <p>{room.capacity.used}</p>
              <p>/</p>
              <p>{room.capacity.total}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const selectBed = (
  beds: BedsModel[],
  bedSelected: React.Dispatch<React.SetStateAction<any>>
) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {beds.map((bed) => (
        <div
          key={bed.id}
          className="flex flex-flex justify-between items-center gap-2 bg-blue-50 rounded-2xl p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.3)]"
          onClick={() => bedSelected(bed)}
        >
          <div className="flex items-center gap-2">
            <p className="font-bold text-lg">{bed.bed_number}</p>
            <p className="font-bold text-lg">-</p>
            <p className="font-bold text-lg">{bed.type}</p>
          </div>
          <p className="px-3 py-1 rounded-full bg-green-200 text-green-900">
            {bed.status}
          </p>
        </div>
      ))}
    </div>
  );
};

const selectDevice = (
  patient: any,
  room: RoomsModel,
  bed: BedsModel,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
  setDeviceFunction: React.Dispatch<React.SetStateAction<string>>,
  deviceFunction: string,
  patientMonitoringDevices: any[],
  selectedDevice: any,
  setSelectedDevice: React.Dispatch<React.SetStateAction<any>>,
  onSubmit: () => void
) => {
  return (
    <>
      {/* Patient Info */}
      <p className="font-bold text-xl mb-2">Patient Info</p>
      <div className="flex flex-col gap-2 w-1/1 p-6 rounded-xl bg-gradient-to-b from-[#4956F4] to-[#6e79f4] text-white shadow-lg">
        <div className="flex flex-row justify-between">
          <div className="flex gap-4">
            <div className="rounded-full bg-gray-200 w-20 h-20"></div>
            <div className="flex flex-col gap-2 justify-end">
              <p className="text-2xl font-bold">{patient.name}</p>
              <p className="text-sm">{patient.id}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <div className="flex gap-2 rounded-xl border items-center h-fit px-3 cursor-pointer bg-white text-black shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16),inset_-6px_-6px_5px_rgba(255,255,255,1)]">
              <p className="w-full font-bold text-base">{room?.name ?? "--"}</p>
              <p className="font-bold">{room.number ?? "--"}</p>
              <p>-</p>
              <p className="bg-green-200 text-green-900 rounded-xl p-1 w-20 text-center font-semibold">
                {room.type ?? "--"}
              </p>
            </div>
            <div className="flex gap-2 rounded-xl border items-center h-fit px-3 py-1 cursor-pointer bg-white text-black shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16),inset_-6px_-6px_5px_rgba(255,255,255,1)]">
              <BedSingle className="w-6 h-6" />
              <p className="font-bold">{bed.bed_number ?? "--"}</p>
              {/* <p>-</p> */}
              {/* <p className="bg-green-200 text-green-900 rounded-2xl p-2 w-20 text-center font-semibold">
                {bed.type ?? "--"}
              </p> */}
            </div>
          </div>
        </div>
      </div>

      {/* Select device */}
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex flex-row items-center justify-between">
          <p className="font-bold text-xl">Select Device</p>
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
          <div className="flex flex-col gap-3 overflow-x-auto h-[300px]">
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
                <p className="text-base text-gray-500">{device.ip_address}</p>
              </div>
            ))}
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-2xl mt-5 disabled:opacity-50 hover:bg-blue-600 transition duration-150 ease-in-out"
            disabled={!selectedDevice}
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
