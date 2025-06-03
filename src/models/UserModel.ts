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
  admin?: { name: string };
  doctor?: { name: string };
  nurse?: { name: string };
};
