import { ProfilePicture } from "@/models/ProfilePictureModel";

export type User = {
  id?: string;
  name: string;
  username: string;
  password?: string;
  role_id?: number;
  role?: string;
  status?: boolean;
  profile_picture?: ProfilePicture;
  hospital?: { id: string; name: string; logo_path: string };
  gateway?: { id: string; name: string; description: string };
  admin?: { name: string };
  doctor?: { name: string };
  nurse?: { name: string };
};

export type DetailUser = {
  is_active: boolean;
  detail: {
    id: string;
    name: string;
    ihs_number: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    place_of_birth?: string;
    date_of_birth?: string;
    address: {
      id: string;
      use: string;
      line: string;
      city: string;
      postal_code: string;
      country: string;
      rt: string;
      rw: string;
      created_at: string;
      updated_at: string;
      province_id: string;
      regency_id: string;
      district_id: string;
      village_id: string;
    };
  };
  profile_picture: string;
  recent_patients: any[];
  measurement_activity: any[];
};

export type ListUsers = {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  role: {
    name: string;
  };
  created_at: string;
};
