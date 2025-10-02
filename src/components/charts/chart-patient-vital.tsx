"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import heartBeatImg from "@/assets/imgs/hear-beat.png";
import { Activity, Weight } from "lucide-react";

const chartConfig = {
  heart_rate: {
    label: "Heart rate",
    color: "red",
  },
} satisfies ChartConfig;

type ChartData = {
  heart_rate: number;
};

type Props = {
  chartData: ChartData[];
};

export default function ChartPatientVital({ chartData }: Props) {
  React.useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <Card className="w-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="px-6 flex items-center">
        <Activity className="mr-2" />
        <p className="font-bold text-2xl">Today's Vitals</p>
      </div>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                <stop offset="95%" stopColor="red" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="timestamp"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              interval="preserveStartEnd"
              tickFormatter={(value: string) => {
                const date = new Date(value);
                return date.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                });
              }}
            />
            <YAxis
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value: number) => `${value} bpm`}
            />
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Data #${Number(value) + 1}`}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="heart_rate"
              type="natural"
              fill="url(#fillRed)"
              stroke="red"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
