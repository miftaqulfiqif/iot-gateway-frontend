import weighingIcon from "@/assets/icons/weighting-black.png";
import babyWeighingIcon from "@/assets/icons/pediatrics-black.png";
import { useEffect, useMemo, useState } from "react";
import { useSocketDigitProIDA } from "@/hooks/socket/devices/SocketDigitProIDA";
import { SaveMeasurementDigitProIDA } from "@/components/modals/save_measurement/save-measurement-digit-pro-ida";

type Props = {
  patientSelected?: any;
  deviceSelected?: any;
  roomSelected: String;
  setDataMeasurement?: (data: any) => void;
  clearTrigger?: boolean;
  saveTrigger?: boolean;
};

export const DigitProIDA = ({
  patientSelected,
  deviceSelected,
  roomSelected,
  setDataMeasurement,
  clearTrigger,
  saveTrigger,
}: Props) => {
  const [data, setData] = useState<any>(null);
  const [saveModal, setSaveModal] = useState<boolean>(false);

  // Reset Data
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

  // Get gateway Id and mac device
  const gatewayId = useMemo(
    () => deviceSelected?.gateway_id ?? "",
    [deviceSelected]
  );
  const macDevice = useMemo(
    () => deviceSelected?.mac_address ?? "",
    [deviceSelected]
  );

  // get real-time data from socket
  const { data: socketData } = useSocketDigitProIDA({
    gatewayId,
    macDevice,
  });

  // Update data when socketData changes
  useEffect(() => {
    if (socketData) setData(socketData);
  }, [socketData]);

  return (
    <div className="flex flex-col md:flex-row gap-2">
      {/* Weight Mother */}
      <div className="flex flex-col border-2 rounded-2xl p-4 w-full gap-2">
        <div className="flex flex-row items-center gap-3">
          <img src={weighingIcon} alt="" className="w-8 h-8" />
          <p className="text-base">Weight Mother</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold mx-auto">
            {data?.weight_mother ?? "--"} kg
          </p>
        </div>
      </div>

      {/* Weight Baby */}
      <div className="flex flex-col border-2 rounded-2xl p-4 w-full gap-2">
        <div className="flex flex-row items-center gap-3">
          <img src={babyWeighingIcon} alt="" className="w-8 h-8" />
          <p className="text-base">Weight Baby</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold mx-auto">
            {data?.weight_baby ?? "--"} kg
          </p>
        </div>
      </div>

      {/* Save Modal */}
      <SaveMeasurementDigitProIDA
        isActive={saveModal}
        setInactive={() => setSaveModal(false)}
        patient={patientSelected}
        deviceMac={deviceSelected?.mac_address}
        room={roomSelected}
        baby={patientSelected?.babies?.[0]}
        result={{
          weight_mother: data?.weight_mother,
          weight_baby: data?.weight_baby,
        }}
      />
    </div>
  );
};
