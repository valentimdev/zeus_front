import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ChartContainer } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { useMemo } from 'react';

const chartData = [
  { month: 'January', racao_x: 186, racao_y: 80 },
  { month: 'February', racao_x: 305, racao_y: 200 },
  { month: 'March', racao_x: 237, racao_y: 120 },
  { month: 'April', racao_x: 73, racao_y: 190 },
  { month: 'May', racao_x: 209, racao_y: 130 },
  { month: 'June', racao_x: 214, racao_y: 140 },
];

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
  // Gera dinamicamente os dados para os últimos 6 meses
  const chartData = useMemo(() => {
    const data = [];
    const today = new Date(); // Pega a data atual

    // Loop para os últimos 6 meses (de 5 meses atrás até o mês atual)
    for (let i = 3; i >= 0; i--) {
      // Cria uma data para cada um dos últimos 6 meses
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);

      // Formata o nome do mês (ex: "Agosto", "Julho")
      const monthName = date.toLocaleString('pt-BR', { month: 'long' });

      // Adiciona os dados ao array (usando valores aleatórios como exemplo)
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
