export type DS001Model = {
  ip?: string;
  ecg_bpm: number;
  ecg_bpm_spo2: number;
  spo2: number;
  resp: number;
  temp1: number;
  temp2: number;
  delta_temp: number;
};

export type DS001MeasurementHistory = {
  id: string;
  patient_handler: {
    patient: {
      name: string;
    };
  };
  patient: {
    name: string;
  };
  name: string;
  ecg: number;
  spo2: number;
  resp: number;
  systolic: number;
  diastolic: number;
  mean: number;
  temp1: number;
  temp2: number;
  delta_temp: number;
  timestamp: string;
};
