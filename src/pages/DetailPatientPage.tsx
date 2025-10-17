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
  HeartPulse,
  PersonStanding,
  Search,
  Thermometer,
  User,
  Weight,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import MainLayout from "@/components/layouts/main-layout";

import { usePatient } from "@/hooks/api/use-patient";
import ChartPatientWeightTrend from "@/components/charts/chart-patient-weight-trend";
import ChartPatientVital from "@/components/charts/chart-patient-vital";
import { format } from "date-fns";
import ChartBiaBodyComposition from "@/components/charts/chart-bia-body-composition";
import { RecentMeasurementsPatientTable } from "@/components/tables/recent-measurements-patient-table";
import spo2Icon from "@/assets/icons/spo2-1.png";
import leanBodyMassIcon from "@/assets/icons/lean-body-mass.png";

import weightScaleIcon from "@/assets/icons/weight-scale.png";
import { useHistoriesMeasurement } from "@/hooks/api/devices/use-histories-measurement";

const historiesData = [
  { value: 55.2, recorded_at: "2023-01-01T08:00:00.000Z" },
  { value: 55.5, recorded_at: "2023-01-02T08:00:00.000Z" },
  { value: 55.8, recorded_at: "2023-01-03T08:00:00.000Z" },
  { value: 56.1, recorded_at: "2023-01-04T08:00:00.000Z" },
  { value: 56.4, recorded_at: "2023-01-05T08:00:00.000Z" },
  { value: 56.7, recorded_at: "2023-01-06T08:00:00.000Z" },
  { value: 57.0, recorded_at: "2023-01-07T08:00:00.000Z" },
  { value: 57.3, recorded_at: "2023-01-08T08:00:00.000Z" },
  { value: 57.6, recorded_at: "2023-01-09T08:00:00.000Z" },
  { value: 57.9, recorded_at: "2023-01-10T08:00:00.000Z" },
];

const historiesDataVital = [
  { value: 65, recorded_at: "2023-01-01T08:00:00.000Z" },
  { value: 68, recorded_at: "2023-01-02T08:00:00.000Z" },
  { value: 71, recorded_at: "2023-01-03T08:00:00.000Z" },
  { value: 74, recorded_at: "2023-01-04T08:00:00.000Z" },
  { value: 77, recorded_at: "2023-01-05T08:00:00.000Z" },
  { value: 80, recorded_at: "2023-01-06T08:00:00.000Z" },
  { value: 83, recorded_at: "2023-01-07T08:00:00.000Z" },
  { value: 86, recorded_at: "2023-01-08T08:00:00.000Z" },
  { value: 89, recorded_at: "2023-01-09T08:00:00.000Z" },
  { value: 92, recorded_at: "2023-01-10T08:00:00.000Z" },
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

const DetailPatientPage = () => {
  const { patientId } = useParams();
  const { historiesMeasurement, getHistoriesMeasurement } =
    useHistoriesMeasurement();
  const { getDetailPatient, detailPatient } = usePatient({});
  const filterRef = useRef<HTMLDivElement>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [patientImage, setPatientImage] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const biaBodyComposition = detailPatient?.last_body_composition_analysis;

  useEffect(() => {
    if (patientId) {
      getDetailPatient(patientId);
    }
  }, [patientId, getDetailPatient]);

  useEffect(() => {
    getHistoriesMeasurement({
      page: page,
      limit: limit,
      query: search,
      patientId: patientId || "",
    });
  }, [page, limit, search]);

  useEffect(() => {
    if (detailPatient) {
      console.log("DETAIL PATIENT UPDATED: ", detailPatient);
    }
  }, [detailPatient]);

  // Close the filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

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
                <div className="w-26 h-26 rounded-full overflow-hidden border-2 flex items-center justify-center bg-gray-200">
                  {patientImage ? (
                    <img
                      src={patientImage}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-semibold text-gray-700">
                      {detailPatient?.detail?.name
                        ? detailPatient?.detail?.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .substring(0, 3)
                            .toUpperCase()
                        : "?"}
                    </span>
                  )}
                </div>
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
                          detailPatient?.detail.age.years !== 0
                            ? detailPatient?.detail.age.years
                            : detailPatient?.detail.age.months
                        } ${
                          detailPatient?.detail.age.years !== 0
                            ? "years"
                            : "months"
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
        </div>

        {/* Last Measurement */}
        <div className="flex gap-4 h-fit">
          {lastMeasurement({
            label: "Blood Pressure",
            value: `${
              detailPatient?.last_measurement?.blood_pressure ?? " -- "
            }`,
            unit: "mmHg",
            timestamp: `${
              detailPatient?.last_measurement?.timestamp_blood_pressure
                ? format(
                    detailPatient.last_measurement?.timestamp_blood_pressure,
                    "dd MMMM yyyy"
                  )
                : " -- "
            }`,
            icon: <Activity className="w-10 h-10 text-red-500" />,
          })}
          {lastMeasurement({
            label: "Sp02",
            value: `${detailPatient?.last_measurement?.spo2 ?? " -- "}`,
            unit: "%",
            timestamp: `${
              detailPatient?.last_measurement?.timestamp_spo2
                ? format(
                    detailPatient.last_measurement?.timestamp_spo2,
                    "dd MMMM yyyy"
                  )
                : " -- "
            }`,
            icon: spo2Icon,
          })}
          {lastMeasurement({
            label: "Temperature",
            value: `${
              detailPatient?.last_measurement?.body_temperature ?? " -- "
            }`,
            unit: "°C",
            timestamp: `${
              detailPatient?.last_measurement?.timestamp_body_temperature
                ? format(
                    detailPatient.last_measurement?.timestamp_body_temperature,
                    "dd MMMM yyyy"
                  )
                : " -- "
            }`,
            icon: <Thermometer className="w-10 h-10 text-orange-500" />,
          })}
          {lastMeasurement({
            label: "Body Weight",
            value: `${detailPatient?.last_measurement?.body_weight ?? " -- "}`,
            unit: "kg",
            timestamp: `${
              detailPatient?.last_measurement?.timestamp_body_weight
                ? format(
                    detailPatient.last_measurement?.timestamp_body_weight,
                    "dd MMMM yyyy"
                  )
                : " -- "
            }`,
            icon: weightScaleIcon,
          })}
          {lastMeasurement({
            label: "Body Height",
            value: `${detailPatient?.last_measurement?.body_height ?? " -- "}`,
            unit: "cm",
            timestamp: `${
              detailPatient?.last_measurement?.timestamp_body_height
                ? format(
                    detailPatient.last_measurement?.timestamp_body_height,
                    "dd MMMM yyyy"
                  )
                : " -- "
            }`,
            icon: <PersonStanding className="w-10 h-10 text-purple-500" />,
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
            biaBodyComposition?.recorded_at || new Date(),
            "dd MMMM yyyy"
          )} | Device : Digit Pro BMI`}</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <LastBiaMeasurement
              label="BMI"
              value={biaBodyComposition?.bmi ?? " -- "}
              category={dummyBia.bmi.category}
              unit="kg/m²"
              icon={<Calculator className="w-5 h-5 text-green-500" />}
            />
            <LastBiaMeasurement
              label="Fat"
              value={biaBodyComposition?.body_fat ?? " -- "}
              // category={dummyBia.body_fat.category}
              unit="%"
              icon={<Droplet className="w-5 h-5 text-orange-500" />}
            />
            <LastBiaMeasurement
              label="Muscle"
              value={biaBodyComposition?.muscle_mass ?? " -- "}
              // category={dummyBia.muscle_mass.category}
              unit="kg"
              icon={<BicepsFlexed className="w-5 h-5 text-red-500" />}
            />
            <LastBiaMeasurement
              label="Water Content"
              value={biaBodyComposition?.water ?? " -- "}
              // category={dummyBia.water_content.category}
              unit="%"
              icon={<Droplets className="w-5 h-5 text-blue-500" />}
            />
            <LastBiaMeasurement
              label="Visceral Fat"
              value={biaBodyComposition?.visceral_fat ?? " -- "}
              // category={dummyBia.visceral_fat.category}
              unit="level"
              icon={<Apple className="w-5 h-5 text-yellow-500" />}
            />
            <LastBiaMeasurement
              label="Bone Mass"
              value={biaBodyComposition?.bone_mass ?? " -- "}
              // category={dummyBia.bone_mass.category}
              unit="kg"
              icon={<Bone className="w-5 h-5 text-black-500" />}
            />
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <LastBiaMeasurement
              label="BMR"
              value={biaBodyComposition?.metabolism ?? " -- "}
              unit="kcal"
              icon={<Flame className="w-5 h-5 text-red-500" />}
            />
            <LastBiaMeasurement
              label="Protein"
              value={biaBodyComposition?.protein ?? " -- "}
              unit="%"
              icon={<Activity className="w-5 h-5 text-green-500" />}
            />
            <LastBiaMeasurement
              label="Classification"
              value={biaBodyComposition?.obesity ?? " -- "}
              icon={<Weight className="w-5 h-5 text-blue-500" />}
            />
            <LastBiaMeasurement
              label="Body Age"
              value={biaBodyComposition?.body_age ?? " -- "}
              unit="years"
              icon={<User className="w-5 h-5 text-purple-500" />}
            />
            <LastBiaMeasurement
              label="LBM"
              value={biaBodyComposition?.lbm ?? " -- "}
              unit="kg"
              icon={
                <img src={leanBodyMassIcon} className="w-6 h-6" alt="lbm" />
              }
            />
          </div>
          <div className="flex w-full mt-2 gap-4">
            <ChartBiaBodyComposition
              label="Body Fat Trend"
              color="#17cfb9"
              chartData={
                biaBodyComposition?.body_fat_trend.slice(0, 8)
                  ? biaBodyComposition?.body_fat_trend.slice(0, 8)
                  : []
              }
            />
            <ChartBiaBodyComposition
              label="Muscle Mass Trend"
              color="#1095c1"
              chartData={
                biaBodyComposition?.muscle_mass_trend.slice(0, 8)
                  ? biaBodyComposition?.muscle_mass_trend.slice(0, 8)
                  : []
              }
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
            <ChartPatientWeightTrend chartData={historiesData.slice(0, 9)} />
          </div>
          <div className="w-1/2 h-full">
            <ChartPatientVital chartData={historiesDataVital.slice(0, 9)} />
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
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 flex items-center justify-center bg-gray-200">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-gray-700">
                          {item.name
                            ? item.name
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .substring(0, 3)
                                .toUpperCase()
                            : "?"}
                        </span>
                      )}
                    </div>
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
            data={historiesMeasurement}
            goToPreviousPage={() => setPage((prev) => prev - 1)}
            goToNextPage={() => setPage((prev) => prev + 1)}
            goToPage={setPage}
            currentPage={1}
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
  icon: React.ReactNode | string;
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
      <div className="">
        {typeof icon === "string" ? (
          <img src={icon} alt={label} className="w-10 h-10" />
        ) : (
          icon
        )}
      </div>
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
