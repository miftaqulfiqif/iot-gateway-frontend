import { useEffect, useMemo, useState } from "react";
import { Devices } from "@/models/DeviceModel";
import { Patients } from "@/models/PatientModel";
import { useSocketDigitProBaby } from "@/hooks/socket/devices/SocketDigitProBaby";
import { Heart } from "lucide-react";
import spo2Icon from "@/assets/icons/spo2-black.png";
import { useSocketTensiOne } from "@/hooks/socket/devices/SocketTensiOne";
import { useSocketPulseOximeterFox1 } from "@/hooks/socket/devices/SocketPulseOximeterFox1";
import { SaveMeasurementPulseOximeterFox1 } from "@/components/modals/save_measurement/save-measurement-pulse-oximeter-fox1";

type Props = {
  patientSelected?: Patients;
  deviceSelected: Devices;
  roomSelected: String;
  setDataMeasurement: (data: any) => void;
  clearTrigger?: boolean;
  saveTrigger?: boolean;
};

export const PulseOximeterFox1 = ({
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
  const { data: socketData } = useSocketPulseOximeterFox1({
    gatewayId,
    macDevice,
  });

  // Update data when socketData changes
  useEffect(() => {
    if (socketData) setData(socketData);
  }, [socketData]);

  return (
    <div className="flex flex-col gap-4 w-full pt-3">
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
      <SaveMeasurementPulseOximeterFox1
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
