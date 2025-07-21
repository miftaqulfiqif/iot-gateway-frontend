import { useEffect, useState } from "react";
import { Bluetooth, EthernetPort, Key, LandPlot, Wifi } from "lucide-react";
import { InputSelect } from "../ui/input-select";
import { useToast } from "@/context/ToastContext";

type Props = {
  isActive: boolean;
  setInactive: () => void;
};

export const SettingTcpIpDeviceModal = ({ isActive, setInactive }: Props) => {
  const { showToast } = useToast();
  const [duration, setDuration] = useState(1);

  const handleSubmit = () => {
    setInactive();
    showToast(null, `Device setting successfully ${duration} min`, "success");
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setInactive();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      onClick={setInactive}
      className={`fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 z-40 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-1/2 transform bg-white rounded-xl p-8 z-50 w-2xl h-fit transition-all duration-300 ease-in-out
        ${
          isActive
            ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
            : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
        }
      `}
      >
        <p className="font-semibold text-xl mb-2">Setting Device</p>
        <div className="flex flex-col gap-2">
          <InputSelect
            label="Select Duration"
            name="duration"
            placeholder="Select Duration"
            option={[
              { value: "1", label: "1 minute" },
              { value: "3", label: "3 minutes" },
              { value: "5", label: "5 minutes" },
              { value: "10", label: "10 minutes" },
              { value: "15", label: "15 minutes" },
              { value: "30", label: "30 minutes" },
            ]}
            value={String(duration)}
            onChange={(value) => setDuration(parseInt(value, 10))}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-400 mt-6"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
