import { useSocketDigitProBMI } from "@/hooks/socket/devices/SocketDigitProBMI";
import { PersonStandingIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import weighingIcon from "@/assets/icons/weighting-black.png";
import bmiIcon from "@/assets/icons/bmi.png";
import { BMIResult } from "@/components/ui/bmi/bmi-result";
import { Devices } from "@/models/DeviceModel";
import { Patients } from "@/models/PatientModel";
import { SaveMeasurementBMI } from "@/components/modals/save_measurement/save-measurement-bmi";
import { usePatient } from "@/hooks/api/use-patient";

type Props = {
  patientSelected: Patients;
  deviceSelected: Devices;
  roomSelected: String;
  setDataMeasurement: (data: any) => void;
  clearTrigger?: boolean;
  saveTrigger?: boolean;
};

export const DigitProBMI = ({
  patientSelected,
  deviceSelected,
  roomSelected,
  setDataMeasurement,
  clearTrigger,
  saveTrigger,
}: Props) => {
  const { getDetailPatient, detailPatient } = usePatient({});
  const [patientHeight, setPatientHeight] = useState<number>(0);
  const [debouncedHeight, setDebouncedHeight] = useState<number>(0);
  const [data, setData] = useState<any>(null);
  const [saveModal, setSaveModal] = useState<boolean>(false);

  useEffect(() => {
    if (patientSelected) {
      getDetailPatient(patientSelected.id);
    }
  }, [patientSelected]);

  useEffect(() => {
    if (detailPatient?.last_measurement?.body_height) {
      setPatientHeight(Number(detailPatient.last_measurement.body_height));
    }
  }, [detailPatient]);

  // Debounce logic: update debouncedHeight when 1 second
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedHeight(patientHeight);
    }, 1000); // 1 second debounce

    return () => {
      clearTimeout(handler);
    };
  }, [patientHeight]);

  // Reset data
  useEffect(() => {
    if (clearTrigger) {
      setData(null);
      setPatientHeight(0);
      setDebouncedHeight(0);
    }
  }, [clearTrigger]);

  // Open Save Modal
  useEffect(() => {
    if (saveTrigger) {
      setSaveModal(true);
    }
  }, [saveTrigger]);

  // Send data measurement to parent
  useEffect(() => {
    if (setDataMeasurement) {
      setDataMeasurement(data);
    }
  }, [data, setDataMeasurement]);

  const gatewayId = useMemo(
    () => deviceSelected?.gateway_id ?? "",
    [deviceSelected]
  );
  const macDevice = useMemo(
    () => deviceSelected?.mac_address ?? "",
    [deviceSelected]
  );
  const patientAge = useMemo(
    () => patientSelected?.age ?? 0,
    [patientSelected]
  );
  const patientGender = useMemo(
    () => patientSelected?.gender ?? "unknown",
    [patientSelected]
  );

  // get real-time data from socket
  const { data: socketData } = useSocketDigitProBMI({
    gatewayId,
    macDevice,
    patientHeight: debouncedHeight,
    patientAge,
    patientGender,
  });

  // Update data when socketData changes
  useEffect(() => {
    if (socketData) setData(socketData);
  }, [socketData]);

  return (
    <div className="flex flex-col gap-4 w-full pt-3">
      {/* Input Height */}
      <div className="flex flex-col border-2 rounded-2xl p-4 w-full gap-2">
        <div className="flex flex-row items-center gap-3">
          <PersonStandingIcon className="w-6 h-6" />
          <p className="text-base">Height</p>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="number"
            value={patientHeight || ""}
            className="bg-gray-100 text-sm px-4 py-2 rounded-lg w-full focus:outline-blue-400"
            placeholder="Enter height (cm)"
            onChange={(e) => setPatientHeight(Number(e.target.value))}
          />
          {patientHeight !== debouncedHeight && (
            <p className="text-xs text-gray-500 italic">Updating height...</p>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        {/* Weight */}
        <div className="flex flex-col border-2 rounded-2xl p-4 w-full gap-2">
          <div className="flex flex-row items-center gap-3">
            <img src={weighingIcon} alt="" className="w-8 h-8" />
            <p className="text-base">Weight</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold mx-auto">
              {data?.weight ? data.weight : "--"} kg
            </p>
          </div>
        </div>
        {/* BMI */}
        <div className="flex flex-col border-2 rounded-2xl p-4 w-full gap-2">
          <div className="flex flex-row items-center gap-3">
            <img src={bmiIcon} alt="" className="w-8 h-8" />
            <p className="text-base">BMI</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold mx-auto">
              {data?.height !== 0 && data?.bmi ? data.bmi : "--"}
            </p>
          </div>
        </div>
      </div>
      {data?.height !== 0 && data?.impedance !== 0 && data && (
        <BMIResult
          BMI={data?.bmi}
          age={data.age}
          bodyFat={data.bodyFat}
          muscleMass={data.muscleMass}
          water={data.water}
          visceralFat={data.visceralFat}
          boneMass={data.boneMass}
          metabolism={data.metabolism}
          protein={data.protein}
          obesity={data.obesity}
          bodyAge={data.bodyAge}
          lbm={data.lbm}
        />
      )}
      <SaveMeasurementBMI
        isActive={saveModal}
        setInactive={() => setSaveModal(false)}
        patient={patientSelected}
        device={deviceSelected}
        room={roomSelected}
        patientHeight={patientHeight}
        result={data}
      />
    </div>
  );
};
