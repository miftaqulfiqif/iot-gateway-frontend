import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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
    label: "Weight",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type ChartData = {
  weight: number;
};

type Props = {
  chartData: ChartData[];
};

export default function DigitProBabyRealtimeChart({ chartData }: Props) {
  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <Card className="shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 30,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="weight"
              type="natural"
              stroke="blue"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3, fill: "blue" }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
