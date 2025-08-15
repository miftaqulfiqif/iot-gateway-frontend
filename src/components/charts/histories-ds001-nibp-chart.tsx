"use client";

import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartConfig = {
  systolic: {
    label: "Systolic",
    color: "red",
  },
  diastolic: {
    label: "Diastolic",
    color: "blue",
  },
  map: {
    label: "MAP",
    color: "green",
  },
  pulse_rate: {
    label: "Pulse Rate",
    color: "yellow",
  },
} satisfies ChartConfig;

type ChartData = {
  systolic: number;
  diastolic: number;
  map: number;
  pulse_rate: number;
  recorded_at: string;
};

type Props = {
  chartData: ChartData[];
};

export function HistoriesDs001NibpChart({ chartData }: Props) {
  return (
    <Card className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] h-full">
      <CardContent>
        <CardHeader>
          <CardTitle>Chart NIBP</CardTitle>
        </CardHeader>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 16,
              right: 24,
              left: 24,
              bottom: 16,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            {/* X-Axis */}
            <XAxis
              dataKey="recorded_at"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
              }}
            />

            {/* Y-Axis with label */}
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />

            {/* Tooltip */}
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            {/* Legend */}
            <Legend verticalAlign="bottom" align="center" layout="horizontal" />

            {/* Garis-garis chart */}
            <Line
              dataKey="systolic"
              name={chartConfig.systolic.label}
              type="monotone"
              stroke={chartConfig.systolic.color}
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="diastolic"
              name={chartConfig.diastolic.label}
              type="monotone"
              stroke={chartConfig.diastolic.color}
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="map"
              name={chartConfig.map.label}
              type="monotone"
              stroke={chartConfig.map.color}
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="pulse_rate"
              name={chartConfig.pulse_rate.label}
              type="monotone"
              stroke={chartConfig.pulse_rate.color}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
