import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

interface FitnessMetricSectionProps {
  icon: ReactNode;
  label: string;
  percentage: number | string;
  statusLabel?: string;
  statusColor?: string;
  children?: ReactNode;
}

export const FitnessMetricSection = ({
  icon,
  label,
  percentage,
  statusLabel,
  statusColor,
  children,
}: FitnessMetricSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full px-2 text-sm">
      {/* Header */}
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row gap-4 items-center">
          {icon}
          <p>{label}</p>
        </div>

        <div className="ml-8 flex flex-row gap-9 items-center justify-between">
          <p className="font-semibold bg-gray-200 w-15 text-center px-3 py-2 rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            {percentage}
          </p>
          <p
            className={`px-4 py-1 ${statusColor} text-black rounded-full w-30 text-center`}
          >
            {statusLabel}
          </p>
          <ChevronDown
            className={`w-6 h-6 cursor-pointer transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </div>

      {/* Animated Dropdown */}
      <div
        className={`transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 max-h-96"
            : "opacity-0 scale-y-0 max-h-0 pointer-events-none"
        } overflow-hidden`}
      >
        <div className="flex flex-col gap-6 mt-8">{children}</div>
      </div>
    </div>
  );
};
