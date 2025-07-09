import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLayout from "../components/layouts/main-layout";
import { useRef, useState } from "react";
import {
  Activity,
  EllipsisVertical,
  Funnel,
  Plus,
  Search,
  SquareArrowOutUpRight,
  Thermometer,
  UserRoundPlus,
} from "lucide-react";
import spo2Icon from "@/assets/icons/spo2.png";
import respIcon from "@/assets/icons/resp.png";
import rrIcon from "@/assets/icons/lungs.png";
import nibpIcon from "@/assets/icons/nibp.png";

import { PatientMonitorPM9000Section } from "@/components/sections/patient_monitor_devices/pm-9000";
import { PatientMonitorDS001Section } from "@/components/sections/patient_monitor_devices/ds-001";
import { SelectPatient } from "@/components/modals/select-patient-modal";

const pm9000 = [
  {
    id: "192.168.1.1",
    name: "ACB-421",
    patient_id: {
      id: "1",
      name: "Yasfa",
      room: "ICU 1",
    },
    ecg: 90,
    spo2: 95,
    resp: 22,
    hr: 70,
    temp1: 34,
    temp2: 37,
    tempD: 39,
  },
  {
    id: "192.168.1.2",
    name: "ACB-422",
    patient_id: {
      id: "2",
      name: "Bagus",
      room: "ICU 2",
    },
    ecg: 90,
    spo2: 95,
    resp: 22,
    hr: 70,
    temp1: 34,
    temp2: 37,
    tempD: 39,
  },
  {
    id: "192.168.1.3",
    name: "ACB-423",
    patient_id: {
      id: "3",
      name: "Dapit",
      room: "ICU 3",
    },
    ecg: 90,
    spo2: 95,
    resp: 22,
    hr: 70,
    temp1: 34,
    temp2: 37,
    tempD: 39,
  },
];

const ds001 = [
  {
    id: "192.168.1.2",
    name: "ACB-423",
    patient_id: {
      id: "1",
      name: "Agus",
      room: "ICU 3",
    },
    systolic: 90,
    diastolic: 95,
    mean: 22,
    pulse_rate: 70,
    temp: 34,
    spo2: 37,
    pr_spo2: 39,
    rr: 39,
  },
  {
    id: "192.168.1.2",
    name: "ACB-423",
    patient_id: {
      id: "2",
      name: "Dapit",
      room: "ICU 3",
    },
    systolic: 90,
    diastolic: 95,
    mean: 22,
    pulse_rate: 70,
    temp: 34,
    spo2: 37,
    pr_spo2: 39,
    rr: 39,
  },
  {
    id: "192.168.1.2",
    name: "ACB-423",
    patient_id: {
      id: "3",
      name: "Rian",
      room: "ICU 3",
    },
    systolic: 90,
    diastolic: 95,
    mean: 22,
    pulse_rate: 70,
    temp: 34,
    spo2: 37,
    pr_spo2: 39,
    rr: 39,
  },
];

const PatientMonitorPage = () => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [patient, setPatient] = useState<any>(null);
  const [state, setState] = useState("barcode");
  const [limit, setLimit] = useState(10);

  const filterRef = useRef<HTMLDivElement>(null);
  return (
    <MainLayout title="Patient Monitor" state="Patient Monitor">
      <div className="flex flex-col gap-4 pb-20">
        {/* Sticky Top */}
        <div className="sticky top-0 z-50 bg-[#ededf9] mb-2">
          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-6 w-full justify-between">
              <div className="flex items-center gap-2">
                <p>Showing</p>
                <Select
                  value={limit.toString()}
                  onValueChange={(value) => setLimit(Number(value))}
                >
                  <SelectTrigger className="w-fit bg-[rgba(117,195,255,0.5)]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10" className="hover:bg-[#ECECEC]">
                      10
                    </SelectItem>
                    <SelectItem value="20" className="hover:bg-[#ECECEC]">
                      20
                    </SelectItem>
                    <SelectItem value="30" className="hover:bg-[#ECECEC]">
                      30
                    </SelectItem>
                    <SelectItem value="50" className="hover:bg-[#ECECEC]">
                      50
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 items-center">
                <div ref={filterRef} className="flex flex-col gap-2">
                  <div
                    className="flex cursor-pointer bg-white items-center gap-2 px-4 py-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.3)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFilter((prev) => !prev);
                    }}
                  >
                    <Funnel className="w-5 h-5" />
                    <p className="text-sm">Filter</p>
                  </div>
                  {/* Filter Dropdown */}
                  {showFilter && (
                    <div
                      className="absolute z-10 bg-white p-4  rounded-xl mt-12 min-w-[200px] text-sm"
                      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-row justify-between">
                          <span title="Filter users by role">
                            Filter contents
                          </span>
                          {/* <p
                          className="cursor-pointer text-red-500"
                          onClick={() => {}}
                        >
                          Reset filter
                        </p> */}
                        </div>
                        <button
                          className="text-white bg-[#0D00FF] px-4 py-1.5 rounded-lg"
                          onClick={() => {
                            alert("OK");
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div
                    className="flex bg-[#3885FD] items-center gap-2 px-4 py-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.3)] cursor-pointer text-white "
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAddPatientModal(true);
                    }}
                  >
                    <Plus className="w-5 h-5" />
                    <p className="text-white">Add Patient</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.3)]">
                    <label
                      htmlFor="search"
                      className="flex items-center gap-2 px-4 py-2"
                    >
                      <Search className="w-6 h-6" />
                      <input
                        type="text"
                        id="search"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-2 focus:outline-none"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {/* PM-9000 */}
        <div className="flex flex-col gap-2 px-1">
          <p className="font-bold">PM 9000</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6">
            {pm9000.map((item) => (
              <PatientMonitorPM9000Section
                key={item.id}
                id_device={item.id}
                patientName={item.patient_id.name}
                room={item.patient_id.room}
                ecg={item.ecg}
                spo2={item.spo2}
                resp={item.resp}
                hr={item.hr}
                temp1={item.temp1}
                temp2={item.temp2}
                tempD={item.tempD}
              />
            ))}
          </div>
        </div>
        {/* DS-001 */}
        <div className="flex flex-col gap-2 px-1">
          <p className="font-bold">DS 001</p>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {ds001.map((item) => (
              <PatientMonitorDS001Section
                key={item.id}
                id_device={item.id}
                patientName={item.patient_id.name}
                room={item.patient_id.room}
                systolic={item.systolic}
                diastolic={item.diastolic}
                mean={item.mean}
                pulse_rate={item.pulse_rate}
                temp={item.temp}
                spo2={item.spo2}
                pr_spo2={item.pr_spo2}
                rr={item.rr}
              />
            ))}
          </div>
        </div>
        {/* OTHER */}
        <div className="flex flex-col gap-2 px-1">
          <p className="font-bold">OTHER</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-white flex flex-col p-4 rounded-lg w-full h-60 shadow-[0px_2px_4px_rgba(0,0,0,0.2)] text-sm"
              >
                <p>Patient Name</p>
                <p>Device Name</p>
                <p>Device IP</p>
                <div className="w-full h-40 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SelectPatient
        isActive={showAddPatientModal}
        state={state}
        openBarcodeModal={() => setState("barcode")}
        openSelectModal={() => setState("select")}
        openCreateModal={() => setState("create")}
        patientSelected={(patient) => setPatient(patient)}
        stateSidebar={"Patient Monitor"}
      />
    </MainLayout>
  );
};
export default PatientMonitorPage;
