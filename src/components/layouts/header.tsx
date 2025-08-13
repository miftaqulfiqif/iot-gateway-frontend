import { useAuth } from "@/context/AuthContext";
import { Bell, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gatewayIcon from "@/assets/icons/gateway-icon.png";
import { SetCurrentGateway } from "../dropdown/header-set-current-gateway";
import { useGateway } from "@/hooks/api/use-gateway";

interface NavbarProps {
  className?: string;
  title: string;
}

const dummyGateways = [
  { id: "gw-001", name: "Gateway 001" },
  { id: "gw-002", name: "Gateway 002" },
  { id: "gw-003", name: "Gateway 003" },
  { id: "gw-004", name: "Gateway 004" },
  { id: "gw-005", name: "Gateway 005" },
  { id: "gw-006", name: "Gateway 006" },
  { id: "gw-007", name: "Gateway 007" },
  { id: "gw-008", name: "Gateway 008" },
  { id: "gw-009", name: "Gateway 009" },
  { id: "gw-010", name: "Gateway 010" },
];

export const Header = ({ className, title }: NavbarProps) => {
  const { user } = useAuth();
  const {
    selectedGateway,
    setSelectedGateway,
    getGateways,
    gateways,
    query,
    setQuery,
    changeGateway,
  } = useGateway();

  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");

  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [tempSelectedGateway, setTempSelectedGateway] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // fetch gateway when dropdown isOpen
  useEffect(() => {
    if (isOpen) getGateways();
  }, [isOpen, query]);

  // Save selectedGateway to localStorage when it change
  useEffect(() => {
    if (selectedGateway) {
      localStorage.setItem("current_gateway", JSON.stringify(selectedGateway));
    }
  }, [selectedGateway]);

  useEffect(() => {
    setState(title);
  }, [title]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsMounted(false), 300);
    }
  }, [isOpen]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dialog = document.querySelector("[data-alert-dialog-content]");

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(dialog && dialog.contains(event.target as Node))
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`h-30 flex items-center ${className}`}>
      <div className="flex flex-row justify-between w-full mx-10">
        <div className="flex flex-row items-center">
          <p className="text-3xl font-bold">{state}</p>
        </div>
        <div className="flex flex-row gap-4 items-center">
          {/* Current Gateway */}
          <div ref={dropdownRef} className="relative">
            <div
              className="flex bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full px-4 py-2 items-center justify-between cursor-pointer w-70"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex gap-4 items-center">
                <img src={gatewayIcon} alt="" className="w-8 h-8" />
                <div className="flex flex-col">
                  <p className="font-bold">
                    {selectedGateway.name
                      ? selectedGateway.name
                      : "Gateway Name"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedGateway.id ? selectedGateway.id : "Gateway ID"}
                  </p>
                </div>
              </div>
              <ChevronDown className="w-6 h-6" />
            </div>

            <SetCurrentGateway
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              currentGateway={selectedGateway}
              tempSelectedGateway={tempSelectedGateway}
              setTempSelectedGateway={setTempSelectedGateway}
              setCurrentGateway={setSelectedGateway}
              gateways={gateways}
              setQuery={setQuery}
              changeGateway={() => changeGateway(tempSelectedGateway)}
            />
          </div>

          {/* Notification */}
          <div className="bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full p-4 hover:bg-gray-100">
            <Bell />
          </div>

          {/* Current User */}
          <div className="flex flex-row gap-5 p-5 items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5UtRnIwPFHN2qIv5B3PP5cPMVbLKQYxd8j7eRCElLzErsAJCo4I1jEgAX2iQP-QFu1-M&usqp=CAU"
              alt=""
              className="w-18 h-18 rounded-full object-cover shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            />
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">
                {user?.name ? user.name : "--"}
              </p>
              <p className="text-gray-500 text-base">{user?.username}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
