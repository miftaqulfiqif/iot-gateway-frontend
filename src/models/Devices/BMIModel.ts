import { Patients } from "../PatientModel";

export type BMIModel = {
  mac?: string;
  height: number;
  weight: number;
  age: number;
  impedance: number;
  bmi: number;
  bodyFat: number;
  muscleMass: number;
  water: number;
  visceralFat: number;
  boneMass: number;
  metabolism: number;
  protein: number;
  obesity: number;
  bodyAge: number;
  lbm: number;
};

export type DigitProBMIMeasurementHistory = {
  id: number;
  device_id: string;
  name: string;
  weight: number;
  age: number;
  impedence: number;
  bmi: number;
  bodyFat: number;
  muscleMass: number;
  water: number;
  visceralFat: number;
  boneMass: number;
  metabolism: number;
  protein: number;
  obesity: number;
  bodyAge: number;
  lbm: number;
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
