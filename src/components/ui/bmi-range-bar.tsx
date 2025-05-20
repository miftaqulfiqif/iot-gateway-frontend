import React from "react";

type BMIRangeBarProps = {
  value: number;
};

const BMIRangeBar: React.FC<BMIRangeBarProps> = ({ value }) => {
  const min = 15;
  const max = 40;

  const percentage = ((value - min) / (max - min)) * 100;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="relative w-full max-w-lg px-4">
      {/* Bubble */}
      {/* <div
        className="absolute -top-8 left-0 transform -translate-x-1/2"
        style={{ left: `${clampedPercentage}%` }}
      >
        <div className="bg-gray-200 text-black px-2 py-1 rounded-md shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-sm relative">
          {value}
          <div className="absolute w-2 h-2 bg-gray-200 rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
      </div> */}

      {/* Colored bar */}
      <div className="flex h-4 rounded-sm overflow-hidden shadow-inner ">
        <div
          className="bg-blue-300"
          style={{ width: `${((18.5 - min) / (max - min)) * 100}%` }}
        ></div>
        <div
          className="bg-green-400"
          style={{ width: `${((25 - 18.5) / (max - min)) * 100}%` }}
        ></div>
        <div
          className="bg-yellow-400"
          style={{ width: `${((30 - 25) / (max - min)) * 100}%` }}
        ></div>
        <div
          className="bg-red-500"
          style={{ width: `${((max - 30) / (max - min)) * 100}%` }}
        ></div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-700 mt-1">
        <span>15</span>
        <span>18.5</span>
        <span>25</span>
        <span>30</span>
        <span>40</span>
      </div>

      {/* Legend */}
      <div className="flex flex-row justify-around mt-4 text-xs">
        <div className="flex flex-row items-center gap-2">
          <div className="w-3 h-3 bg-blue-300 rounded-xs"></div>
          <p>Underweight</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-xs"></div>
          <p>Normal</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-xs"></div>
          <p>Overweight</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-xs"></div>
          <p>Obese</p>
        </div>
      </div>
    </div>
  );
};

export default BMIRangeBar;
