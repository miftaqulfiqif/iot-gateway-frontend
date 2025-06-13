"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import heartBeatImg from "@/assets/imgs/hear-beat.png";

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

export default function ChartDopplerRealtime({ chartData }: Props) {
  React.useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <Card className="w-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Heart Rate</CardTitle>
        <img src={heartBeatImg} alt="Heart Beat" className="w-20" />
      </CardHeader>
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
