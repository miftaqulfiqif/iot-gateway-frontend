import React, { useEffect, useMemo } from "react";

type BMIRangeBarProps = {
  value: number;
  onChangeValue: (info: { label: string; color: string }) => void;
};

const BMIRangeBar: React.FC<BMIRangeBarProps> = ({ value, onChangeValue }) => {
  useEffect(() => {}, []);
  const min = 15;
  const max = 35;

  const bmiRanges = [
    { label: "Slim", color: "bg-blue-300 text-blue-900", from: 15, to: 18.5 },
    {
      label: "Healthy",
      color: "bg-green-300 text-green-900",
      from: 18.5,
      to: 23,
    },
    {
      label: "Over",
      color: "bg-yellow-300 text-yellow-900",
      from: 23,
      to: 27.5,
    },
    { label: "Obese", color: "bg-red-300 text-red-900", from: 27.5, to: 35 },
  ];

  const clamp = (val: number) => Math.min(Math.max(val, min), max);
  const clampedValue = clamp(value);
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  const getBMICategory = (val: number) => {
    for (const range of bmiRanges) {
      if (
        val >= range.from &&
        (val < range.to || (range.to === max && val <= max))
      ) {
        return range;
      }
    }
    return bmiRanges[bmiRanges.length - 1];
  };

  const category = useMemo(() => getBMICategory(clampedValue), [clampedValue]);

  useEffect(() => {
    onChangeValue(category);
  }, [category, onChangeValue]);

  return (
    <div className="relative w-full px-4 mt-4">
      {/* Bubble */}
      <div
        className="absolute -top-8"
        style={{
          left:
            percentage <= 0
              ? "0%"
              : percentage >= 100
              ? "100%"
              : `${percentage}%`,
          transform:
            percentage <= 0
              ? "translateX(0%)"
              : percentage >= 100
              ? "translateX(-100%)"
              : "translateX(-50%)",
        }}
      >
        <div
          className={`${category.color} px-2 py-1 rounded-md shadow text-sm relative`}
        >
          {value.toFixed(1)}
          <div
            className={`absolute w-2 h-2 ${category.color} rotate-45 -bottom-1 left-1/2 -translate-x-1/2`}
          />
        </div>
      </div>

      {/* Bar */}
      <div className="flex h-4 rounded overflow-hidden shadow-inner mt-1 w-full">
        {bmiRanges.map((range) => {
          const width = ((range.to - range.from) / (max - min)) * 100;
          return (
            <div
              key={range.label}
              className={`${range.color} flex-shrink-0`}
              style={{ width: `${width}%` }}
            />
          );
        })}
      </div>

      {/* Tick labels */}
      <div className="relative w-full h-4 mt-1">
        {[15, 18.5, 23, 27.5, 35].map((tick) => {
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
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs">
        {bmiRanges.map((range) => (
          <div key={range.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 ${range.color} rounded`} />
            <span>{range.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BMIRangeBar;
