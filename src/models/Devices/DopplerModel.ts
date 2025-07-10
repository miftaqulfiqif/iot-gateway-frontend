import { Patients } from "../PatientModel";

export type DopplerModel = {
  mac?: string;
  heart_rate: number;
  sound_quality: string;
  battery_level: number;
};

export type DopplerMeasurementHistory = {
  id: number;
  device_id: string;
  name: string;
  heart_rate: number;
  timestamp: string;
  patient_handler: {
    id: string;
    patient: Patients;
    user: {
      id: string;
      username: string;
    };
  };
};
