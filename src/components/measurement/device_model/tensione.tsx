import { useEffect, useMemo, useState } from "react";
import { Devices } from "@/models/DeviceModel";
import { Patients } from "@/models/PatientModel";
import {
  Activity,
  Heart,
  HeartPulse,
  LucideMove,
  Thermometer,
} from "lucide-react";
import { useSocketMft01 } from "@/hooks/socket/devices/SocketMft01";
import spo2Icon from "@/assets/icons/spo2-black.png";
import adultIcon from "@/assets/icons/adult.png";
import childIcon from "@/assets/icons/children.png";
import babyIcon from "@/assets/icons/baby.png";
import { useSocketTensiOne } from "@/hooks/socket/devices/SocketTensiOne";
import { SaveMeasurementTensione } from "@/components/modals/save_measurement/save-measurement-tensione";

type Props = {
  patientSelected?: Patients;
  deviceSelected: Devices;
  roomSelected: String;
  setDataMeasurement: (data: any) => void;
  clearTrigger?: boolean;
  saveTrigger?: boolean;
};

export const TensiOne = ({
  patientSelected,
  deviceSelected,
  roomSelected,
  setDataMeasurement,
  clearTrigger,
  saveTrigger,
}: Props) => {
  const [data, setData] = useState<any>(null);
  const [saveModal, setSaveModal] = useState<boolean>(false);

  // Reset data
  useEffect(() => {
    if (clearTrigger) {
      setData(null);
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

  // get real-time data from socket
  const { data: socketData } = useSocketTensiOne({
    gatewayId,
    macDevice,
  });

  // Update data when socketData changes
  useEffect(() => {
    if (socketData) setData(socketData);
  }, [socketData]);

  // Mapping status error
  const errorStatusMap: Record<number, { label: string; color: string }> = {
    1: { label: "Correct Result", color: "bg-green-100 text-green-500" },
    2: { label: "Measuring Failure", color: "bg-red-100 text-red-500" },
    3: { label: "Self-test Failure", color: "bg-red-100 text-red-500" },
    4: { label: "Low Battery Power", color: "bg-red-100 text-red-500" },
    5: { label: "Measurement Cancellation", color: "bg-red-100 text-red-500" },
    6: { label: "Loose Cuff", color: "bg-red-100 text-red-500" },
    7: { label: "Air Leakage", color: "bg-red-100 text-red-500" },
    8: { label: "Air Pressure Error", color: "bg-red-100 text-red-500" },
    9: { label: "Beyond Range", color: "bg-red-100 text-red-500" },
    10: { label: "Excessive Exercise", color: "bg-red-100 text-red-500" },
    11: { label: "Over Pressure", color: "bg-red-100 text-red-500" },
    12: { label: "Signal Saturation", color: "bg-red-100 text-red-500" },
    13: { label: "Timeout", color: "bg-red-100 text-red-500" },
  };

  // Mapping user type
  const userTypeMap: Record<number, { icon: string; label: string }> = {
    1: { icon: adultIcon, label: "Adult" },
    2: { icon: childIcon, label: "Pediatric" },
    3: { icon: babyIcon, label: "Neonatal" },
  };

  const currentError = data?.error_status
    ? errorStatusMap[data.error_status]
    : null;

  const currentUser = data?.user_type ? userTypeMap[data.user_type] : null;

  return (
    <div className="flex flex-col gap-4 w-full pt-3">
      <div className="flex items-center gap-2 justify-end">
        {/* User Type */}
        {currentUser !== null && (
          <img
            src={currentUser.icon}
            alt={currentUser.label}
            className="w-8 h-8"
          />
        )}

        {/* Status */}
        {currentError !== null && (
          <p
            className={`text-sm mr-2 px-2.5 py-0.5 rounded-full font-bold ${currentError.color}`}
          >
            {currentError.label}
          </p>
        )}
      </div>

      {/* NIBP */}
      <div className="flex flex-row border-2 rounded-2xl p-4 w-full gap-2">
        <div className="flex flex-col w-2/3">
          <div className="flex flex-row items-center gap-3">
            <Activity className="w-8 h-8" />
            <p className="text-base">NIBP</p>
          </div>
          <p className="text-3xl font-bold mx-auto">
            {data?.systolic ?? "--"} / {data?.diastolic ?? "--"}{" "}
            <span className="text-lg"> mmHg</span>
          </p>
        </div>
        <div className="flex flex-col w-1/4">
          <p>MAP</p>
          <p className="text-3xl font-bold mx-auto">
            {data?.map ?? "--"} <span className="text-lg"> mmHg</span>
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        {/* Pulse Rate */}
        <div className="flex flex-col border-2 rounded-2xl p-4 w-full gap-2">
          <div className="flex flex-row items-center gap-3">
            <Heart className="w-8 h-8" />
            <p className="text-base">Pulse Rate</p>
          </div>
          <p className="text-3xl font-bold mx-auto">
            {data?.pulse_rate ?? "--"} <span className="text-lg"> bpm</span>
          </p>
        </div>
        {/* SPO2 */}
        <div className="flex flex-col border-2 rounded-2xl p-4 w-full gap-2">
          <div className="flex flex-row items-center gap-3">
            <img src={spo2Icon} alt="SPO2 Icon" className="w-8 h-8" />
            <p className="text-base">Sp02</p>
          </div>
          <p className="text-3xl font-bold mx-auto">
            {data?.spo2 ?? "--"} <span className="text-lg"> %</span>
          </p>
        </div>
      </div>

      {/* Save Modal */}
      <SaveMeasurementTensione
        isActive={saveModal}
        setInactive={() => setSaveModal(false)}
        patient={patientSelected}
        device={deviceSelected}
        room={roomSelected}
        result={data}
      />
    </div>
  );
};
