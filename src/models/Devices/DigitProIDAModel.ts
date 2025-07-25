import { Patients } from "../PatientModel";

export type DigitProIDAModel = {
  mac?: string;
  weight_mother: number;
  weight_child: number;
};

export type DigitProIDAMeasurementHistory = {
  id: number;
  device_id: string;
  name: string;
  weight_mother: number;
  weight_child: number;
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
