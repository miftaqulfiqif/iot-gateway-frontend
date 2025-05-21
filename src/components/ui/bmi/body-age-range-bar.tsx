import React, { useEffect } from "react";

type BodyAgeRangeBarProps = {
  value: number;
  currentAge: number;
  onChangeValue: (info: { label: string; color: string }) => void;
};

const BodyAgeRangeBar: React.FC<BodyAgeRangeBarProps> = ({
  value,
  currentAge,
  onChangeValue,
}) => {
  const min = 5;
  const max = 80;

  // Definisi kategori dan rentang nilai berdasarkan currentAge
  const bodyAgeRanges = [
    {
      label: "Young",
      color: "bg-blue-300 text-white",
      from: min,
      to: currentAge,
    },
    {
      label: "Normal",
      color: "bg-green-300 text-white",
      from: currentAge,
      to: currentAge + 1,
    },
    {
      label: "Older",
      color: "bg-yellow-400 text-white",
      from: currentAge + 1,
      to: currentAge + 6,
    },
    {
      label: "Over Older",
      color: "bg-red-400 text-white",
      from: currentAge + 6,
      to: max,
    },
  ];

  const tickValues = [bodyAgeRanges[0].from, ...bodyAgeRanges.map((r) => r.to)];

  // Clamp nilai agar dalam rentang bar
  const clamp = (val: number) => Math.min(Math.max(val, min), max);
  const clampedValue = clamp(value);
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  // Tentukan kategori berdasarkan nilai
  const category =
    bodyAgeRanges.find(
      (range) => clampedValue >= range.from && clampedValue < range.to
    ) || bodyAgeRanges[bodyAgeRanges.length - 1];

  useEffect(() => {
    onChangeValue({ label: category.label, color: category.color });
  }, [category.label, category.color, onChangeValue]);

  return (
    <div className="relative w-full px-4 mt-4">
      {/* Bubble */}
      <div
        className="absolute -top-8 transform -translate-x-1/2"
        style={{ left: `${percentage}%` }}
      >
        <div
          className={`${category.color} px-2 py-1 rounded-md shadow text-sm relative`}
        >
          {value.toFixed(1)}
          <div
            className={`absolute w-2 h-2 ${category.color} rotate-45 -bottom-1 left-1/2 -translate-x-1/2`}
          ></div>
        </div>
      </div>

      {/* Bar */}
      <div className="flex h-4 rounded overflow-hidden shadow-inner mt-1 w-full">
        {bodyAgeRanges.map((range) => {
          const width = ((range.to - range.from) / (max - min)) * 100;
          return (
            <div
              key={range.label}
              className={`${range.color} flex-shrink-0`}
              style={{ width: `${width}%` }}
            ></div>
          );
        })}
      </div>

      {/* Tick labels */}
      {/* <div className="relative w-full h-4 mt-1">
        {tickValues.map((tick) => {
          const leftPercent = ((tick - min) / (max - min)) * 100;
          return (
            <span
              key={tick}
              className="absolute text-xs text-gray-700 -translate-x-1/2"
              style={{ left: `${leftPercent}%` }}
            >
              {tick}
            </span>
          );
        })}
      </div> */}

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs">
        {bodyAgeRanges.map((range) => (
          <div key={range.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 ${range.color} rounded`}></div>
            <span>{range.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyAgeRangeBar;
