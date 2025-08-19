import { Grafico } from '../components/Grafico';
import Tabela from '../components/Tabela';
import TesteCard from '../components/TesteCard';

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-[20px] ">
      <div className="flex flex-col w-full max-w-5xl gap-[30px]">
        <div className="flex gap-[20px] w-full max-w-5xl">
          <div className="flex flex-col flex-1 border border bg-amber-300">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Ola, Felipe
            </h3>
            <Grafico />
          </div>
          <div className="flex flex-col w-[200px] border border black-200">
            <TesteCard
              title="Resumo do mês"
              descricao="+10% em relação a Julho"
              conteudo="$180,95 gastos "
            />
            <TesteCard
              title="Ração mais barata"
              descricao="Pedigree 15kg"
              conteudo="$15,50"
            />
          </div>
          <div className="flex flex-col w-[200px] border border black-200">
            <TesteCard
              title="Ração mais barata"
              descricao="Pedigree 15kg"
              conteudo="$15,50"
            />
            <TesteCard
              title="Média de gastos"
              descricao="Baseado nos ultimos x meses"
              conteudo="$"
            />
          </div>
        </div>
        <Tabela />
      </div>
    </div>
  );
}
export default HomePage;
