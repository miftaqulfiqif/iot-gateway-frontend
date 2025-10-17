import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect } from "react";
import { Weight } from "lucide-react";

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type ChartData = {
  value: number;
  recorded_at: string;
};

type Props = {
  label: string;
  color: string;
  chartData: ChartData[];
};

export default function ChartBiaBodyComposition({
  label,
  color,
  chartData,
}: Props) {
  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <Card className="w-full">
      <div className="px-6 flex items-center">
        <p className="font-bold text-xl">{label}</p>
      </div>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          {chartData.length > 0 ? (
            <LineChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="recorded_at"
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                interval="preserveStartEnd"
                tickFormatter={(value: string) => {
                  const date = new Date(value);
                  return date.toISOString().slice(0, 10);
                }}
              />
              <YAxis
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                tickFormatter={(value: number) => `${value} Kg`}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="value"
                type="monotone"
                stroke={color}
                fill={color}
                dot={true}
                activeDot={{ r: 3, fill: `${color}` }}
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
