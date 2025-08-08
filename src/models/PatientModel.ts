export type Patients = {
  id: string;
  barcode_image: string;
  nik: string;
  no_kk: string;
  name: string;
  gender: string;
  address: Address;
  phone: string;
  work: string;
  last_education: string;
  place_of_birth: string;
  date_of_birth: string;
  religion: string;
  height: number;
  age: number;
};

type Address = {
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
