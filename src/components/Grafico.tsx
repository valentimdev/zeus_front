import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ChartContainer } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { useMemo } from 'react';


const chartConfig = {
  racao_x: {
    label: 'Racao X',
    color: '#2563eb',
  },
  racao_y: {
    label: 'Racao Y',
    color: '#60a5fa',
  },
  racao_z: {
    label: 'Racao Z',
    color: '#60a5fa',
  },
  Outros: {
    label: 'Outros',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export function Grafico() {
  const chartData = useMemo(() => {
    const data = [];
    const today = new Date(); 

    for (let i = 2; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);

      const monthName = date.toLocaleString('pt-BR', { month: 'long' });

      data.push({
        month: monthName,
        racao_x: Math.floor(Math.random() * 300) + 50,
        racao_y: Math.floor(Math.random() * 200) + 50,
        racao_z: Math.floor(Math.random() * 150) + 30,
        outros: Math.floor(Math.random() * 100) + 20,
      });
    }
    return data;
  }, []);
  return (
    <div className="flex flex-col w-full max-w-lg">
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
          <Bar dataKey="racao_x" fill="var(--color-racao_x)" radius={4} />
          <Bar dataKey="racao_y" fill="var(--color-racao_y)" radius={4} />
          <Bar dataKey="racao_z" fill="var(--color-racao_y)" radius={4} />
          <Bar dataKey="Outros" fill="var(--color-racao_y)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
