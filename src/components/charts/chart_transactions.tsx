import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Grafico de transacciones";

interface ChartTransactionsProps {
  totalIngresos: number;
  totalEgresos: number;
  totalMovimientos: number;
}

const chartConfig = {
  visitors: {
    label: "Amount",
  },
  ingresos: {
    label: "Ingresos",
    color: "#2662D9",
  },
  egresos: {
    label: "Egresos",
    color: "#E23670",
  },
} satisfies ChartConfig;

export function ChartTransactions({
  totalIngresos,
  totalEgresos,
  totalMovimientos,
}: ChartTransactionsProps) {
  const chartData = [
    { type: "Ingresos", amount: totalIngresos, fill: "var(--color-ingresos)" },
    { type: "Egresos", amount: totalEgresos, fill: "var(--color-egresos)" },
  ];

  return (
    <Card className="flex shadow-none border-none bg-transparent flex-col">
      
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                         className="dark:text-white"
                      > 
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="dark:fill-gray-200 fill-slate-700 text-3xl font-bold"
                        > ${" "}
                          {totalMovimientos.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="dark:fill-white"
                        >
                          Consolidado
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className=" flex-col gap-2 text-sm">
        <div className="dark:from-slate-400 dark:to-slate-700 flex items-center gap-2 font-medium leading-none">
          Datos actualizados del total de ingresos y egresos{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
        
        </div>
      </CardFooter>
    </Card>
  );
}
