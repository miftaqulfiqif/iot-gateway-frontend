import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Props = {
  className?: string;
};

type DataPoint = {
  time: number;
  value: number;
};

export const HeartbeatChart: React.FC<Props> = ({ className }) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  // Template pola EKG (1 detak)
  const basePattern: number[] = [
    0, 0, 0.5, 1, 0.3, -0.6, 0.1, 0, 0.2, -0.2, 0, 0, 0, 0,
  ];

  // Fungsi untuk membuat detak dengan variasi acak
  const generateRandomEKG = (startTime: number): DataPoint[] => {
    const peak = 1.2 + Math.random() * 0.4; // antara 1.2 - 1.6
    const valley = -0.4 - Math.random() * 0.3; // antara -0.4 - -0.7
    const variation = basePattern.map((val) => {
      if (val === 1) return peak;
      if (val === -0.6) return valley;
      return val + (Math.random() * 0.1 - 0.05); // variasi kecil
    });

    return variation.map((val, i) => ({
      time: startTime + i,
      value: parseFloat(val.toFixed(2)),
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newWave = generateRandomEKG(currentTime);
        const combined = [...prev, ...newWave];
        const maxLength = 100;
        return combined.slice(Math.max(combined.length - maxLength, 0));
      });

      setCurrentTime((prev) => prev + basePattern.length);
    }, 1000 + Math.random() * 300); // sedikit variasi jeda waktu

    return () => clearInterval(interval);
  }, [currentTime]);

  return (
    <div className={`w-full h-20 bg-black p-2 rounded-lg ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="time" hide />
          <YAxis domain={[-1, 2]} hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00ff00"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
