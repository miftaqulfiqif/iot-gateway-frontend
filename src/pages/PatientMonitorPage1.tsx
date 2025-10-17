import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import MainLayout from "../components/layouts/main-layout";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  CircleAlert,
  CircleCheck,
  Filter,
  Funnel,
  Plus,
  PlusIcon,
  Search,
  Users,
} from "lucide-react";

import { PatientMonitorPM9000Section } from "@/components/sections/patient_monitor_devices/pm-9000";
import { PatientMonitorDS001Section } from "@/components/sections/patient_monitor_devices/ds-001";
import { AddDevicePatientMonitorModal } from "@/components/modals/add-device-patient-monitor-modal";
import { motion, AnimatePresence } from "framer-motion";

const pm9000 = [
  {
    id: "192.168.1.1",
    name: "ACB-421",
    patient_id: {
      id: "1",
      name: "Yosef Aminul Yakin",
      room: {
        id: "1",
        number: "312",
        type: "ICU",
      },
    },
    ecg: 90,
    spo2: 95,
    resp: 22,
    hr: 70,
    temp1: 34,
    temp2: 37,
    tempD: 39,
    is_crysis: true,
  },
  {
    id: "192.168.1.2",
    name: "ACB-422",
    patient_id: {
      id: "2",
      name: "Bagas Ta'aruf",
      room: {
        id: "2",
        number: "312",
        type: "HCU",
      },
    },
    ecg: 90,
    spo2: 95,
    resp: 22,
    hr: 70,
    temp1: 34,
    temp2: 37,
    tempD: 39,
    is_crysis: false,
  },
  {
    id: "192.168.1.3",
    name: "ACB-423",
    patient_id: {
      id: "3",
      name: "Siti Nurhasanah",
      room: {
        id: "3",
        number: "312",
        type: "Reguler",
      },
    },
    ecg: 90,
    spo2: 95,
    resp: 22,
    hr: 70,
    temp1: 34,
    temp2: 37,
    tempD: 39,
    is_crysis: false,
  },
  {
    id: "192.168.1.10",
    name: "ACB-421",
    patient_id: {
      id: "1",
      name: "Miftaqul Huda",
      room: {
        id: "1",
        number: "312",
        type: "ICU",
      },
    },
    ecg: 90,
    spo2: 95,
    resp: 22,
    hr: 70,
    temp1: 34,
    temp2: 37,
    tempD: 39,
    is_crysis: true,
  },
];

const ds001 = [
  {
    id: "192.168.8.142",
    name: "ACB-423",
    patient_id: {
      id: "1",
      name: "Dian Puspita Sari",
      room: {
        id: "3",
        number: "312",
        type: "ICU",
      },
    },
    systolic: 170,
    diastolic: 100,
    mean: 90,
    pulse_rate: 130,
    temp: 40,
    spo2: 75,
    pr_spo2: 125,
    rr: 50,
    is_crysis: true,
  },
  {
    id: "192.168.2.3",
    name: "ACB-423",
    patient_id: {
      id: "2",
      name: "Nurfitriah Zahra",
      room: {
        id: "1",
        number: "212",
        type: "Reguler",
      },
    },
    systolic: 90,
    diastolic: 95,
    mean: 22,
    pulse_rate: 70,
    temp: 34,
    spo2: 37,
    pr_spo2: 39,
    rr: 39,
    is_crysis: false,
  },
  {
    id: "192.168.2.4",
    name: "ACB-423",
    patient_id: {
      id: "3",
      name: "Ahmad Rifki",
      room: {
        id: "3",
        number: "312",
        type: "HCU",
      },
    },
    systolic: 90,
    diastolic: 95,
    mean: 22,
    pulse_rate: 70,
    temp: 34,
    spo2: 37,
    pr_spo2: 39,
    rr: 39,
    is_crysis: false,
  },
];

const randomRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const checkPm9000Crysis = (item: any) => {
  return (
    item.hr < 50 ||
    item.hr > 120 ||
    item.spo2 < 90 ||
    item.resp < 12 ||
    item.resp > 30 ||
    item.temp1 < 35 ||
    item.temp1 > 39 ||
    item.temp2 < 35 ||
    item.temp2 > 39 ||
    item.tempD < 35 ||
    item.tempD > 39
  );
};

const checkDs001Crysis = (item: any) => {
  return (
    item.systolic < 90 ||
    item.systolic > 160 ||
    item.diastolic < 50 ||
    item.diastolic > 100 ||
    item.spo2 < 90 ||
    item.temp < 35 ||
    item.temp > 39 ||
    item.pulse_rate < 50 ||
    item.pulse_rate > 130 ||
    item.rr < 12 ||
    item.rr > 30
  );
};

const PatientMonitorPage1 = () => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const [mobile, setMobile] = useState(false);
  const [showStickyTop, setShowStickyTop] = useState(!mobile);

  const [pm9000Data, setPm9000Data] = useState(pm9000);
  const [ds001Data, setDs001Data] = useState(ds001);
  const stableCountPm9000 = pm9000Data.filter((p) => !p.is_crysis).length;
  const stableCountDS001 = ds001Data.filter((p) => !p.is_crysis).length;
  const crisisCountPM9000 = pm9000Data.filter((p) => p.is_crysis).length;
  const crisisCountDS001 = ds001Data.filter((p) => p.is_crysis).length;

  // Ref for filter dropdown
  const [deviceType, setDeviceType] = useState("all");
  const [sortBy, setSortBy] = useState("patient_name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleFilterSubmit = (
    deviceType: string,
    sortBy: string,
    sortOrder: string
  ) => {
    alert(
      `Filter applied with deviceType: ${deviceType}, sortBy: ${sortBy}, sortOrder: ${sortOrder}`
    );
    setShowFilter(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPm9000Data((prev) =>
        prev.map((item) => {
          const updated = {
            ...item,
            ecg: randomRange(80, 120),
            spo2: randomRange(85, 100),
            resp: randomRange(15, 30),
            hr: randomRange(60, 140),
            temp1: randomRange(33, 40),
            temp2: randomRange(33, 40),
            tempD: randomRange(33, 40),
          };
          return { ...updated, is_crysis: checkPm9000Crysis(updated) };
        })
      );

      setDs001Data((prev) =>
        prev.map((item) => {
          const updated = {
            ...item,
            systolic: randomRange(80, 180),
            diastolic: randomRange(45, 110),
            mean: randomRange(60, 100),
            pulse_rate: randomRange(40, 140),
            temp: randomRange(34, 41),
            spo2: randomRange(70, 100),
            pr_spo2: randomRange(70, 130),
            rr: randomRange(10, 40),
          };
          return { ...updated, is_crysis: checkDs001Crysis(updated) };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout title="Central Monitoring" state="Central Monitoring">
      <div className="flex flex-col gap-4 pb-20">
        {/* Sticky Top */}
        <AnimatePresence>
          {showStickyTop && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="sticky top-0 z-10 bg-[#ededf9] mb-2"
            >
              {/* Summary Cards */}
              <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-1 lg:gap-4 mb-4">
                <div className="flex items-center justify-between p-4 md:p-6 lg:p-6 rounded-xl bg-white border gap-2">
                  <div>
                    <p className="text-xs md:text-base">Total Patients</p>
                    <p className="font-semibold text-xl lg:text-3xl text-blue-500">
                      {pm9000Data.length + ds001Data.length}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <Users className="w-10 h-10 text-blue-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between  p-4 md:p-6 lg:p-6  rounded-xl bg-white border gap-2">
                  <div>
                    <p className="text-xs md:text-base">Stable</p>
                    <p className="font-semibold text-xl lg:text-3xl text-green-500">
                      {stableCountPm9000 + stableCountDS001}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <CircleCheck className="w-10 h-10 text-green-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between  p-4 md:p-6 lg:p-6 rounded-xl bg-white border gap-2">
                  <div>
                    <p className="text-xs md:text-base">Critical</p>
                    <p className="font-semibold text-xl lg:text-3xl text-red-500">
                      {crisisCountPM9000 + crisisCountDS001}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <CircleAlert className="w-10 h-10 text-red-500" />
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col-reverse flex-wrap lg:flex-row gap-4 w-full justify-between">
                {/* Limit select */}
                <div className="flex items-center gap-2">
                  <p className="text-sm lg:text-base">Showing</p>
                  <Select
                    value={limit.toString()}
                    onValueChange={(value) => setLimit(Number(value))}
                  >
                    <SelectTrigger className="w-fit bg-[rgba(117,195,255,0.5)]">
                      <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 items-center">
                  {/* Filter */}
                  {showFilterModal(
                    deviceType,
                    sortBy,
                    sortOrder,
                    setDeviceType,
                    setSortBy,
                    setSortOrder,
                    handleFilterSubmit
                  )}

                  {/* Add Patient */}
                  <button
                    className="hidden md:flex lg:flex bg-[#3885FD] items-center gap-2 px-4 py-2 rounded-lg shadow text-white"
                    onClick={() => setShowAddPatientModal(true)}
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Patient</span>
                  </button>

                  {/* Search */}
                  <div className="bg-white rounded-lg shadow">
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
                        className="px-2 focus:outline-none w-32 sm:w-48"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button Show Sticky Top for Mobile */}
        {mobile && (
          <button
            className="fixed top-3 right-4 bg-white p-2 rounded-full shadow-lg z-50"
            onClick={() => setShowStickyTop((prev) => !prev)}
          >
            <Filter className="w-5 h-5" />
          </button>
        )}

        {/* Button Add Patient Monitor */}
        {mobile && (
          <button className="fixed bottom-24 right-4 bg-[#3885FD] text-white p-3 rounded-full shadow-lg z-50">
            <PlusIcon className="w-6 h-6" />
          </button>
        )}

        {/* Content */}
        <div className="flex flex-col gap-6 px-4">
          <div>
            <p className="font-bold text-xl mb-2">Patient Monitor</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {pm9000Data.map((item) => (
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
                  isCrysis={item.is_crysis}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold text-xl mb-2">Vital Sign Monitor</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {ds001Data.map((item) => (
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
                  isCrysis={item.is_crysis}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddDevicePatientMonitorModal
        isActive={showAddPatientModal}
        setNonactive={() => setShowAddPatientModal(false)}
        stateSidebar="Central Monitoring"
      />
    </MainLayout>
  );
};

const showFilterModal = (
  deviceType: string,
  sortBy: string,
  sortOrder: string,
  setDeviceType: (value: string) => void,
  setSortBy: (value: string) => void,
  setSortOrder: (value: string) => void,
  handleSubmit: (deviceType: string, sortBy: string, sortOrder: string) => void
) => {
  return (
    <Popover>
      {/* Trigger */}
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer bg-white items-center gap-2 px-4 py-2 rounded-lg shadow">
          <Funnel className="w-5 h-5" />
          <p className="text-sm">Filter</p>
        </div>
      </PopoverTrigger>

      {/* Content */}
      <PopoverContent className="w-[300px] lg:w-[400px] p-4 rounded-xl shadow">
        <div className="flex flex-col gap-3 w-full">
          {/* Header + Sort */}
          <div className="flex justify-between items-center">
            <p className="font-semibold">Filter Options</p>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-fit">
                <ArrowDownUp className="w-5 h-5" />
              </SelectTrigger>
              <SelectContent className="p-4">
                <p className="text-gray-500 text-sm mb-2">Sort by</p>
                <SelectItem value="patient_name">Patient Name</SelectItem>
                <SelectItem value="room_number">Room Number</SelectItem>
                <SelectItem value="admission_date">Admission Date</SelectItem>
                <hr className="my-2 border-gray-300" />
                <div
                  className={`flex items-center cursor-pointer rounded-lg px-2 py-1 ${
                    sortOrder === "asc"
                      ? "border border-blue-500 bg-blue-100 text-blue-600"
                      : ""
                  }`}
                  onClick={() => setSortOrder("asc")}
                >
                  <ArrowUp className="w-5 h-5 inline-block mr-2" />
                  <span>Ascending</span>
                </div>
                <div
                  className={`flex items-center cursor-pointer rounded-lg px-2 py-1 ${
                    sortOrder === "desc"
                      ? "border border-blue-500 bg-blue-100 text-blue-600"
                      : ""
                  }`}
                  onClick={() => setSortOrder("desc")}
                >
                  <ArrowDown className="w-5 h-5 inline-block mr-2" />
                  <span>Descending</span>
                </div>
              </SelectContent>
            </Select>
          </div>

          {/* Device Type */}
          <div className="flex flex-row gap-1 w-full justify-between items-center">
            <p>Show content</p>
            <Select
              value={deviceType}
              onValueChange={(value) => setDeviceType(value)}
            >
              <SelectTrigger className="w-1/2">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="patient_monitor">Patient Monitor</SelectItem>
                <SelectItem value="vital_sign_monitor">
                  Vital Sign Monitor
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Apply Button */}
          <button
            className="text-white bg-[#0D00FF] px-4 py-1.5 rounded-lg"
            onClick={() => {
              handleSubmit(deviceType, sortBy, sortOrder);
            }}
          >
            Apply
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PatientMonitorPage1;
