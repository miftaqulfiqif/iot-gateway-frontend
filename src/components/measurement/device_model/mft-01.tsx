import { useEffect, useMemo, useState } from "react";
import { Devices } from "@/models/DeviceModel";
import { Patients } from "@/models/PatientModel";
import { Thermometer } from "lucide-react";
import { useSocketMft01 } from "@/hooks/socket/devices/SocketMft01";
import { SaveMeasurementDigitProBaby } from "@/components/modals/save_measurement/save-measurement-digit-pro-baby";
import { SaveMeasurementMft01 } from "@/components/modals/save_measurement/save-measurement-mft01";

type Props = {
  patientSelected?: Patients;
  deviceSelected: Devices;
  roomSelected: String;
  setDataMeasurement: (data: any) => void;
  clearTrigger?: boolean;
  saveTrigger?: boolean;
};

export const Mft01 = ({
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
  const { data: socketData } = useSocketMft01({
    gatewayId,
    macDevice,
  });

  // Update data when socketData changes
  useEffect(() => {
    if (socketData) setData(socketData);
  }, [socketData]);

  return (
    <div className="flex flex-col gap-4 w-full pt-3">
      {/* Body Temperature */}
      <div className="flex flex-col border-2 rounded-2xl p-4 w-full gap-2">
        <div className="flex flex-row items-center gap-3">
          <Thermometer className="w-8 h-8" />
          <p className="text-base">Body Temperature</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold mx-auto">
            {data?.temperature ?? "--"} °C
          </p>
        </div>
      </div>
      {/* Save Modal */}
      <SaveMeasurementMft01
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
