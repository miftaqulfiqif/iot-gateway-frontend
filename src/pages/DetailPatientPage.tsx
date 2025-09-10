import {
  Activity,
  Apple,
  BicepsFlexed,
  Bone,
  Calculator,
  Droplet,
  Droplets,
  Flame,
  Funnel,
  GlassWater,
  Heart,
  HeartPlus,
  HeartPulse,
  Mars,
  PersonStanding,
  Search,
  Thermometer,
  User,
  Users,
  Venus,
  Weight,
  Zap,
} from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { TableHistoryDigitProBaby } from "@/components/tables/history-digit-pro-baby";
import { TableHistoryDigitProIDA } from "@/components/tables/history-digit-pro-ida";
import { TableHistoryBMI } from "@/components/tables/history-digit-pro-bmi";
import { useDigitProIDA } from "@/hooks/api/devices/use-digit-pro-ida";
import { useDigitProBaby } from "@/hooks/api/devices/use-digit-pro-baby";
import { useDigitProBMI } from "@/hooks/api/devices/use-digit-pro-bmi";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layouts/main-layout";
import { TableHistoryDoppler } from "@/components/tables/history-doppler";
import { useDoppler } from "@/hooks/api/devices/use-doppler";
import { usePatient } from "@/hooks/api/use-patient";
import HistoriesDigitProBaby from "@/components/charts/chart-histories-digitpro-baby";
import ChartPatientWeightTrend from "@/components/charts/chart-patient-weight-trend";
import ChartPatientVital from "@/components/charts/chart-patient-vital";
import { format } from "date-fns";
import { ca, vi } from "date-fns/locale";
import ChartBiaBodyComposition from "@/components/charts/chart-bia-body-composition";
import { RecentMeasurementsPatientTable } from "@/components/tables/recent-measurements-patient-table";
import { times } from "lodash";

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
];

const dummyPatient = {
  id: "PATL230000000000001",
  nik: "3517172100000000",
  barcode_img:
    "data:image/png;base64,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",
  name: "Abdulloh Khasimiri",
  gender: "male",
  address: "Surabaya",
  phone: "01281023018291",
  work: "Software Engineer",
  last_education: "S1",
  place_of_birth: "Surabaya",
  date_of_birth: "2001-09-21",
  religion: null,
  height: null,
  age: 23,
};

const dummyListBaby = [
  {
    id: "35b29da2-e59e-43d3-9486-8668c916acb6",
    name: "Test",
    gender: "male",
    date_of_birth: "2001-09-01",
    place_of_birth: null,
    patient_id: "PATL230000000000001",
  },
  {
    id: "35b29da2-e59e-43d3-9416-86686916acb6",
    name: "Prabowo Sinegar",
    gender: "female",
    date_of_birth: "2001-09-01",
    place_of_birth: null,
    patient_id: "PATL230000000000001",
  },
  {
    id: "35b29da2-e59e-43d3-9486-866y6916acb6",
    name: "Prabowo Sinegar",
    gender: "female",
    date_of_birth: "2001-09-01",
    place_of_birth: null,
    patient_id: "PATL230000000000001",
  },
  {
    id: "35b29da2-e59e-43d3-9486-866c86916acb6",
    name: "Prabowo Sinegar",
    gender: "female",
    date_of_birth: "2001-09-01",
    place_of_birth: null,
    patient_id: "PATL230000000000001",
  },
  {
    id: "35b29da2-e59e-43d3-9486-866g6916acb6",
    name: "Prabowo Sinegar",
    gender: "female",
    date_of_birth: "2001-09-01",
    place_of_birth: null,
    patient_id: "PATL230000000000001",
  },
];

const dummyRecentDoctor = [
  {
    id: "35b29da2-e59e-43d3-9486-86a86916acb6",
    doctor_name: "Dr. Prabowo Sinegar",
    speciality: "Dokter Umum",
    date: "2023-06-01",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb1",
    doctor_name: "Dr. Prabowo Sinegar",
    speciality: "Dokter Umum",
    date: "2023-06-01",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb2",
    doctor_name: "Dr. Prabowo Sinegar",
    speciality: "Dokter Umum",
    date: "2023-06-01",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb9",
    doctor_name: "Dr. Prabowo Sinegar",
    speciality: "Dokter Umum",
    date: "2023-06-01",
  },
];

const dummyMedicalActivity = [
  {
    id: "35b29da2-e59e-43d3-9486-86686916acb6",
    title: "Pemeriksaan Fisik",
    date: "2023-06-01",
    note: "Pemeriksaan fisik dengan hasil normal",
  },
  {
    id: "35b29da2-e59e-43d3-9486-86686916ac16",
    title: "Pemeriksaan Fisik",
    date: "2023-06-01",
    note: "Pemeriksaan fisik dengan hasil normal",
  },
  {
    id: "35b29da2-e59e-43d3-9486-8668691gacb6",
    title: "Pemeriksaan Fisik",
    date: "2023-06-01",
    note: "Pemeriksaan fisik dengan hasil normal",
  },
  {
    id: "35b29da2-e59e-43d3-9486-866869x6acb6",
    title: "Pemeriksaan Fisik",
    date: "2023-06-01",
    note: "Pemeriksaan fisik dengan hasil normal",
  },
];

const historiesData = [
  { weight: 55.2, timestamp: "2023-01-01T08:00:00.000Z" },
  { weight: 55.5, timestamp: "2023-01-02T08:00:00.000Z" },
  { weight: 55.8, timestamp: "2023-01-03T08:00:00.000Z" },
  { weight: 56.1, timestamp: "2023-01-04T08:00:00.000Z" },
  { weight: 56.4, timestamp: "2023-01-05T08:00:00.000Z" },
  { weight: 56.7, timestamp: "2023-01-06T08:00:00.000Z" },
  { weight: 57.0, timestamp: "2023-01-07T08:00:00.000Z" },
  { weight: 57.3, timestamp: "2023-01-08T08:00:00.000Z" },
  { weight: 57.6, timestamp: "2023-01-09T08:00:00.000Z" },
  { weight: 57.9, timestamp: "2023-01-10T08:00:00.000Z" },
];

const historiesDataVital = [
  { heart_rate: 65, timestamp: "2023-01-01T08:00:00.000Z" },
  { heart_rate: 68, timestamp: "2023-01-02T08:00:00.000Z" },
  { heart_rate: 71, timestamp: "2023-01-03T08:00:00.000Z" },
  { heart_rate: 74, timestamp: "2023-01-04T08:00:00.000Z" },
  { heart_rate: 77, timestamp: "2023-01-05T08:00:00.000Z" },
  { heart_rate: 80, timestamp: "2023-01-06T08:00:00.000Z" },
  { heart_rate: 83, timestamp: "2023-01-07T08:00:00.000Z" },
  { heart_rate: 86, timestamp: "2023-01-08T08:00:00.000Z" },
  { heart_rate: 89, timestamp: "2023-01-09T08:00:00.000Z" },
  { heart_rate: 92, timestamp: "2023-01-10T08:00:00.000Z" },
];

const dummyBia = {
  last_measurement: "2023-01-10T08:00:00.000Z",
  device: "Digit Pro BMI",
  bmi: {
    value: 57.9,
    category: "normal",
  },
  body_fat: {
    value: 18.5,
    category: "healthy",
  },
  muscle_mass: {
    value: 45.0,
    category: "good",
  },
  water_content: {
    value: 60.0,
    category: "normal",
  },
  visceral_fat: {
    value: 10,
    category: "low_risk",
  },
  bone_mass: {
    value: 3.5,
    category: "normal",
  },
  bmr_kcal: {
    value: 1500,
    category: "normal",
  },
  protein: {
    value: 20.0,
    category: "healthy",
  },
  body_age: {
    value: 25,
    category: "normal",
  },
  lbm: {
    value: 47.4,
    category: "good",
  },
  classification: "Normal",
};

const dummyRecentPatientMeasurements = [
  {
    id: "1",
    parameter: "Weight",
    value: "70 kg",
    device: "Digit Pro Baby",
    room: "ICU-101",
    timestamp: "2023-01-10T08:00:00.000Z",
  },
  {
    id: "2",
    parameter: "Height",
    value: "170 cm",
    device: "Digit Pro BMI",
    room: "ICU-102",
    timestamp: "2023-01-11T08:00:00.000Z",
  },
  {
    id: "3",
    parameter: "Body Temperature",
    value: "36.4 C",
    device: "Digit Pro Doppler",
    room: "ICU-103",
    timestamp: "2023-01-12T08:00:00.000Z",
  },
  {
    id: "4",
    parameter: "Blood Pressure",
    value: "120/80 mmHg",
    device: "Digit Pro Doppler",
    room: "ICU-104",
    timestamp: "2023-01-13T08:00:00.000Z",
  },
  {
    id: "5",
    parameter: "Heart Rate",
    value: "120 bpm",
    device: "Digit Pro BMI",
    room: "ICU-105",
    timestamp: "2023-01-14T08:00:00.000Z",
  },
  {
    id: "6",
    parameter: "Oxygen Saturation",
    value: "99%",
    device: "Digit Pro Doppler",
    room: "ICU-106",
    timestamp: "2023-01-15T08:00:00.000Z",
  },
  {
    id: "7",
    parameter: "Respiratory Rate",
    value: "16 breaths/min",
    device: "Digit Pro BMI",
    room: "ICU-107",
    timestamp: "2023-01-16T08:00:00.000Z",
  },
  {
    id: "8",
    parameter: "Body Fat",
    value: "18.5%",
    device: "Digit Pro Doppler",
    room: "ICU-108",
    timestamp: "2023-01-17T08:00:00.000Z",
  },
  {
    id: "9",
    parameter: "Muscle Mass",
    value: "45.0 kg",
    device: "Digit Pro BMI",
    room: "ICU-109",
    timestamp: "2023-01-18T08:00:00.000Z",
  },
  {
    id: "10",
    parameter: "Visceral Fat",
    value: "10",
    device: "Digit Pro Doppler",
    room: "ICU-110",
    timestamp: "2023-01-19T08:00:00.000Z",
  },
];

const DetailPatientPage = () => {
  const { patientId } = useParams();
  const { getDetailPatient, detailPatient } = usePatient({});
  const [search, setSearch] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (patientId) {
      getDetailPatient(patientId);
    }
  }, [patientId, getDetailPatient]);

  useEffect(() => {
    if (detailPatient) {
      console.log("DETAIL PATIENT UPDATED: ", detailPatient);
    }
  }, [detailPatient]);

  return (
    <MainLayout title="Patients" state="Patients">
      <div className="flex flex-col gap-6 w-full pb-5">
        {/* Patient Card */}
        <div className="flex gap-4">
          {/* Patient Info */}
          <div className="flex flex-col gap-2 w-1/1 p-6 rounded-xl bg-gradient-to-b from-[#4956F4] to-[#6e79f4] text-white shadow-lg">
            <div className="flex flex-row justify-between">
              <div className="flex gap-4 w-full">
                {/* Profile Picture */}
                <div className="rounded-full bg-gray-200 w-25 h-25"></div>
                <div className="flex flex-col gap-2 justify-between">
                  <p className="text-2xl font-bold">
                    {detailPatient?.detail.name}
                  </p>
                  {/* Detail Info */}
                  <div className="flex flex-wrap gap-6 w-full">
                    <div className="flex flex-col gap-1 min-w-[220px]">
                      <p className="text-sm">Patient ID</p>
                      <p className="font-bold">{detailPatient?.detail.id}</p>
                    </div>

                    <div className="flex flex-col gap-1 min-w-[220px]">
                      <p className="text-sm">Age / Gender</p>
                      {detailPatient?.detail.age && (
                        <p className="font-bold">{`${
                          detailPatient?.detail.age
                        } / ${
                          detailPatient?.detail?.gender
                            ?.charAt(0)
                            .toUpperCase() +
                          detailPatient?.detail?.gender?.slice(1)
                        }`}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 min-w-[260px]">
                      <p className="text-sm">Place / Date of birth</p>
                      {detailPatient?.detail.date_of_birth && (
                        <p className="font-bold">{`${
                          detailPatient?.detail.place_of_birth
                        }, ${format(
                          detailPatient?.detail?.date_of_birth,
                          "dd MMMM yyyy"
                        )}`}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 min-w-[220px]">
                      <p className="text-sm">Phone</p>
                      <p className="font-bold">{detailPatient?.detail.phone}</p>
                    </div>

                    <div className="flex flex-col gap-1 min-w-[120px]">
                      <p className="text-sm">Admission</p>
                      {detailPatient?.detail.created_at && (
                        <p className="font-bold">
                          {format(
                            detailPatient?.detail?.created_at,
                            "dd MMMM yyyy"
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {detailPatient?.detail?.patient_room?.room && (
                <div className="flex gap-2 rounded-xl border items-center h-fit px-3 py-1 cursor-pointer bg-white text-black shadow-[inset_6px_6px_5px_rgba(0,0,0,0.16),inset_-6px_-6px_5px_rgba(255,255,255,1)]">
                  <p className="w-full font-bold text-lg">
                    {detailPatient?.detail.patient_room?.room?.name ?? "--"}
                  </p>
                  <p className="font-bold">
                    {detailPatient?.detail.patient_room?.room?.number ?? "--"}
                  </p>
                  <p>-</p>
                  <p className="bg-green-200 text-green-900 rounded-2xl p-2 w-20 text-center">
                    {detailPatient?.detail.patient_room?.room?.type ?? "--"}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Detail Info */}
          {/* <div className="bg-white w-full min-h-full rounded-2xl shadow-lg p-4">
            <p className="text-lg font-bold">Detail info patient</p>
            <div className="mt-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <p className="font-semibold">IHS Number :</p>
                  <p>{detailPatient?.detail.ihs_number ?? " -- "}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">NIK :</p>
                  <p>{detailPatient?.detail.nik}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Name :</p>
                  <p>{detailPatient?.detail.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Age :</p>
                  <p>{detailPatient?.detail.age} years</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Gender :</p>
                  <p>
                    {detailPatient?.detail.gender
                      ? dummyPatient.gender.charAt(0).toUpperCase() +
                        dummyPatient.gender.slice(1)
                      : "Unknown"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Place of Birth :</p>
                  <p>{detailPatient?.detail.place_of_birth}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Date of Birth :</p>
                  <p>
                    {detailPatient?.detail.date_of_birth
                      ? new Intl.DateTimeFormat("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(detailPatient.detail.date_of_birth))
                      : "Unknown"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Phone :</p>
                  <p>{detailPatient?.detail.phone}</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Last Measurement */}
        <div className="flex gap-4 h-fit">
          {lastMeasurement({
            label: "Heart Rate",
            value: 120,
            unit: "bpm",
            timestamp: "23 September 2023 23:59",
            icon: <Heart className="w-10 h-10 text-red-500" />,
          })}
          {lastMeasurement({
            label: "Sp02",
            value: 99,
            unit: "%",
            timestamp: "23 September 2023 23:59",
            icon: <Droplets className="w-10 h-10 text-blue-500" />,
          })}
          {lastMeasurement({
            label: "Temperature",
            value: 36.4,
            unit: "°C",
            timestamp: "23 September 2023 23:59",
            icon: <Thermometer className="w-10 h-10 text-orange-500" />,
          })}
          {lastMeasurement({
            label: "Weight",
            value: 70,
            unit: "kg",
            timestamp: "23 September 2023 23:59",
            icon: <Weight className="w-10 h-10 text-green-500" />,
          })}
          {lastMeasurement({
            label: "Blood Pressure",
            value: "120/80",
            unit: "mmHg",
            timestamp: "22 September 2023 23:59",
            icon: <Activity className="w-10 h-10 text-red-500" />,
          })}
        </div>

        {/* BIA Body Composition Analysis */}
        <div className="bg-white border rounded-3xl p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <div className="flex flex-row items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" />
            <p className="text-2xl font-semibold">
              BIA Body Composition Analysis
            </p>
          </div>
          <p className="text-gray-500">{`Latest scan : ${format(
            dummyBia.last_measurement,
            "dd MMMM yyyy"
          )} | Device : ${dummyBia.device}`}</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <LastBiaMeasurement
              label="BMI"
              value={dummyBia.bmi.value}
              category={dummyBia.bmi.category}
              unit="kg/m²"
              icon={<Calculator className="w-5 h-5 text-green-500" />}
            />
            <LastBiaMeasurement
              label="Fat"
              value={dummyBia.body_fat.value}
              category={dummyBia.body_fat.category}
              unit="%"
              icon={<Droplet className="w-5 h-5 text-orange-500" />}
            />
            <LastBiaMeasurement
              label="Muscle"
              value={dummyBia.muscle_mass.value}
              category={dummyBia.muscle_mass.category}
              unit="kg"
              icon={<BicepsFlexed className="w-5 h-5 text-red-500" />}
            />
            <LastBiaMeasurement
              label="Water Content"
              value={dummyBia.water_content.value}
              category={dummyBia.water_content.category}
              unit="%"
              icon={<Droplets className="w-5 h-5 text-blue-500" />}
            />
            <LastBiaMeasurement
              label="Visceral Fat"
              value={dummyBia.visceral_fat.value}
              category={dummyBia.visceral_fat.category}
              unit="level"
              icon={<Apple className="w-5 h-5 text-yellow-500" />}
            />
            <LastBiaMeasurement
              label="Bone Mass"
              value={dummyBia.bone_mass.value}
              category={dummyBia.bone_mass.category}
              unit="kg"
              icon={<Bone className="w-5 h-5 text-black-500" />}
            />
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <LastBiaMeasurement
              label="BMR"
              value={dummyBia.bmr_kcal.value}
              unit="kcal"
              icon={<Flame className="w-5 h-5 text-red-500" />}
            />
            <LastBiaMeasurement
              label="Protein"
              value={dummyBia.protein.value}
              unit="%"
              icon={<Activity className="w-5 h-5 text-green-500" />}
            />
            <LastBiaMeasurement
              label="Classification"
              value={dummyBia.classification}
              icon={<Weight className="w-5 h-5 text-blue-500" />}
            />
            <LastBiaMeasurement
              label="Body Age"
              value={dummyBia.body_age.value}
              unit="years"
              icon={<User className="w-5 h-5 text-purple-500" />}
            />
            <LastBiaMeasurement
              label="LBM"
              value={dummyBia.lbm.value}
              unit="kg"
              icon={<Users className="w-5 h-5 text-blue-500" />}
            />
          </div>
          <div className="flex w-full mt-2 gap-4">
            <ChartBiaBodyComposition
              label="Body Fat Trend"
              color="#17cfb9"
              chartData={historiesData}
            />
            <ChartBiaBodyComposition
              label="Muscle Mass Trend"
              color="#1095c1"
              chartData={historiesData}
            />
          </div>
          <hr className="my-4 border-gray-300" />
          <p className="mt-4 text-sm text-gray-500">
            BIA analysis uses bioelectrical impedance to measure body
            composition. Values are estimates and should be interpreted by
            healthcare professionals.
          </p>
        </div>

        {/* Charts */}
        <div className="flex gap-4 h-fit">
          <div className="w-1/2 h-full">
            <ChartPatientWeightTrend chartData={historiesData} />
          </div>
          <div className="w-1/2 h-full">
            <ChartPatientVital chartData={historiesDataVital} />
          </div>
        </div>

        {/* Recent Doctor & Medical Activity */}
        <div className="w-full flex gap-4 h-[350px]">
          {/* Recent Doctor */}
          <div className="flex flex-col p-4 bg-white w-1/3 h-full rounded-2xl border-3 border-gray-200">
            <div className="flex justify-between">
              <p className="font-semibold">Recent Doctor</p>
              <p className="text-blue-500 hover:underline cursor-pointer">
                See all
              </p>
            </div>
            {/* List doctor */}
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[260px] pr-2">
              {detailPatient?.recent_doctor.length === 0 ? (
                <p className="text-center text-sm text-gray-500">
                  No data available
                </p>
              ) : (
                detailPatient?.recent_doctor.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-18 h-18 rounded-full bg-gray-400"></div>
                    <div className="flex flex-col">
                      <p className="font-semibold font-sm">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.speciality ? item.speciality : " -- "}
                      </p>
                      <div className="border px-2 py-1 rounded-full flex items-center mt-1">
                        <p className="text-xs">
                          {new Intl.DateTimeFormat("en-GB", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(item.recorded_at))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Medical Activity */}
          <div className="flex flex-col bg-gradient-to-l from-[#4956F4] to-[#6e79f4] w-2/3 h-full rounded-2xl border-3 border-gray-200 p-4 text-white">
            <div className="flex justify-between">
              <p className="font-semibold">Medical Activity</p>
              <p className="text-white hover:underline cursor-pointer">
                See all
              </p>
            </div>
            {/* List */}
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto max-h-[270px] pr-2">
              {detailPatient?.medical_activities.length === 0 ? (
                <p className="text-center text-sm text-white">
                  No data available
                </p>
              ) : (
                detailPatient?.medical_activities.map((item) => (
                  <div key={item.id} className="flex items-center p-2 ">
                    <HeartPulse className="w-10 h-10 text-white bg-blue-600 mr-4 rounded-lg p-1" />
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between">
                        <p className="text-base font-semibold">{item.title}</p>
                        <p className="text-xs">
                          {new Intl.DateTimeFormat("en-GB", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(item.recorded_at))}
                        </p>
                      </div>
                      <p className="text-sm font-normal">{item.description}</p>
                      <hr className="border-t border-white mt-2" />
                    </div>
                    <div className="flex flex-col"></div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* History Measurements */}
        <p className="text-2xl font-semibold">Recent Measurements</p>
        <div className="flex gap-4 items-center">
          {/* Search Box */}
          <div className="relative">
            <div className="bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.3)] w-90">
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

          {/* Filter Wrapper */}
          <div ref={filterRef} className="relative">
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
              <div className="absolute left-0 top-full mt-2 z-50 bg-white p-4 rounded-xl min-w-[200px] text-sm shadow-[0px_4px_4px_rgba(0,0,0,0.3)]">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row justify-between">
                    <span title="Filter users by role">Filter contents</span>
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
        </div>
        <div className="">
          <RecentMeasurementsPatientTable
            data={dummyRecentPatientMeasurements}
            goToPreviousPage={() => {}}
            goToNextPage={() => {}}
            goToPage={() => {}}
            currentPage={1}
            totalPage={2}
            isDetailPatient
          />
        </div>
      </div>
    </MainLayout>
  );
};

const lastMeasurement = ({
  label,
  value,
  unit,
  timestamp,
  icon,
}: {
  label: string;
  value: number | string;
  unit: string;
  timestamp: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white w-1/3 h-full rounded-2xl border-3 border-gray-200">
      <div className="flex flex-col gap-2">
        <p className="font-normal ">{label}</p>
        <div className="flex gap-2 items-end">
          <p className="text-4xl font-bold">{value}</p>
          <p>{unit}</p>
        </div>
        <p className="text-xs">{timestamp}</p>
      </div>
      {icon}
    </div>
  );
};

const LastBiaMeasurement = ({
  label,
  value,
  category,
  unit,
  icon,
}: {
  label: string;
  value: number | string;
  category?: string;
  unit?: string;
  icon: React.ReactNode;
}) => {
  return (
    <div
      className={`
    flex justify-between items-center p-4 rounded-2xl border-2 border-gray-200
    ${category ? "bg-white" : "bg-gray-200"}
  `}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            {icon}
            <p className="font-bold">{label}</p>
          </div>
          {category && (
            <p className="text-sm px-3 py-1 rounded-full bg-green-200 text-green-900">
              {category
                ?.replace(/_/g, " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </p>
          )}
        </div>
        <div className="flex gap-2 items-end">
          <p className={`font-bold ${category ? "text-xl" : "text-lg"}`}>
            {value}
          </p>
          <p>{unit}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPatientPage;
