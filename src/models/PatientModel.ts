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
    age: number;
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
  babies: Array<any>;
  recent_doctor: Array<{
    id: string;
    name: string;
    image: string;
    speciality: string;
    recorded_at: string;
  }>;
  medical_activities: Array<any>;
};
