import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLayout from "../components/layouts/main-layout";
import { Funnel, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TableHistoryDigitProBaby } from "@/components/tables/history-digit-pro-baby";
import { TableHistoryDigitProIDA } from "@/components/tables/history-digit-pro-ida";
import { TableHistoryBMI } from "@/components/tables/history-digit-pro-bmi";
import { TableHistoryDoppler } from "@/components/tables/history-doppler";
import { useDigitProIDA } from "@/hooks/api/devices/use-digit-pro-ida";
import { useDigitProBaby } from "@/hooks/api/devices/use-digit-pro-baby";
import { useDigitProBMI } from "@/hooks/api/devices/use-digit-pro-bmi";
import { useDoppler } from "@/hooks/api/devices/use-doppler";
import { usePM9000 } from "@/hooks/api/devices/use-pm-9000";
import { useDS001 } from "@/hooks/api/devices/use-ds-001";
import { TableHistoryPM9000 } from "@/components/tables/history-pm9000";
import { TableHistoryDS001 } from "@/components/tables/history-ds001";

const dummyDataDS001 = [
  {
    id: "1",
    patient_handler: {
      patient: {
        name: "Andi Wijaya",
      },
    },
    systolic: 120,
    diastolic: 80,
    mean: 93,
    pulse_rate: 75,
    temp: 36.8,
    spo2: 98,
    pr_spo2: 75,
    rr: 15,
    recorded_at: "2025-07-14T08:30:00Z",
  },
  {
    id: "2",
    patient_handler: {
      patient: {
        name: "Siti Handayani",
      },
    },
    systolic: 130,
    diastolic: 85,
    mean: 100,
    pulse_rate: 82,
    temp: 37.1,
    spo2: 96,
    pr_spo2: 82,
    rr: 15,
    recorded_at: "2025-07-14T09:45:00Z",
  },
  {
    id: "3",
    patient_handler: {
      patient: {
        name: "Budi Santoso",
      },
    },
    systolic: 110,
    diastolic: 70,
    mean: 83,
    pulse_rate: 68,
    temp: 36.5,
    spo2: 99,
    pr_spo2: 68,
    rr: 15,
    recorded_at: "2025-07-14T10:15:00Z",
  },
  {
    id: "4",
    patient_handler: {
      patient: {
        name: "Dewi Lestari",
      },
    },
    systolic: 145,
    diastolic: 95,
    mean: 112,
    pulse_rate: 90,
    temp: 38.2,
    spo2: 94,
    pr_spo2: 90,
    rr: 15,
    recorded_at: "2025-07-14T11:10:00Z",
  },
  {
    id: "5",
    patient_handler: {
      patient: {
        name: "Agus Pramono",
      },
    },
    systolic: 125,
    diastolic: 78,
    mean: 94,
    pulse_rate: 72,
    temp: 36.9,
    spo2: 97,
    pr_spo2: 72,
    rr: 15,
    recorded_at: "2025-07-14T12:00:00Z",
  },
];

const dummyDataPM9000 = [
  {
    id: "1",
    patient_handler: {
      patient: {
        name: "Andi Wijaya",
      },
    },
    ecg: 100,
    spo2: 98,
    resp: 18,
    systolic: 120,
    diastolic: 80,
    mean: 93,
    temp1: 36.5,
    temp2: 36.8,
    delta_temp: 0.3,
    recorded_at: "2023-09-01T08:30:00Z",
  },
  {
    id: "2",
    patient_handler: {
      patient: {
        name: "Siti Aminah",
      },
    },
    ecg: 92,
    spo2: 95,
    resp: 22,
    systolic: 135,
    diastolic: 88,
    mean: 104,
    temp1: 37.2,
    temp2: 37.4,
    delta_temp: 0.2,
    recorded_at: "2023-09-02T09:00:00Z",
  },
  {
    id: "3",
    patient_handler: {
      patient: {
        name: "Budi Santoso",
      },
    },
    ecg: 92,
    spo2: 97,
    resp: 16,
    systolic: 110,
    diastolic: 72,
    mean: 85,
    temp1: 36.9,
    temp2: 37.1,
    delta_temp: 0.2,
    recorded_at: "2023-09-03T09:45:00Z",
  },
  {
    id: "4",
    patient_handler: {
      patient: {
        name: "Rina Marlina",
      },
    },
    ecg: 102,
    spo2: 99,
    resp: 19,
    systolic: 125,
    diastolic: 84,
    mean: 98,
    temp1: 37.0,
    temp2: 36.9,
    delta_temp: -0.1,
    recorded_at: "2023-09-04T10:15:00Z",
  },
  {
    id: "5",
    patient_handler: {
      patient: {
        name: "Dewi Lestari",
      },
    },
    ecg: 102,
    spo2: 96,
    resp: 20,
    systolic: 118,
    diastolic: 79,
    mean: 92,
    temp1: 36.8,
    temp2: 37.0,
    delta_temp: 0.2,
    recorded_at: "2023-09-05T11:00:00Z",
  },
  {
    id: "6",
    patient_handler: {
      patient: {
        name: "Agus Pratama",
      },
    },
    ecg: 92,
    spo2: 97,
    resp: 17,
    systolic: 122,
    diastolic: 82,
    mean: 95,
    temp1: 36.7,
    temp2: 36.9,
    delta_temp: 0.2,
    recorded_at: "2023-09-06T08:30:00Z",
  },
  {
    id: "7",
    patient_handler: {
      patient: {
        name: "Lina Rahmawati",
      },
    },
    ecg: 130,
    spo2: 94,
    resp: 21,
    systolic: 130,
    diastolic: 85,
    mean: 100,
    temp1: 37.5,
    temp2: 37.8,
    delta_temp: 0.3,
    recorded_at: "2023-09-07T09:00:00Z",
  },
  {
    id: "8",
    patient_handler: {
      patient: {
        name: "Joko Hermawan",
      },
    },
    ecg: 92,
    spo2: 98,
    resp: 18,
    systolic: 117,
    diastolic: 78,
    mean: 91,
    temp1: 36.6,
    temp2: 36.8,
    delta_temp: 0.2,
    recorded_at: "2023-09-08T09:45:00Z",
  },
  {
    id: "9",
    patient_handler: {
      patient: {
        name: "Yuni Arlina",
      },
    },
    ecg: 108,
    spo2: 93,
    resp: 23,
    systolic: 140,
    diastolic: 90,
    mean: 107,
    temp1: 38.1,
    temp2: 38.3,
    delta_temp: 0.2,
    recorded_at: "2023-09-09T10:15:00Z",
  },
  {
    id: "10",
    patient_handler: {
      patient: {
        name: "Rangga Saputra",
      },
    },
    ecg: 92,
    spo2: 96,
    resp: 16,
    systolic: 108,
    diastolic: 70,
    mean: 83,
    temp1: 36.4,
    temp2: 36.6,
    delta_temp: 0.2,
    recorded_at: "2023-09-10T11:00:00Z",
  },
  {
    id: "11",
    patient_handler: {
      patient: {
        name: "Fitri Nuraini",
      },
    },
    ecg: 108,
    spo2: 99,
    resp: 18,
    systolic: 124,
    diastolic: 80,
    mean: 95,
    temp1: 36.9,
    temp2: 36.9,
    delta_temp: 0.0,
    recorded_at: "2023-09-11T08:30:00Z",
  },
  {
    id: "12",
    patient_handler: {
      patient: {
        name: "Arif Hidayat",
      },
    },
    ecg: 108,
    spo2: 97,
    resp: 20,
    systolic: 126,
    diastolic: 82,
    mean: 97,
    temp1: 37.0,
    temp2: 37.1,
    delta_temp: 0.1,
    recorded_at: "2023-09-12T09:00:00Z",
  },
];

const dummyDataDigitProBaby = [
  {
    id: "1",
    weight: "3.2 kg",
    recorded_at: "2025-07-16T10:15:00",
    patient_handler: {
      patient: {
        name: "Ayu Kartika",
      },
      baby: {
        name: "Putri Ayunda",
        gender: "Female",
        date_of_birth: "2025-06-01",
      },
    },
  },
  {
    id: "2",
    weight: "3.0 kg",
    recorded_at: "2025-07-16T11:45:00",
    patient_handler: {
      patient: {
        name: "Rina Marlina",
      },
      baby: {
        name: "Rafli Ramadhan",
        gender: "Male",
        date_of_birth: "2025-06-20",
      },
    },
  },
  {
    id: "3",
    weight: "2.8 kg",
    recorded_at: "2025-07-15T14:30:00",
    patient_handler: {
      patient: {
        name: "Siti Aisyah",
      },
      baby: {
        name: "Amira Zahra",
        gender: "Female",
        date_of_birth: "2025-05-30",
      },
    },
  },
  {
    id: "4",
    weight: "3.4 kg",
    recorded_at: "2025-07-14T09:00:00",
    patient_handler: {
      patient: {
        name: "Desi Ratnasari",
      },
      baby: {
        name: "Arya Pratama",
        gender: "Male",
        date_of_birth: "2025-06-10",
      },
    },
  },
  {
    id: "5",
    weight: "3.1 kg",
    recorded_at: "2025-07-14T13:20:00",
    patient_handler: {
      patient: {
        name: "Indah Permata",
      },
      baby: {
        name: "Larasati Wulandari",
        gender: "Female",
        date_of_birth: "2025-06-05",
      },
    },
  },
];

const dummyDataIDA = [
  {
    id: "1",
    recorded_at: "2025-07-17T08:30:00",
    weight_mother: "62.5 kg",
    weight_child: "3.1 kg",
    patient_handler: {
      patient: {
        name: "Ayu Lestari",
        date_of_birth: "1992-03-21",
      },
      baby: {
        name: "Nadia Putri",
        date_of_birth: "2025-06-15",
      },
    },
  },
  {
    id: "2",
    recorded_at: "2025-07-16T11:10:00",
    weight_mother: "70.2 kg",
    weight_child: "3.3 kg",
    patient_handler: {
      patient: {
        name: "Dewi Anggraini",
        date_of_birth: "1988-12-01",
      },
      baby: {
        name: "Rafi Ahmad",
        date_of_birth: "2025-06-20",
      },
    },
  },
  {
    id: "3",
    recorded_at: "2025-07-15T14:45:00",
    weight_mother: "58.0 kg",
    weight_child: "2.9 kg",
    patient_handler: {
      patient: {
        name: "Intan Permata",
        date_of_birth: "1990-07-11",
      },
      baby: {
        name: "Zahra Khansa",
        date_of_birth: "2025-06-25",
      },
    },
  },
  {
    id: "4",
    recorded_at: "2025-07-14T10:05:00",
    weight_mother: "66.8 kg",
    weight_child: "3.5 kg",
    patient_handler: {
      patient: {
        name: "Lestari Wulandari",
        date_of_birth: "1995-01-05",
      },
      baby: {
        name: "Arka Mahendra",
        date_of_birth: "2025-07-01",
      },
    },
  },
  {
    id: "5",
    recorded_at: "2025-07-13T09:20:00",
    weight_mother: "60.3 kg",
    weight_child: "3.0 kg",
    patient_handler: {
      patient: {
        name: "Melati Sari",
        date_of_birth: "1993-09-17",
      },
      baby: {
        name: "Revan Alfarizi",
        date_of_birth: "2025-06-28",
      },
    },
  },
];

const dummyDataBMI = [
  {
    id: "1",
    recorded_at: "2025-07-17T09:00:00",
    weight: "68.5 kg",
    bmi: "23.2",
    body_fat: "22.5%",
    muscle_mass: "45.3%",
    water: "55.6%",
    visceral_fat: "9",
    bone_mass: "3.2 kg",
    metabolism: "1450 kcal",
    protein: "18.5%",
    obesity: "0%",
    body_age: "29",
    lbm: "53.0 kg",
    patient_handler: {
      patient: {
        name: "Andi Pratama",
        gender: "Male",
        age: "30",
      },
    },
  },
  {
    id: "2",
    recorded_at: "2025-07-16T14:20:00",
    weight: "54.7 kg",
    bmi: "21.8",
    body_fat: "25.1%",
    muscle_mass: "38.7%",
    water: "52.4%",
    visceral_fat: "7",
    bone_mass: "2.6 kg",
    metabolism: "1350 kcal",
    protein: "17.3%",
    obesity: "0%",
    body_age: "27",
    lbm: "49.1 kg",
    patient_handler: {
      patient: {
        name: "Siti Rohmah",
        gender: "Female",
        age: "28",
      },
    },
  },
  {
    id: "3",
    recorded_at: "2025-07-15T11:45:00",
    weight: "75.0 kg",
    bmi: "25.6",
    body_fat: "28.0%",
    muscle_mass: "40.2%",
    water: "49.8%",
    visceral_fat: "12",
    bone_mass: "3.5 kg",
    metabolism: "1600 kcal",
    protein: "19.0%",
    obesity: "5%",
    body_age: "35",
    lbm: "57.8 kg",
    patient_handler: {
      patient: {
        name: "Budi Santoso",
        gender: "Male",
        age: "36",
      },
    },
  },
  {
    id: "4",
    recorded_at: "2025-07-14T16:10:00",
    weight: "60.2 kg",
    bmi: "22.5",
    body_fat: "24.0%",
    muscle_mass: "39.0%",
    water: "53.1%",
    visceral_fat: "8",
    bone_mass: "2.9 kg",
    metabolism: "1400 kcal",
    protein: "17.9%",
    obesity: "0%",
    body_age: "31",
    lbm: "51.7 kg",
    patient_handler: {
      patient: {
        name: "Dewi Larasati",
        gender: "Female",
        age: "32",
      },
    },
  },
  {
    id: "5",
    recorded_at: "2025-07-13T08:40:00",
    weight: "82.0 kg",
    bmi: "27.8",
    body_fat: "30.2%",
    muscle_mass: "42.5%",
    water: "48.0%",
    visceral_fat: "14",
    bone_mass: "3.8 kg",
    metabolism: "1700 kcal",
    protein: "20.1%",
    obesity: "7%",
    body_age: "38",
    lbm: "60.9 kg",
    patient_handler: {
      patient: {
        name: "Rizki Hidayat",
        gender: "Male",
        age: "37",
      },
    },
  },
];

const dummyDopplerData = [
  {
    id: "1",
    heart_rate: 145,
    recorded_at: "2025-07-15T14:25:00Z",
    patient_handler: {
      patient: {
        name: "Dr. Amelia Hartono",
        gender: "Female",
        date_of_birth: "1985-05-23",
      },
    },
  },
  {
    id: "2",
    heart_rate: 132,
    recorded_at: "2025-07-16T09:10:00Z",
    patient_handler: {
      patient: {
        name: "Budi Santoso",
        gender: "Male",
        date_of_birth: "1990-11-12",
      },
    },
  },
  {
    id: "3",
    heart_rate: 157,
    recorded_at: "2025-07-16T13:40:00Z",
    patient_handler: {
      patient: {
        name: "Clara Wijaya",
        gender: "Female",
        date_of_birth: "2001-04-18",
      },
    },
  },
  {
    id: "4",
    heart_rate: 123,
    recorded_at: "2025-07-17T08:20:00Z",
    patient_handler: {
      patient: {
        name: "Dimas Prasetyo",
        gender: "Male",
        date_of_birth: "1995-08-30",
      },
    },
  },
  {
    id: "5",
    heart_rate: 140,
    recorded_at: "2025-07-17T10:00:00Z",
    patient_handler: {
      patient: {
        name: "Eka Lestari",
        gender: "Female",
        date_of_birth: "1989-02-14",
      },
    },
  },
];

const state = [
  {
    value: "digit-pro-baby",
    label: "Digit Pro Baby",
  },
  {
    value: "bmi",
    label: "BMI",
  },
  {
    value: "doppler",
    label: "Doppler",
  },
  {
    value: "digit-pro-ida",
    label: "Digit Pro IDA",
  },
  {
    value: "pm-9000",
    label: "PM-9000",
  },
  {
    value: "ds-001",
    label: "DS-001",
  },
];

const MeasurementHistoriesPage = () => {
  const { historiesDigitProIDA, fetchDataIDA, currentPageIDA } =
    useDigitProIDA();
  const { dataDigitProBaby, fetchDataDigitProBaby, currentPageDigitProBaby } =
    useDigitProBaby();
  const { dataDigitProBMI, fetchDataBMI, currentPageBMI } = useDigitProBMI();
  const { historiesDoppler, fetchDataDoppler, currentPageDoppler } =
    useDoppler();
  const { historiesPM9000, fetchDataPM9000, currentPagePM9000 } = usePM9000();
  const { historiesDS001, fetchDataDS001, currentPageDS001 } = useDS001();

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [showFilter, setShowFilter] = useState(false);

  const stateRef = useRef(state);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(
    "digit-pro-baby"
  );
  const [paginationState, setPaginationState] = useState<{
    [key: string]: {
      page: number;
      limit: number;
      search: string;
    };
  }>({
    "digit-pro-ida": { page: 1, limit: 10, search: "" },
    "digit-pro-baby": { page: 1, limit: 10, search: "" },
    bmi: { page: 1, limit: 10, search: "" },
    doppler: { page: 1, limit: 10, search: "" },
    "pm-9000": { page: 1, limit: 10, search: "" },
    "ds-001": { page: 1, limit: 10, search: "" },
  });
  const [totalPageState, setTotalPageState] = useState<{
    [key: string]: number;
  }>({
    "digit-pro-ida": 0,
    "digit-pro-baby": 0,
    bmi: 0,
    doppler: 0,
    "pm-9000": 0,
    "ds-001": 0,
  });
  const totalPage = totalPageState[selectedDevice ?? "digit-pro-ida"];
  const currentPagination = paginationState[selectedDevice ?? "digit-pro-ida"];

  const updatePagination = (
    updates: Partial<{ page: number; limit: number; search: string }>
  ) => {
    setPaginationState((prev) => ({
      ...prev,
      [selectedDevice ?? "digit-pro-ida"]: {
        ...prev[selectedDevice ?? "digit-pro-ida"],
        ...updates,
      },
    }));
  };

  useEffect(() => {
    setLimit(10);
    setSearch("");
    setShowFilter(false);
  }, [selectedDevice]);

  useEffect(() => {
    if (selectedDevice === "digit-pro-ida") {
      fetchDataIDA({
        page: 1,
        limit,
        search,
      });
    }
    if (selectedDevice === "digit-pro-baby") {
      fetchDataDigitProBaby({
        page: 1,
        limit,
        search,
      });
    }
    if (selectedDevice === "bmi") {
      fetchDataBMI({
        page: 1,
        limit,
        search,
      });
    }
    if (selectedDevice === "doppler") {
      fetchDataDoppler({
        page: 1,
        limit,
        search,
      });
    }
    if (selectedDevice === "pm-9000") {
      fetchDataPM9000({
        page: 1,
        limit,
        search,
      });
    }
    if (selectedDevice === "ds-001") {
      fetchDataDS001({
        page: 1,
        limit,
        search,
      });
    }
  }, [limit, search, selectedDevice]);

  useEffect(() => {
    const { page, limit, search } =
      paginationState[selectedDevice ?? "digit-pro-ida"];

    if (selectedDevice === "digit-pro-ida") {
      fetchDataIDA({ page, limit, search }).then((res) => {
        setTotalPageState((prev) => ({
          ...prev,
          "digit-pro-ida": res?.total_pages ?? 0,
        }));
      });
    }
    if (selectedDevice === "digit-pro-baby") {
      fetchDataDigitProBaby({ page, limit, search }).then((res) => {
        setTotalPageState((prev) => ({
          ...prev,
          "digit-pro-baby": res?.total_pages ?? 0,
        }));
      });
    }
    if (selectedDevice === "bmi") {
      fetchDataBMI({ page, limit, search }).then((res) => {
        setTotalPageState((prev) => ({
          ...prev,
          bmi: res?.total_pages ?? 0,
        }));
      });
    }
    if (selectedDevice === "doppler") {
      fetchDataDoppler({ page, limit, search }).then((res) => {
        setTotalPageState((prev) => ({
          ...prev,
          doppler: res?.total_pages ?? 0,
        }));
      });
    }
    if (selectedDevice === "pm-9000") {
      fetchDataPM9000({ page, limit, search }).then((res) => {
        setTotalPageState((prev) => ({
          ...prev,
          "pm-9000": res?.total_pages ?? 0,
        }));
      });
    }
    if (selectedDevice === "ds-001") {
      fetchDataDS001({ page, limit, search }).then((res) => {
        setTotalPageState((prev) => ({
          ...prev,
          "ds-001": res?.total_pages ?? 0,
        }));
      });
    }
  }, [paginationState, selectedDevice]);

  const handleLimitChange = (value: string) => {
    updatePagination({ limit: Number(value), page: 1 });
    setLimit(Number(value));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePagination({ search: e.target.value, page: 1 });
    setSearch(e.target.value);
  };

  const goToPage = (page: number) => {
    updatePagination({ page });
  };

  const goToNextPage = () => {
    if (currentPagination.page < totalPage) {
      updatePagination({ page: currentPagination.page + 1 });
    }
  };

  const goToPreviousPage = () => {
    if (currentPagination.page > 1) {
      updatePagination({ page: currentPagination.page - 1 });
    }
  };

  return (
    <MainLayout title="Measurement Histories" state="Measurement Histories">
      <div className="flex flex-col">
        {/* Filter by device */}
        <div className="flex flex-row mb-10 gap-6">
          {stateRef.current.map((item, index) => {
            const isSelected = selectedDevice === item.value;

            return (
              <div
                key={index}
                onClick={() => setSelectedDevice(item.value)}
                className={`flex flex-col gap-2 items-center justify-center px-4 py-2 rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer transition duration-200 ${
                  isSelected
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-[#f0f0f0] text-black"
                }`}
              >
                <div className="flex flex-row gap-2 items-center justify-center">
                  <p className="text-sm">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="sticky top-0 z-10 bg-[#ededf9] mb-2">
          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-6 w-full justify-between">
              <div className="flex items-center gap-2">
                <p>Showing</p>
                <Select
                  value={limit.toString()}
                  onValueChange={handleLimitChange}
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
                <div className="flex flex-col gap-2">
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
                        onChange={handleSearchChange}
                        className="px-2 focus:outline-none"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-20 mt-4 px-2 h-full">
          <div className="flex flex-row gap-4">
            <div className="w-full">
              {/* Table */}
              {selectedDevice === "digit-pro-baby" && (
                <TableHistoryDigitProBaby
                  data={dummyDataDigitProBaby ?? dataDigitProBaby}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                  goToPage={goToPage}
                  currentPage={currentPageDigitProBaby}
                  totalPage={totalPage}
                />
              )}
              {selectedDevice === "digit-pro-ida" && (
                <TableHistoryDigitProIDA
                  data={dummyDataIDA ?? historiesDigitProIDA}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                  goToPage={goToPage}
                  currentPage={currentPageIDA}
                  totalPage={totalPage}
                />
              )}
              {selectedDevice === "bmi" && (
                <TableHistoryBMI
                  data={dummyDataBMI ?? dataDigitProBMI}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                  goToPage={goToPage}
                  currentPage={currentPageBMI}
                  totalPage={totalPage}
                />
              )}
              {selectedDevice === "doppler" && (
                <TableHistoryDoppler
                  data={dummyDopplerData ?? historiesDoppler}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                  goToPage={goToPage}
                  currentPage={currentPageDoppler}
                  totalPage={totalPage}
                />
              )}
              {selectedDevice === "pm-9000" && (
                <TableHistoryPM9000
                  data={dummyDataPM9000 ?? historiesPM9000}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                  goToPage={goToPage}
                  currentPage={currentPagePM9000}
                  totalPage={totalPage}
                />
              )}
              {selectedDevice === "ds-001" && (
                <TableHistoryDS001
                  data={dummyDataDS001 ?? historiesDS001}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                  goToPage={goToPage}
                  currentPage={currentPageDS001}
                  totalPage={totalPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MeasurementHistoriesPage;
