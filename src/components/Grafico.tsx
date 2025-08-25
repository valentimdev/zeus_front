import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ChartContainer } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { useMemo, useState,useEffect } from 'react';
import comprasService from '@/services/comprasService';


const dadosTodasCompras = comprasService.getCompras();
const chartConfig = {
  semana_1: {
    label: 'Primeira Semana',
  },
  semana_2: {
    label: 'Segunda Semana',

  },
  semana_3: {
    label: 'Terceira Semana',
  },
  semana_4: {
    label: 'Quarta Semana',
  },
} satisfies ChartConfig;

export function Grafico() {

  const [monthlyData, setMonthlyData] = useState<{ month: string; total: number }[]>([]);
  const chartData = useMemo(() => {
    const data = [];
    const today = new Date();

    for (let i = 2; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);

      const monthName = date.toLocaleString('pt-BR', { month: 'long' });


      data.push({
        month: monthName,
        semana_1: Math.floor(Math.random() * 300) + 50,
        semana_2: Math.floor(Math.random() * 200) + 50,
        semana_3: Math.floor(Math.random() * 150) + 30,
        semana_4: Math.floor(Math.random() * 100) + 20,
      });
    }
    return data;
  }, []);
  return (
    <div className="flex flex-col w-full max-w-lg ">
      <ChartContainer
        config={chartConfig}
        className="border border-black-500 min-h-[200px] w-full aspect-video"
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
