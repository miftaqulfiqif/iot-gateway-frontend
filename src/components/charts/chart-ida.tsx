"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartConfig = {
  mother_weight: {
    label: "Mother",
    color: "hsl(var(--chart-1))",
  },
  baby_weight: {
    label: "Baby",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type ChartData = {
  weight_mother: number;
  weight_child: number;
  timestamp: string;
};

type Props = {
  chartData: ChartData[];
};

export function HistoriesDigitProIda({ chartData }: Props) {
  return (
    <Card className="shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                });
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="weight_mother"
              type="monotone"
              stroke="#3062E5"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="weight_child"
              type="monotone"
              stroke="#94c4f7"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
