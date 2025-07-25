import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect } from "react";

const chartConfig = {
  weight: {
    label: "Heart rate",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type ChartData = {
  heart_rate: number;
  timestamp: string;
};

type Props = {
  chartData: ChartData[];
};

export default function HistoriesDoppler({ chartData }: Props) {
  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <Card className="shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <CardContent>
        <ChartContainer config={chartConfig}>
          {chartData.length > 0 ? (
            <LineChart
              data={chartData}
              margin={{ top: 30, left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
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

              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />

              <Line
                dataKey="heart_rate"
                type="monotone"
                stroke="blue"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3, fill: "blue" }}
              />
            </LineChart>
          ) : (
            <p className="text-center text-muted-foreground h-full items-center justify-center flex">
              No data available
            </p>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
