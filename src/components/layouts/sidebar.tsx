import {
  BedSingle,
  ChevronLeft,
  ChevronRight,
  Lamp,
  LogOut,
  MapPin,
  ScrollText,
  Settings,
  SquareActivity,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import AppSidebar from "../ui/app-sidebar";

import elitechLogo from "@/assets/imgs/Logo Elitech.png";
import doctorImg from "@/assets/imgs/doctor-img.png";
import gatewayIcon from "@/assets/icons/gateway-icon.png";
import gatewayIconWhite from "@/assets/icons/gateway-icon-white.png";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

interface SidebarProps {
  state: string;
  cannotHide?: boolean;
}

const Sidebar = ({ state, cannotHide }: SidebarProps) => {
  const { user, logout } = useAuth();
  const [isHide, setIsHide] = useState(false);

  return (
    <div
      className={`relative flex flex-col bg-white rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] h-full justify-between transition-all duration-300 ${
        isHide ? "w-20 pt-10" : "w-72"
      }`}
    >
      {/* Toggle button di samping kanan sidebar */}
      <button
        onClick={() => setIsHide(!isHide)}
        className={`absolute top-1/20 -right-3 transform -translate-y-1/2 
                   bg-white border shadow rounded-full w-8 h-8 items-center justify-center  ${
                     cannotHide ? "hidden" : "flex"
                   } `}
      >
        {isHide ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>

      {/* Logo */}
      <div className="flex flex-row items-center justify-center py-4">
        {!isHide && (
          <img
            src={elitechLogo}
            className="w-40 object-contain cursor-pointer pt-4"
          />
        )}
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-4 px-4 py-2 h-3/4 overflow-y-auto">
        <div className="flex flex-col gap-1">
          {!isHide && <p className="text-gray-500 text-sm">Dashboard</p>}
          <div className="flex flex-col gap-1 w-full">
            <AppSidebar
              icon={<SquareActivity className="w-5 h-5" />}
              title={!isHide ? "Patient Monitor" : ""}
              isActive={state === "Patient Monitor"}
              url="/patient-monitor"
              isHide={isHide}
            />
          </div>
        </div>

        {/* Measurement */}
        <div className="flex flex-col gap-1">
          {!isHide && <p className="text-gray-500 text-sm">Measurement</p>}
          <div className="flex flex-col gap-1 w-full">
            <AppSidebar
              icon={<Stethoscope />}
              title={!isHide ? "Measurement" : ""}
              isActive={state === "Measurement"}
              url="/measurement"
              isHide={isHide}
            />
            <AppSidebar
              icon={<ScrollText />}
              title={!isHide ? "Measurement Histories" : ""}
              isActive={state === "Measurement Histories"}
              url="/measurement-histories"
              isHide={isHide}
            />
          </div>
        </div>

        {/* Master Data */}
        <div className="flex flex-col gap-1">
          {!isHide && <p className="text-gray-500 text-sm">Master Data</p>}
          <div className="flex flex-col gap-1 w-full">
            <AppSidebar
              icon={<UsersRound />}
              title={!isHide ? "Patients" : ""}
              isActive={state === "Patients"}
              url="/patients"
              isHide={isHide}
            />
            <AppSidebar
              icon={<MapPin />}
              title={!isHide ? "Rooms Management" : ""}
              isActive={state === "Rooms"}
              url="/rooms"
              isHide={isHide}
            />
          </div>
        </div>

        {/* Hardware */}
        <div className="flex flex-col gap-1">
          {!isHide && <p className="text-gray-500 text-sm">Hardware</p>}
          <div className="flex flex-col gap-1 w-full">
            <AppSidebar
              icon={<Lamp />}
              title={!isHide ? "Devices" : ""}
              isActive={state === "Devices"}
              url="/devices"
              isHide={isHide}
            />
            <AppSidebar
              icon={gatewayIconWhite}
              iconInactive={gatewayIcon}
              title={!isHide ? "Gateways" : ""}
              isActive={state === "Gateways"}
              url="/gateways"
              isHide={isHide}
            />
          </div>
        </div>

        {/* Administration */}
        <div className="flex flex-col gap-1">
          {!isHide && <p className="text-gray-500 text-sm">Administration</p>}
          <div className="flex flex-col gap-1 w-full">
            {user?.role === "admin" && (
              <AppSidebar
                icon={<UsersRound />}
                title={!isHide ? "Users management" : ""}
                isActive={state === "Users"}
                url="/users"
                isHide={isHide}
              />
            )}
          </div>
        </div>

        {/* Tools */}
        <div className="flex flex-col gap-1 mt-4">
          {!isHide && <p className="text-gray-500 text-sm">Tools</p>}
          <div className="flex flex-col gap-2 w-full">
            <AppSidebar
              icon={<Settings />}
              title={!isHide ? "Settings" : ""}
              isActive={state === "Settings"}
              url="/settings"
              isHide={isHide}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-row m-2 p-4 rounded-xl bg-gradient-to-b from-[#6e79f4] to-[#4956F4] text-white relative h-1/4">
        {!isHide && (
          <>
            <img
              src={doctorImg}
              alt=""
              className="absolute bottom-0 right-0 z-20 h-full"
            />
            <div className="flex flex-col justify-between relative z-30">
              <div className="flex flex-col font-bold">
                <p className="font-semibold">Hello ,</p>
                <p className="text-xl w-40">{user?.name ? user?.name : "--"}</p>
              </div>

              <div className="flex flex-col font-bold gap-2">
                <div
                  className="flex flex-row gap-2 cursor-pointer bg-red-500 rounded-2xl px-4 py-2 w-fit"
                  onClick={logout}
                >
                  <LogOut />
                  <p>Log out</p>
                </div>
              </div>
            </div>
          </>
        )}
        {/* {isHide && (
          <div
            className="flex flex-row gap-2 cursor-pointer bg-red-500 rounded-2xl px-2 py-2 w-full justify-center items-center"
            onClick={logout}
          >
            <LogOut />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Sidebar;
