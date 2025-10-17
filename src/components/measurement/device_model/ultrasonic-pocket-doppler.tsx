import { useEffect, useMemo, useState } from "react";
import { Devices } from "@/models/DeviceModel";
import { Patients } from "@/models/PatientModel";
import { useSocketDoppler } from "@/hooks/socket/devices/SocketDoppler";
import { Activity, AudioLines } from "lucide-react";
import ChartDopplerRealtime from "@/components/charts/chart-doppler-realtime";
import battery25Icon from "@/assets/icons/battery-25.png";
import battery50Icon from "@/assets/icons/battery-50.png";
import battery75Icon from "@/assets/icons/battery-75.png";
import battery100Icon from "@/assets/icons/battery-100.png";
import { set } from "lodash";
import { SaveMeasurementDoppler } from "@/components/modals/save_measurement/save-measurement-doppler";

type Props = {
  patientSelected?: Patients;
  deviceSelected: Devices;
  roomSelected: String;
  setDataMeasurement: (data: any) => void;
  clearTrigger?: boolean;
  saveTrigger?: boolean;
};

export const UltrasonicPocketDoppler = ({
  patientSelected,
  deviceSelected,
  roomSelected,
  setDataMeasurement,
  clearTrigger,
  saveTrigger,
}: Props) => {
  const [data, setData] = useState<any>(null);
  const [saveModal, setSaveModal] = useState<boolean>(false);
  const [heartRateResult, setHeartRateResult] = useState<number>(0);
  const [chart, setChart] = useState<
    { index: number; heart_rate: number; heart_rate_avg: number }[]
  >([]);

  // Reset data
  useEffect(() => {
    if (clearTrigger) {
      setData(null);
      setHeartRateResult(0);
      setChart([]);
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
    if (setChart) {
      setChart(realtime);
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
  const { data: socketData, realtime } = useSocketDoppler({
    gatewayId,
    macDevice,
    clearTrigger,
  });

  // Update heart rate result when dataRealtime changes
  useEffect(() => {
    if (realtime.length > 0) {
      const last = realtime[realtime.length - 1];
      setHeartRateResult(last.heart_rate_avg);
      setChart(realtime);
    } else {
      setHeartRateResult(0);
    }
  }, [realtime]);

  // Update data when socketData changes
  useEffect(() => {
    if (socketData) setData(socketData);
  }, [socketData]);

  // Mapping battery icon
  const batteryIcons: Record<number, string> = {
    100: battery100Icon,
    75: battery75Icon,
    50: battery50Icon,
    25: battery25Icon,
  };

  // Set sound color
  const soundColor =
    data?.sound_quality === "poor"
      ? "text-red-500"
      : data?.sound_quality === "medium"
      ? "text-yellow-300"
      : "text-green-400";

  return (
    <div className="flex flex-col gap-4 w-full pt-3">
      {/* Heart Rate Card */}
      <div className="flex flex-col border-2 rounded-2xl p-4 w-full gap-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-3">
            <Activity className="w-6 h-6" />
            <p className="text-base">Heart</p>
          </div>

          <div className="flex items-center gap-2">
            <AudioLines className={`w-6 h-6 ${soundColor}`} />
            {data?.battery_level && batteryIcons[data.battery_level] && (
              <img
                src={batteryIcons[data.battery_level]}
                alt="Battery level"
                className="w-6 h-6"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold mx-auto">
            {heartRateResult ?? "--"} bpm
          </p>
        </div>
      </div>

      {/* Real-time Chart */}
      <ChartDopplerRealtime chartData={chart} />

      {/* Save Modal (belum diimplementasi) */}
      <SaveMeasurementDoppler
        isActive={saveModal}
        setInactive={() => setSaveModal(false)}
        patient={patientSelected}
        device={deviceSelected}
        room={roomSelected}
        result={heartRateResult}
      />
    </div>
  );
};
