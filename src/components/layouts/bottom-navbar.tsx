import {
  SquareActivity,
  Stethoscope,
  ScrollText,
  UsersRound,
  MapPin,
  Lamp,
  Settings,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import gatewayIcon from "@/assets/icons/gateway-icon.png";
import gatewayIconWhite from "@/assets/icons/gateway-icon-white.png";

const BottomNavbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const menus = [
    {
      title: "Central Monitoring",
      icon: <SquareActivity className="w-5 h-5" />,
      url: "/patient-monitor",
    },
    {
      title: "Measurement",
      icon: <Stethoscope className="w-5 h-5" />,
      url: "/measurement",
    },
    {
      title: "Histories Measurement",
      icon: <ScrollText className="w-5 h-5" />,
      url: "/measurement-histories",
    },
    {
      title: "Patients",
      icon: <UsersRound className="w-5 h-5" />,
      url: "/patients",
    },
    {
      title: "Rooms",
      icon: <MapPin className="w-5 h-5" />,
      url: "/rooms",
    },
    {
      title: "Devices",
      icon: <Lamp className="w-5 h-5" />,
      url: "/devices",
    },
    {
      title: "Gateways",
      icon: (
        <img
          src={
            location.pathname === "/gateways" ? gatewayIconWhite : gatewayIcon
          }
          className="w-5 h-5"
        />
      ),
      url: "/gateways",
    },
    ...(user?.role === "admin"
      ? [
          {
            title: "Users",
            icon: <UsersRound className="w-5 h-5" />,
            url: "/users",
          },
        ]
      : []),
    {
      title: "Settings",
      icon: <Settings className="w-5 h-5" />,
      url: "/settings",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-2 z-50">
      {menus.map((menu) => (
        <Link
          key={menu.title}
          to={menu.url}
          className={`flex flex-col items-center ${
            location.pathname === menu.url ? "text-blue-600" : "text-gray-600"
          }`}
        >
          {menu.icon}
          <span className="text-[10px]">{menu.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavbar;
