import MainLayout from "../components/layouts/main-layout";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { MenuSettings } from "@/components/ui/settings-page/menu-setting";

import profileIcon from "@/assets/icons/profile-icon.png";
import hospitalIcon from "@/assets/icons/hospital-icon.png";
import passwordIcon from "@/assets/icons/password-icon.png";
import gatewayIcon from "@/assets/icons/gateway-icon.png";
import { MenuItems } from "@/components/sections/settings-page/menu-items";
import { ConfirmChangeSettingModal } from "@/components/modals/confirm-change-setting-modal";
import { AddGatewayModal } from "@/components/modals/add-gateway-modal";

const SettingsPage = () => {
  const { user } = useAuth();

  const [state, setState] = useState(
    user?.role === "admin" ? "Edit Hospital Profile" : "Edit Profile"
  );

  const [addGatewayModal, setAddGatewayModal] = useState(false);
  const [confifmModal, setConfirmModal] = useState(false);

  const [animationKey, setAnimationKey] = useState(0);

  const handleMenuChange = (menu: string, callback?: () => void) => {
    setAnimationKey((prev) => prev + 1);
    setState(menu);
    if (callback) callback();
  };

  return (
    <MainLayout title="Settings" state="Settings">
      <div className="h-full mb-5 mt-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-row gap-10 bg-white rounded-xl w-full h-full shadow-[0px_4px_4px_rgba(0,0,0,0.3)] p-8">
            <div className="flex flex-col w-3xs gap-4">
              {user?.role === "admin" && (
                <>
                  <MenuSettings
                    title="Hospital Profile"
                    icon={hospitalIcon}
                    isActive={state === "Edit Hospital Profile"}
                    onClick={() => handleMenuChange("Edit Hospital Profile")}
                  />
                </>
              )}
              <MenuSettings
                title="Profile"
                icon={profileIcon}
                isActive={state === "Edit Profile"}
                onClick={() => handleMenuChange("Edit Profile")}
              />
              <MenuSettings
                title="Password"
                icon={passwordIcon}
                isActive={state === "Password"}
                onClick={() => handleMenuChange("Password")}
              />
              <MenuSettings
                title="Gateways"
                icon={gatewayIcon}
                isActive={state === "Gateways"}
                onClick={() => handleMenuChange("Gateways")}
              />
            </div>
            <div className="w-full p-2">
              <MenuItems
                state={state}
                animationKey={animationKey}
                setAddGatewayModal={setAddGatewayModal}
                setConfirmModal={setConfirmModal}
              />
            </div>
          </div>
        </div>
        <AddGatewayModal
          isActive={addGatewayModal}
          setInactive={() => setAddGatewayModal(false)}
        />
        <ConfirmChangeSettingModal
          isActive={confifmModal}
          setInactive={() => setConfirmModal(false)}
        />
      </div>
    </MainLayout>
  );
};
export default SettingsPage;
