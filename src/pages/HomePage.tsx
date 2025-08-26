import { useEffect, useState } from 'react';
import { Grafico } from '../components/Grafico';
import Tabela from '../components/Tabela';
import TesteCard from '../components/TesteCard';

import resumoMes from '@/util/filterDates';
import { getCompras } from '@/services/comprasService';

// interface Racao {
//   _id: string;
//   nome: string;
//   marca: string;
//   pesoEmKg: number;
// }

export function HomePage() {
  // //Constante que ta guardando as rações em uma lista(vou usar no historico)
  // const [racoes, setRacoes] = useState<Racao[]>([]);
  // //Esse form data vai ser usado na hora de preencher o pop up do registrar ração
  // const [formData, setFormData] = useState({
  //   racao: '', // Vai armazenar o ID da ração selecionada
  //   valorPago: '',
  //   quantidadeComprada: '',
  //   data: new Date().toISOString().split('T')[0],
  // });

  const [mediaMes, setMediaMes] = useState<any | null>(null);
  useEffect(() => {
    const fetchResumo = async () => {
      const actualMonth = new Date().getMonth();
      const actualYear = new Date().getFullYear();
      // console.log('tipo da variavel mes->', typeof actualMonth);
      // console.log('variavel mes->', actualMonth);
      const requestResponse = await resumoMes(actualYear, actualMonth + 1);
      const teste = await resumoMes(2025, 8);
      // console.log('Resumo 2025/8:', teste);
      // console.log('Resposta ->', requestResponse);
      const valorMensal = requestResponse?.reduce(
        (accumulator, initialValue) => {
          const valor = initialValue.valorPago;
          // console.log('Valor=>', valor);
          return accumulator + valor;
        },
        0
      );
      console.log('Valor antes divisao mediaMes', valorMensal);

      const mediaValores = valorMensal / requestResponse.length;

      // console.log('Valor mensal', mediaValores);

      setMediaMes(mediaValores);
    };

    fetchResumo();
  }, []);

  const [mediaUltimos3Meses, setMediaUltimos3Meses] = useState<any | null>(
    null
  );

  useEffect(() => {
    const fetchMediaUltimos3Meses = async () => {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const requestResponse = await getCompras();
      console.log(requestResponse);
      console.log(startDate, endDate);
      const dados = requestResponse.data;
      const dadosFiltrados = dados.filter((compra: any) => {
        const dataCompra = new Date(compra.data);
        return dataCompra >= startDate && dataCompra <= endDate;
      });
      console.log('raw', requestResponse.data);
      console.log('filtragem', dadosFiltrados);
      const valorFinal = dadosFiltrados?.reduce(
        (accumulator, initialValue) => {
          const valorIterado = initialValue.valorPago;
          console.log('Valor=>', valorIterado);
          return accumulator + valorIterado;
        },
        0
      );
      // let valorFinal = 0;
      // dadosFiltrados.forEach((item) => {
      //   const valorNumerico = parseFloat(item.valorPago || 0);

      //   valorFinal += valorNumerico;
      // });
      console.log('Valor pre divisão', valorFinal);
      console.log('Tamanho array', dadosFiltrados.length);
      setMediaUltimos3Meses(valorFinal / dadosFiltrados.length);
    };

    fetchMediaUltimos3Meses();
  }, []);

  return (
    <div className="flex flex-col items-center h-full w-[70%] gap-[20px] ">
      <div className="flex flex-col w-full max-w-5xl gap-[30px]">
        <div className="flex gap-[20px] w-full max-w-5xl border border-black-200">
          <div className="flex flex-col flex-1 w-full">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Ola, Felipe
            </h3>
            <Grafico  />
          </div>
          <div className="flex flex-col mx-auto w-[25%] border border black-200 ">
            <TesteCard
              title="Resumo do mês"
              descricao="+10% em relação a Julho"
              conteudo={`R$${(mediaMes || 0).toFixed(2)}`}
            />
            {/* <TesteCard
              title="Ração mais barata"
              descricao="Pedigree 15kg"
              conteudo="$15,50"
            /> */}
                        <TesteCard
              title="Média de gastos"
              descricao="Baseado nos ultimos 3 meses"
              conteudo={`R$${(mediaUltimos3Meses || 0).toFixed(2)}`}
            />
                                    <TesteCard
              title="Média de gastos"
              descricao="Baseado nos ultimos x meses"
              conteudo={`R$${(mediaUltimos3Meses || 0).toFixed(2)}`}
            />
          </div>
          {/* <div className="flex flex-col w-[200px] border border black-200">
            <TesteCard
              title="Ração mais barata"
              descricao="Pedigree 15kg"
              conteudo="$15,50"
            />
            <TesteCard
              title="Média de gastos"
              descricao="Baseado nos ultimos x meses"
              conteudo={`R$${(mediaUltimos3Meses || 0).toFixed(2)}`}
            />
          </div> */}
        </div>
        <Tabela />
      </div>
    </div>
  );
}
export default HomePage;
