export type Patients = {
  id: string;
  nik: string;
  no_kk: string;
  ihs_number: string;
  name: string;
  gender: string;
  phone: string;
  place_of_birth: string;
  date_of_birth: string;
  address: {
    use: string;
    line: string;
    city: string;
    postal_code: string;
    country: string;
    rt: string;
    rw: string;
    province: {
      id: string;
      name: string;
    };
    regency: {
      id: string;
      name: string;
      province_id: string;
    };
    district: {
      id: string;
      name: string;
      regency_id: string;
    };
    village: {
      id: string;
      name: string;
      district_id: string;
    };
  };
  patient_room?: any;
  age: number;
  condition: string;
};

export type Address = {
  use: string;
  line: string;
  city: string;
  postal_code: string;
  country: string;
  rt: string;
  rw: string;
  province: {
    id: string;
    name: string;
  };
  regency: {
    id: string;
    name: string;
    province_id: string;
  };
  district: {
    id: string;
    name: string;
    regency_id: string;
  };
  village: {
    id: string;
    name: string;
    district_id: string;
  };
};

export type DetailPatient = {
  detail: {
    id: string;
    nik: string;
    no_kk: string;
    ihs_number: string;
    barcode_img: string;
    name: string;
    gender: string;
    phone: string;
    place_of_birth: string;
    date_of_birth: string;
    height: number;
    age: {
      years: number;
      months: number;
      total_months: number;
    };
    patient_room: {
      room: {
        name: string;
        number: string;
        type: string;
      };
    };
    address_id: string;
    created_at: string;
    updated_at: string;
  };
  last_measurement: {
    id: string | null;
    patient_id: string | null;
    blood_pressure: string | null;
    spo2: string | null;
    body_temperature: string | null;
    body_weight: string | null;
    body_height: string | null;
    timestamp_blood_pressure: string | null;
    timestamp_spo2: string | null;
    timestamp_body_temperature: string | null;
    timestamp_body_weight: string | null;
    timestamp_body_height: string | null;
  };
  last_body_composition_analysis: {
    bmi: number;
    body_fat: number;
    muscle_mass: number;
    water: number;
    visceral_fat: number;
    bone_mass: number;
    metabolism: number;
    protein: number;
    obesity: number;
    body_age: number;
    lbm: number;
    recorded_at: string;
    body_fat_trend: Array<{
      value: number;
      recorded_at: string;
    }>;
    muscle_mass_trend: Array<{
      value: number;
      recorded_at: string;
    }>;
  };
  recent_doctor: Array<{
    id: string;
    name: string;
    image: string;
    speciality: string;
    recorded_at: string;
  }>;
  medical_activities: Array<any>;
};
