import { useEffect, useState } from 'react';
import { Grafico } from '../components/Grafico';
import Tabela from '../components/Tabela';
import TesteCard from '../components/TesteCard';
import { useOutletContext } from 'react-router-dom';
import resumoMes from '@/util/filterDates';

interface Compra {
  id: string | number;
  _id: string | number;
  categoria: string;
  valorPago: number;
  data: string;
}

interface ContextType {
  compras: Compra[];
  loading: boolean;
  error: string | null;
  handleDeleteCompra: (id: string | number) => void;
}

export function HomePage() {
  const { compras, loading, error, handleDeleteCompra } =
    useOutletContext<ContextType>();
  const [mediaMes, setMediaMes] = useState<number>(0);
  const [mediaUltimos3Meses, setMediaUltimos3Meses] = useState<number>(0);
  const [categoriaMaisComprada, setCategoriaMaisComprada] = useState('');
  const [descricaoResumoMes, setDescricaoResumoMes] = useState('');

  const categoriaMap: Record<string, string> = {
    SAUDE: 'Saúde',
    COMIDA: 'Comida',
    LAZER: 'Lazer',
  };

  useEffect(() => {
    if (!compras || compras.length === 0) {
      setMediaMes(0);
      setMediaUltimos3Meses(0);
      setCategoriaMaisComprada('Nenhuma');
      setDescricaoResumoMes('Sem dados');
      return;
    }

    const fetchResumo = async () => {
      const actualMonth = new Date().getMonth();
      const actualYear = new Date().getFullYear();
      const requestResponse = await resumoMes(actualYear, actualMonth + 1);
      if (requestResponse && requestResponse.length > 0) {
        const valorMensal = requestResponse.reduce(
          (accumulator: number, initialValue: Compra) =>
            accumulator + initialValue.valorPago,
          0
        );
        const mediaValores = valorMensal / requestResponse.length;
        setMediaMes(mediaValores);
      } else {
        setMediaMes(0);
      }
    };

    const fetchMediaUltimos3Meses = () => {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);

      const dadosFiltrados = compras.filter((compra: Compra) => {
        const dataCompra = new Date(compra.data);
        return dataCompra >= startDate && dataCompra <= endDate;
      });

      if (dadosFiltrados.length > 0) {
        const valorFinal = dadosFiltrados.reduce(
          (accumulator, initialValue) => accumulator + initialValue.valorPago,
          0
        );
        setMediaUltimos3Meses(valorFinal / dadosFiltrados.length);
      } else {
        setMediaUltimos3Meses(0);
      }
    };

    const calcularCategoriaMaisComprada = () => {
      const hoje = new Date();
      const mesAtual = hoje.getMonth();
      const anoAtual = hoje.getFullYear();

      const comprasDoMes = compras.filter((compra: Compra) => {
        const dataCompra = new Date(compra.data);
        return (
          dataCompra.getMonth() === mesAtual &&
          dataCompra.getFullYear() === anoAtual
        );
      });

      if (comprasDoMes.length === 0) {
        setCategoriaMaisComprada('Nenhuma');
        return;
      }

      const contagemCategorias = comprasDoMes.reduce((acc, compra) => {
        acc[compra.categoria] = (acc[compra.categoria] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const categoriaPrincipal = Object.keys(contagemCategorias).reduce(
        (a, b) => (contagemCategorias[a] > contagemCategorias[b] ? a : b)
      );

      setCategoriaMaisComprada(
        categoriaMap[categoriaPrincipal] || categoriaPrincipal
      );
    };

    const calcularDescricaoResumoMes = () => {
      const hoje = new Date();
      const mesAtual = hoje.getMonth();
      const anoAtual = hoje.getFullYear();

      const mesAnterior = mesAtual === 0 ? 11 : mesAtual - 1;
      const anoMesAnterior = mesAtual === 0 ? anoAtual - 1 : anoAtual;

      const gastosMesAtual = compras
        .filter((compra: Compra) => {
          const dataCompra = new Date(compra.data);
          return (
            dataCompra.getMonth() === mesAtual &&
            dataCompra.getFullYear() === anoAtual
          );
        })
        .reduce((acc, compra) => acc + compra.valorPago, 0);

      const gastosMesAnterior = compras
        .filter((compra: Compra) => {
          const dataCompra = new Date(compra.data);
          return (
            dataCompra.getMonth() === mesAnterior &&
            dataCompra.getFullYear() === anoMesAnterior
          );
        })
        .reduce((acc, compra) => acc + compra.valorPago, 0);

      if (gastosMesAnterior === 0) {
        setDescricaoResumoMes('N/A em relação ao mês anterior');
        return;
      }

      const variacao =
        ((gastosMesAtual - gastosMesAnterior) / gastosMesAnterior) * 100;
      const sinal = variacao >= 0 ? '+' : '';
      const nomeMesAnterior = new Date(
        anoMesAnterior,
        mesAnterior
      ).toLocaleString('pt-BR', { month: 'long' });

      setDescricaoResumoMes(
        `${sinal}${variacao.toFixed(0)}% em relação a ${nomeMesAnterior}`
      );
    };

    fetchResumo();
    fetchMediaUltimos3Meses();
    calcularCategoriaMaisComprada();
    calcularDescricaoResumoMes();
  }, [compras]);

  return (
    <div className=" flex flex-col items-center h-full w-full px-4 sm:px-6 lg:px-8 gap-[20px] ">
      <div className="flex flex-col w-full max-w-5xl gap-[30px]">
        <div className="flex flex-col lg:flex-row gap-[20px] w-full max-w-5xl ">
          <div className="flex flex-col flex-1 w-full">
            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
              Olá, Felipe
            </h3>
            <Grafico compras={compras} />
          </div>
          <div className="flex flex-row lg:flex-col gap-4 w-[25%] lg:w-[25%]">
            <TesteCard
              title="Resumo do mês"
              descricao={descricaoResumoMes}
              conteudo={`R$${(mediaMes || 0).toFixed(2)}`}
            />
            <TesteCard
              title="Média de gastos"
              descricao="Baseado nos ultimos 3 meses"
              conteudo={`R$${(mediaUltimos3Meses || 0).toFixed(2)}`}
            />
            <TesteCard
              title="Categoria mais comprada no mês"
              descricao="Baseado no mês atual"
              conteudo={categoriaMaisComprada}
            />
          </div>
        </div>
        <Tabela
          compras={compras}
          loading={loading}
          error={error}
          onDelete={handleDeleteCompra}
        />
      </div>
    </div>
  );
}

export default HomePage;

