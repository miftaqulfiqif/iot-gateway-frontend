import React from "react";
import { DigitProBMI } from "./device_model/digit-pro-bmi";
import { Devices } from "@/models/DeviceModel";
import { Patients } from "@/models/PatientModel";
import { DigitProIDA } from "./device_model/digit-pro-ida";
import { DigitProBaby } from "./device_model/digit-pro-baby";
import { UltrasonicPocketDoppler } from "./device_model/ultrasonic-pocket-doppler";
import { Mft01 } from "./device_model/mft-01";
import { TensiOne } from "./device_model/tensione";
import { PulseOximeterFox1 } from "./device_model/pulse-oximeter-fox1";
import { PTBDigi } from "./device_model/ptb-digi";
import { MTRBaby002 } from "./device_model/mtr-baby002";

interface Props {
  patientSelected: Patients;
  deviceSelected: Devices;
  roomSelected: any;
  setDataMeasurement: (data: any) => void;
  clearTrigger?: boolean;
  saveTrigger?: boolean;
}

export const MeasurementSection: React.FC<Props> = ({
  patientSelected,
  deviceSelected,
  roomSelected,
  setDataMeasurement,
  clearTrigger,
  saveTrigger,
}) => {
  if (!deviceSelected) {
    return (
      <div className="text-center py-10 text-gray-500">No device selected.</div>
    );
  }

  const roomName =
    `${roomSelected.name} ${roomSelected.number} - ${roomSelected.type}` || "";

  switch (deviceSelected.device_function) {
    case "digitpro_bmi":
      return (
        <DigitProBMI
          patientSelected={patientSelected}
          deviceSelected={deviceSelected}
          roomSelected={roomName}
          setDataMeasurement={setDataMeasurement}
          clearTrigger={clearTrigger}
          saveTrigger={saveTrigger}
        />
      );
    case "digitpro_ida":
      return (
        <DigitProIDA
          patientSelected={patientSelected}
          deviceSelected={deviceSelected}
          roomSelected={roomName}
          setDataMeasurement={setDataMeasurement}
          clearTrigger={clearTrigger}
          saveTrigger={saveTrigger}
        />
      );
    case "digitpro_baby":
      return (
        <DigitProBaby
          patientSelected={patientSelected}
          deviceSelected={deviceSelected}
          roomSelected={roomName}
          setDataMeasurement={setDataMeasurement}
          clearTrigger={clearTrigger}
          saveTrigger={saveTrigger}
        />
      );
    case "ultrasonic_pocket_doppler":
      return (
        <UltrasonicPocketDoppler
          patientSelected={patientSelected}
          deviceSelected={deviceSelected}
          roomSelected={roomName}
          setDataMeasurement={setDataMeasurement}
          clearTrigger={clearTrigger}
          saveTrigger={saveTrigger}
        />
      );
    case "mft01":
      return (
        <Mft01
          patientSelected={patientSelected}
          deviceSelected={deviceSelected}
          roomSelected={roomName}
          setDataMeasurement={setDataMeasurement}
          clearTrigger={clearTrigger}
          saveTrigger={saveTrigger}
        />
      );
    case "tensione":
      return (
        <TensiOne
          patientSelected={patientSelected}
          deviceSelected={deviceSelected}
          roomSelected={roomName}
          setDataMeasurement={setDataMeasurement}
          clearTrigger={clearTrigger}
          saveTrigger={saveTrigger}
        />
      );

    case "pulse_oximeter":
      return (
        <PulseOximeterFox1
          patientSelected={patientSelected}
          deviceSelected={deviceSelected}
          roomSelected={roomName}
          setDataMeasurement={setDataMeasurement}
          clearTrigger={clearTrigger}
          saveTrigger={saveTrigger}
        />
      );
    case "height_gauge":
      return (
        <PTBDigi
          patientSelected={patientSelected}
          deviceSelected={deviceSelected}
          roomSelected={roomName}
          setDataMeasurement={setDataMeasurement}
          clearTrigger={clearTrigger}
          saveTrigger={saveTrigger}
        />
      );
    case "mtr_baby002":
      return (
        <MTRBaby002
          patientSelected={patientSelected}
          deviceSelected={deviceSelected}
          roomSelected={roomName}
          setDataMeasurement={setDataMeasurement}
          clearTrigger={clearTrigger}
          saveTrigger={saveTrigger}
        />
      );
    default:
      return (
        <div className="text-center py-10 text-gray-500">
          Unsupported device type: {deviceSelected.device_function}
        </div>
      );
  }
};
