import { useEffect, useState } from 'react';
import { Grafico } from '../components/Grafico';
import Tabela from '../components/Tabela';
import TesteCard from '../components/TesteCard';
import { useOutletContext } from 'react-router-dom';
import resumoMes from '@/util/filterDates';

interface ContextType {
  compras: any[];
  loading: boolean;
  error: string | null;
  handleDeleteCompra: (id: number) => void;
}

export function HomePage() {
  const { compras, loading, error, handleDeleteCompra } =
    useOutletContext<ContextType>();
  const [mediaMes, setMediaMes] = useState<any | null>(null);
  const [mediaUltimos3Meses, setMediaUltimos3Meses] = useState<any | null>(
    null
  );
  const [categoriaMaisComprada, setCategoriaMaisComprada] = useState('');

  const categoriaMap: Record<string, string> = {
    SAUDE: 'Saúde',
    COMIDA: 'Comida',
    LAZER: 'Lazer',
  };

  useEffect(() => {
    if (!compras || compras.length === 0) return;

    const fetchResumo = async () => {
      const actualMonth = new Date().getMonth();
      const actualYear = new Date().getFullYear();
      const requestResponse = await resumoMes(actualYear, actualMonth + 1);
      const valorMensal = requestResponse?.reduce(
        (accumulator, initialValue) => accumulator + initialValue.valorPago,
        0
      );
      const mediaValores = valorMensal / requestResponse.length;
      setMediaMes(mediaValores);
    };

    const fetchMediaUltimos3Meses = () => {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);

      const dadosFiltrados = compras.filter((compra: any) => {
        const dataCompra = new Date(compra.data);
        return dataCompra >= startDate && dataCompra <= endDate;
      });

      const valorFinal = dadosFiltrados?.reduce(
        (accumulator, initialValue) => accumulator + initialValue.valorPago,
        0
      );
      setMediaUltimos3Meses(valorFinal / dadosFiltrados.length);
    };

    const calcularCategoriaMaisComprada = () => {
      const hoje = new Date();
      const mesAtual = hoje.getMonth();
      const anoAtual = hoje.getFullYear();

      const comprasDoMes = compras.filter((compra: any) => {
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

    fetchResumo();
    fetchMediaUltimos3Meses();
    calcularCategoriaMaisComprada();
  }, [compras]);

  return (
    <div className="flex flex-col items-center h-full w-[70%] gap-[20px] ">
      <div className="flex flex-col w-full max-w-5xl gap-[30px]">
        <div className="flex gap-[20px] w-full max-w-5xl ">
          <div className="flex flex-col flex-1 w-full">
            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
              Olá, Felipe
            </h3>
            <Grafico compras={compras} />
          </div>
          <div className="flex gap-4 flex-col mx-auto w-[25%]  ">
            <TesteCard
              title="Resumo do mês"
              descricao="+10% em relação a Julho"
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
