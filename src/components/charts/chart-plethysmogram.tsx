import React, { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

type PlethPoint = {
  time: number;
  value: number;
};

type Props = {
  width?: number;
  height?: number;
  pleth_data?: PlethPoint[];
};

const MAX_POINTS = 1000;

const PlethysmogramChart: React.FC<Props> = ({
  width = 760,
  height = 120,
  pleth_data = [],
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const uplotRef = useRef<uPlot | null>(null);

  // Update chart saat pleth_data berubah
  useEffect(() => {
    if (!chartRef.current) return;

    const options: uPlot.Options = {
      width,
      height,
      legend: { show: false },
      scales: {
        x: { time: false },
        y: { auto: true },
      },
      axes: [
        { show: false }, // X axis disembunyikan
        { show: true }, // Y axis tampil
      ],
      series: [
        {},
        {
          label: "Pleth",
          stroke: "red",
          width: 1.5, // lebih tipis biar halus
          spanGaps: true, // sambungkan titik walau ada gap
        },
      ],
    };

    // data awal kosong
    const data: uPlot.AlignedData = [[], []];
    const u = new uPlot(options, data, chartRef.current);
    uplotRef.current = u;

    return () => {
      u.destroy();
    };
  }, [width, height]);

  // Render ulang data ke chart
  useEffect(() => {
    if (!uplotRef.current || !pleth_data) return;

    // mapping data dari {time, value} → [x[], y[]]
    const x = pleth_data.map((p) => p.time).slice(-MAX_POINTS);
    const y = pleth_data.map((p) => p.value).slice(-MAX_POINTS);

    // pastikan urut
    const sorted = x.map((_, i) => [x[i], y[i]]).sort((a, b) => a[0] - b[0]);

    uplotRef.current.setData([
      sorted.map((p) => p[0]), // x
      sorted.map((p) => p[1]), // y
    ]);
  }, [pleth_data]);

  return <div ref={chartRef} />;
};

export default PlethysmogramChart;
