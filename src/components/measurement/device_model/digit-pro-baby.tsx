import { useEffect, useMemo, useState } from "react";
import babyWeighingIcon from "@/assets/icons/pediatrics-black.png";
import { Devices } from "@/models/DeviceModel";
import { Patients } from "@/models/PatientModel";
import { useSocketDigitProBaby } from "@/hooks/socket/devices/SocketDigitProBaby";
import { SaveMeasurementDigitProBaby } from "@/components/modals/save_measurement/save-measurement-digit-pro-baby";

type Props = {
  patientSelected?: Patients;
  deviceSelected: Devices;
  roomSelected: String;
  setDataMeasurement: (data: any) => void;
  clearTrigger?: boolean;
  saveTrigger?: boolean;
};

export const DigitProBaby = ({
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
  const { data: socketData } = useSocketDigitProBaby({
    gatewayId,
    macDevice,
  });

  // Update data when socketData changes
  useEffect(() => {
    if (socketData) setData(socketData);
  }, [socketData]);

  console.log("Data Patient Selected Baby : ", patientSelected);
  return (
    <div className="flex flex-col gap-4 w-full pt-3">
      {/* Weight Baby */}
      <div className="flex flex-col border-2 rounded-2xl p-4 w-full gap-2">
        <div className="flex flex-row items-center gap-3">
          <img src={babyWeighingIcon} alt="" className="w-8 h-8" />
          <p className="text-base">Weight Baby</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold mx-auto">
            {data?.weight ?? "--"} kg
          </p>
        </div>
      </div>
      {/* Save Modal */}
      <SaveMeasurementDigitProBaby
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
