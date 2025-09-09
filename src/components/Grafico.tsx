import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { useState, useEffect } from 'react';

/**
 * @constant {ChartConfig} chartConfig
 * The configuration for the chart, defining the labels for each week.
 */
const chartConfig = {
  semana_1: { label: 'Primeira Semana' },
  semana_2: { label: 'Segunda Semana' },
  semana_3: { label: 'Terceira Semana' },
  semana_4: { label: 'Quarta Semana' },
} satisfies ChartConfig;

/**
 * A component that displays a bar chart of purchases over the last 3 months, broken down by week.
 * @param {object} props - The component props.
 * @param {any[]} props.compras - An array of purchase objects.
 * @returns {JSX.Element} The rendered Grafico component.
 */
interface Compra {
  id: string | number;
  _id: string | number;
  categoria: string;
  valorPago: number;
  data: string;
}

export function Grafico({ compras }: { compras: Compra[] }) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (!compras || compras.length === 0) return;

    const today = new Date();
    const meses = [];
    for (let i = 2; i >= 0; i--) {
      const date = new Date(
        Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - i, 1)
      );
      const month = date.getUTCMonth();
      const year = date.getUTCFullYear();
      const monthName = date.toLocaleString('pt-BR', {
        month: 'long',
        timeZone: 'UTC',
      });

      const comprasDoMes = compras.filter((compra: any) => {
        const dataCompra = new Date(compra.data);
        return (
          dataCompra.getUTCMonth() === month &&
          dataCompra.getUTCFullYear() === year
        );
      });

      const semanas = [0, 0, 0, 0];
      comprasDoMes.forEach((compra: any) => {
        const dia = new Date(compra.data).getUTCDate();
        if (dia <= 7) semanas[0] += Number(compra.valorPago);
        else if (dia <= 14) semanas[1] += Number(compra.valorPago);
        else if (dia <= 21) semanas[2] += Number(compra.valorPago);
        else semanas[3] += Number(compra.valorPago);
      });

      meses.push({
        month: monthName,
        semana_1: semanas[0],
        semana_2: semanas[1],
        semana_3: semanas[2],
        semana_4: semanas[3],
      });
    }
    setChartData(meses);
  }, [compras]);

  return (
    <div className="flex flex-col w-full ">
      <ChartContainer
        config={chartConfig}
        className=" min-h-[200px] w-full aspect-video"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="semana_1" fill="var(--chart-1)" radius={4} />
          <Bar dataKey="semana_2" fill="var(--chart-2)" radius={4} />
          <Bar dataKey="semana_3" fill="var(--chart-3)" radius={4} />
          <Bar dataKey="semana_4" fill="var(--chart-4)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
