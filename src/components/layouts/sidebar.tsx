import {
  BedSingle,
  HomeIcon,
  Lamp,
  LogOut,
  LogOutIcon,
  ScrollText,
  Settings,
  SquareActivity,
  Stethoscope,
  User2,
  UserRound,
  UsersRound,
} from "lucide-react";
import AppSidebar from "../ui/app-sidebar";

import elitechLogo from "@/assets/imgs/Logo Elitech.png";
import doctorImg from "@/assets/imgs/doctor-img.png";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

interface SidebarProps {
  state: string;
}

const Sidebar = ({ state }: SidebarProps) => {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)]  w-72 h-full justify-between">
      <div className="flex flex-col gap-6 px-8 py-5">
        <div className="flex flex-row items-center gap-2">
          <img
            src={elitechLogo}
            className="w-40 object-contain mx-auto my-auto mt-2 cursor-pointer"
          />
          {/* <p className="font-bold text-xl">Elitech</p> */}
        </div>
        <div className="flex flex-col gap-4">
          <p>Menu</p>
          <div className="flex flex-col gap-2 w-full">
            {/* <AppSidebar
              icon={<HomeIcon />}
              title="Dashboard"
              isActive={state === "Dashboard"}
              url="/"
            /> */}
            <AppSidebar
              icon={<Stethoscope />}
              title="Measurement"
              isActive={state === "Measurement"}
              url="/measurement"
            />
            <AppSidebar
              icon={<SquareActivity />}
              title="Patient Monitor"
              isActive={state === "Patient Monitor"}
              url="/patient-monitor"
            />
            <AppSidebar
              icon={<Lamp />}
              title="Devices"
              isActive={state === "Devices"}
              url="/devices"
            />
            <AppSidebar
              icon={<UsersRound />}
              title="Patients"
              isActive={state === "Patients"}
              url="/patients"
            />
            <AppSidebar
              icon={<BedSingle />}
              title="Rooms"
              isActive={state === "Rooms"}
              url="/rooms"
            />
            <AppSidebar
              icon={<ScrollText />}
              title="Measurement Histories"
              isActive={state === "Measurement Histories"}
              url="/measurement-histories"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p>Tools</p>
          <div className="flex flex-col gap-2 w-full">
            <AppSidebar
              icon={<Settings />}
              title="Settings"
              isActive={state === "Settings"}
              url="/settings"
            />
            <AppSidebar
              icon={<UsersRound />}
              title="Users management"
              isActive={state === "Users"}
              url="/users"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row m-2 p-6 rounded-xl bg-gradient-to-b from-[#6e79f4] to-[#4956F4] text-white relative h-60">
        <img
          src={doctorImg}
          alt=""
          className="absolute bottom-0 right-0 z-20 h-60"
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col font-bold">
            <p className="font-semibold">Hello ,</p>
            <p className="text-xl w-40">
              {user?.name ? user?.name : "Miftaqul Fiqi Firmansyah"}
            </p>
          </div>

          <div className="flex flex-col font-bold gap-2">
            {/* <div className="flex flex-col font-normal border h-fit w-40 p-2 rounded-xl">
              <p>Gateway name</p>
            </div> */}
            <div
              className="flex flex-row gap-2 cursor-pointer  bg-red-500  rounded-2xl px-4 py-2 w-fit"
              onClick={logout}
            >
              <LogOut />
              <p>Log out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
