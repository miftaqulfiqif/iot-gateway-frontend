import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
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
  weight: { label: "Weight", color: "#4CAF50" },
  bmi: { label: "BMI", color: "#2196F3" },
  bodyFat: { label: "Body Fat", color: "#FF9800" },
  muscleMass: { label: "Muscle Mass", color: "#9C27B0" },
  water: { label: "Water", color: "#00BCD4" },
  visceralFat: { label: "Visceral Fat", color: "#795548" },
  boneMass: { label: "Bone Mass", color: "#3F51B5" },
  metabolism: { label: "Metabolism", color: "#F44336" },
  protein: { label: "Protein", color: "#8BC34A" },
  obesity: { label: "Obesity", color: "#E91E63" },
  bodyAge: { label: "Body Age", color: "#607D8B" },
  lbm: { label: "LBM", color: "#009688" },
} satisfies ChartConfig;

type ChartData = {
  weight: number;
  bmi: number;
  bodyFat: number;
  muscleMass: number;
  water: number;
  visceralFat: number;
  boneMass: number;
  metabolism: number;
  protein: number;
  obesity: number;
  bodyAge: number;
  lbm: number;
  timestamp: string;
};

const lineChartConfig: Record<string, { color: string }> = {
  weight: { color: "blue" },
  bmi: { color: "red" },
  bodyFat: { color: "green" },
  muscleMass: { color: "yellow" },
  water: { color: "orange" },
  visceralFat: { color: "purple" },
  boneMass: { color: "indigo" },
  metabolism: { color: "pink" },
  protein: { color: "green" },
  obesity: { color: "red" },
  bodyAge: { color: "blue" },
  lbm: { color: "yellow" },
};

type Props = {
  chartData: ChartData[];
  selectedVariables: string[];
};

export default function HistoriesDigitProBMI({
  chartData,
  selectedVariables,
}: Props) {
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

              <YAxis tickLine={false} axisLine={false} tickMargin={8} />

              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
                formatter={(value) =>
                  chartConfig[value as keyof typeof chartConfig]?.label || value
                }
              />

              {selectedVariables.map((v) =>
                lineChartConfig[v] ? (
                  <Line
                    key={v}
                    dataKey={v}
                    type="monotone"
                    stroke={lineChartConfig[v].color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3, fill: lineChartConfig[v].color }}
                  />
                ) : null
              )}
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
