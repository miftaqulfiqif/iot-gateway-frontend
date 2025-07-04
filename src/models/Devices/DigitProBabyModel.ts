import { Patients } from "../PatientModel";

export type DigitProBabyModel = {
  mac: string;
  weight: number;
};

export type DigitProBabyMeasurementHistory = {
  id: number;
  device_id: string;
  name: string;
  weight: number;
  timestamp: string;
  patient_handler: {
    id: string;
    patient: Patients;
    user: {
      id: string;
      username: string;
    };
    baby: {
      id: string;
      name: string;
      gender: string;
      date_of_birth: string;
      place_of_birth: string;
    };
  };
};
