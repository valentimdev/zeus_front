import { useEffect, useState } from 'react';
import { Grafico } from '../components/Grafico';
import Tabela from '../components/Tabela';
import TesteCard from '../components/TesteCard';

import resumoMes from '@/util/filterDates';
interface Racao {
  _id: string;
  nome: string;
  marca: string;
  pesoEmKg: number;
}

export function HomePage() {
  //Constante que ta guardando as rações em uma lista(vou usar no historico)
  const [racoes, setRacoes] = useState<Racao[]>([]);
  //Esse form data vai ser usado na hora de preencher o pop up do registrar ração
  const [formData, setFormData] = useState({
    racao: '', // Vai armazenar o ID da ração selecionada
    valorPago: '',
    quantidadeComprada: '',
    data: new Date().toISOString().split('T')[0],
  });

  const [mediaMes, setMediaMes] = useState<any | null>(null);

  useEffect(() => {
    const fetchResumo = async () => {
      const actualMonth = new Date().getMonth();
      const actualYear = new Date().getFullYear();

      const requestResponse = await resumoMes(actualYear, actualMonth);
      console.log('Resposta ->', requestResponse);
      const valorMensal = requestResponse?.reduce(
        (accumulator, initialValue) => {
          const valor = initialValue.valorPago;
          return accumulator + valor;
        },
        0
      );

      const mediaValores = valorMensal / requestResponse.length

      // console.log('Valor mensal', mediaValores)

      setMediaMes(mediaValores);
    };

    fetchResumo();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-[20px] ">
      <div className="flex flex-col w-full max-w-5xl gap-[30px]">
        <div className="flex gap-[20px] w-full max-w-5xl">
          <div className="flex flex-col flex-1 ">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Ola, Felipe
            </h3>
            <Grafico />
          </div>
          <div className="flex flex-col w-[200px] border border black-200">
            <TesteCard
              title="Resumo do mês"
              descricao="+10% em relação a Julho"
              conteudo={mediaMes}
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
