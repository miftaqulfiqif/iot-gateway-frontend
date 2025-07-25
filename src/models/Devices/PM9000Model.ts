export type PM9000Model = {
  ip?: string;
  ecg_bpm: number;
  ecg_bpm_spo2: number;
  spo2: number;
  resp: number;
  temp1: number;
  temp2: number;
  delta_temp: number;
};

export type PM9000MeasurementHistory = {
  id: string;
  patient_handler: {
    patient: {
      name: string;
    };
  };
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
