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
    label: "Weight",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type ChartData = {
  value: number;
  recorded_at: string;
};

type Props = {
  chartData: ChartData[];
};

export default function ChartPatientWeightTrend({ chartData }: Props) {
  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <Card className="w-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="px-6 flex items-center">
        <Weight className="mr-2" />
        <p className="font-bold text-2xl">Weight Trend</p>
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
                tickFormatter={(value: number) => `${value} Kg`}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="value"
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
