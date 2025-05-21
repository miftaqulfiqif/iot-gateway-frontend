import React, { useEffect } from "react";

type FatRangeBarProps = {
  value: number;
  onChangeValue: (info: { label: string; color: string }) => void;
};

const FatRangeBar: React.FC<FatRangeBarProps> = ({ value, onChangeValue }) => {
  const min = 5;
  const max = 35;

  // Definisi kategori dan rentang nilai
  const bmiRanges = [
    { label: "Slim", color: "bg-blue-300 text-white", from: 5, to: 11 },
    { label: "Healthy", color: "bg-green-400 text-white", from: 11, to: 17 },
    { label: "Over", color: "bg-yellow-400 text-white", from: 17, to: 27 },
    { label: "Obese", color: "bg-red-500 text-white", from: 27, to: 35 },
  ];

  // Hitung persentase posisi nilai pengguna
  const clamp = (val: number) => Math.min(Math.max(val, min), max);
  const clampedValue = clamp(value);
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  // Cari label kategori berdasarkan nilai
  const category =
    bmiRanges.find(
      (range) => clampedValue >= range.from && clampedValue < range.to
    ) || bmiRanges[bmiRanges.length - 1];

  useEffect(() => {
    onChangeValue({ label: category.label, color: category.color });
  }, [category.label, category.color, onChangeValue]);

  return (
    <div className="relative w-full px-4 mt-4">
      {/* Label nilai dan kategori */}
      {/* <div className="flex items-center justify-between mb-2">
        <div
          className={`px-3 py-1 rounded-full text-white text-sm ${category.color}`}
        >
          {category.label}
        </div>
      </div> */}

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
        {bmiRanges.map((range) => {
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
      <div className="relative w-full h-4 mt-1">
        {[5, 11, 17, 27, 35].map((tick) => {
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
            <div className={`w-3 h-3 ${range.color} rounded`}></div>
            <span>{range.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FatRangeBar;
