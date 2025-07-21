import avatarIcon from "@/assets/icons/avatar.png";

import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";
import { Search } from "lucide-react";
import { SettingGateway } from "./gateway-setting";
import { useModal } from "@/context/ConifmModalContext";
import { useToast } from "@/context/ToastContext";
import { PasswordSetting } from "./password-setting";
import { UserProfileSetting } from "./user-profile-setting";
import { HospitalProfileSetting } from "./hospital-profile-setting";

const dummyCurrentGateway = {
  id: "GW001",
  name: "Gateway 1",
  description: "Gateway utama ruang IGD",
  status: "active",
};

const dummyGateways = [
  {
    id: "GW001",
    name: "Gateway 1",
    description: "Gateway utama ruang IGD",
    status: "active",
  },
  {
    id: "GW002",
    name: "Gateway 2",
    description: "Backup gateway ruang ICU",
    status: "inactive",
  },
  {
    id: "GW003",
    name: "Gateway 3",
    description: "Gateway rawat inap lantai 3",
    status: "active",
  },
  {
    id: "GW004",
    name: "Gateway 4",
    description: "Gateway untuk keperluan lab & diagnostik",
    status: "maintenance",
  },
  {
    id: "GW005",
    name: "Gateway 4",
    description: "Gateway untuk keperluan lab & diagnostik",
    status: "maintenance",
  },
  {
    id: "GW006",
    name: "Gateway 4",
    description: "Gateway untuk keperluan lab & diagnostik",
    status: "maintenance",
  },
  {
    id: "GW007",
    name: "Gateway 4",
    description: "Gateway untuk keperluan lab & diagnostik",
    status: "maintenance",
  },
  {
    id: "GW008",
    name: "Gateway 4",
    description: "Gateway untuk keperluan lab & diagnostik",
    status: "maintenance",
  },
];

type MenuItemsProps = {
  state: string;
  animationKey: number;
  setAddGatewayModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MenuItems = ({
  state,
  animationKey,
  setAddGatewayModal,
}: MenuItemsProps) => {
  // Gateways
  const [currentGateway, setCurrentGateway] = useState(dummyCurrentGateway);
  const [gateways, setGateways] = useState(dummyGateways);

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
      {/* Gateways */}
      {state === "Gateways" && (
        <SettingGateway
          setAddGatewayModal={setAddGatewayModal}
          setCurrentGateway={setCurrentGateway}
          currentGateway={currentGateway}
          gateways={gateways}
        />
      )}
    </div>
  );
};
