import { useEffect, useMemo, useState } from "react";
import { Devices } from "@/models/DeviceModel";
import { Patients } from "@/models/PatientModel";
import { PersonStanding } from "lucide-react";
import { useSocketPulseOximeterFox1 } from "@/hooks/socket/devices/SocketPulseOximeterFox1";
import { useSocketPTBDigi } from "@/hooks/socket/devices/SocketPTBDigi";
import { SaveMeasurementPTBDigi } from "@/components/modals/save_measurement/save-measurement-ptb-digi";

type Props = {
  patientSelected?: Patients;
  deviceSelected: Devices;
  roomSelected: String;
  setDataMeasurement: (data: any) => void;
  clearTrigger?: boolean;
  saveTrigger?: boolean;
};

export const PTBDigi = ({
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
  const { data: socketData } = useSocketPTBDigi({
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
        {/* Body Height */}
        <div className="flex flex-col border-2 rounded-2xl p-4 w-full gap-2">
          <div className="flex flex-row items-center gap-3">
            <PersonStanding className="w-8 h-8" />
            <p className="text-base">Body Height</p>
          </div>
          <p className="text-3xl font-bold mx-auto">
            {data?.distance ?? "--"} <span className="text-lg"> cm</span>
          </p>
        </div>
      </div>
      {/* Save Modal */}
      <SaveMeasurementPTBDigi
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
