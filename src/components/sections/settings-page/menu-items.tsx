import { PasswordSetting } from "./password-setting";
import { UserProfileSetting } from "./user-profile-setting";
import { HospitalProfileSetting } from "./hospital-profile-setting";
import { LanguageSetting } from "./language-setting";
import { SatusehatSetting } from "./satusehat-setting";

type MenuItemsProps = {
  state: string;
  animationKey: number;
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MenuItems = ({ state, animationKey }: MenuItemsProps) => {
  return (
    <div
      key={animationKey}
      className="transition-all duration-500 ease-in-out animate-fade-slide"
    >
      {/* Edit Hospital Profile */}
      {state === "Edit Hospital Profile" && <HospitalProfileSetting />}
      {/* Edit Profile */}
      {state === "Edit Profile" && <UserProfileSetting />}
      {/* Password */}
      {state === "Password" && <PasswordSetting />}
      {/* Language */}
      {state === "Language" && <LanguageSetting />}
      {/* Gateways */}
      {state === "SATUSEHAT" && <SatusehatSetting />}
    </div>
  );
};
