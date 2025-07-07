import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  className?: string;
};

type HeartbeatData = {
  time: number;
  bpm: number;
};

const generateBPM = (prev: number): number => {
  const fluctuation = Math.random() * 10 - 5;
  let newBPM = prev + fluctuation;
  return Math.max(60, Math.min(120, Math.round(newBPM))); // Normal range
};

export const HeartPulseChart: React.FC<Props> = ({ className }) => {
  const [data, setData] = useState<HeartbeatData[]>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const latest = prev[prev.length - 1]?.bpm ?? 80;
        const newData = [...prev, { time, bpm: generateBPM(latest) }];
        if (newData.length > 20) newData.shift();
        return newData;
      });
      setTime((prev) => prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div
      className={`w-full h-40 bg-white py-2 rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${className}`}
    >
      <p className="pl-4 my-1">Heart Pulse</p>
      <ResponsiveContainer width="100%" height="95%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="time" className="hidden" />
          <YAxis domain={[60, 120]} className="text-xs" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="bpm"
            stroke="#ff4d4f"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
