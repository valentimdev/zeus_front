import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useEffect, useState } from 'react';
import comprasService from '@/services/comprasService';

const categoriaMap: Record<string, string> = {
  SAUDE: 'Saúde',
  COMIDA: 'Comida',
  LAZER: 'Lazer',
};

export function Tabela() {
  const [compras, setCompras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await comprasService.getCompras();
        setCompras(response.data);
      } catch (err) {
        setError('Erro ao buscar compras');
      } finally {
        setLoading(false);
      }
    };
    fetchCompras();
  }, []);

  return (
    <div>
      <Table className="full">
        <TableCaption>Histórico de compras.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Categoria</TableHead>
            <TableHead className='text-center'>Data</TableHead>
            <TableHead className="text-right">Valor Pago</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4}>Carregando...</TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={4}>{error}</TableCell>
            </TableRow>
          ) : compras.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>Nenhuma compra encontrada.</TableCell>
            </TableRow>
          ) : (
            compras.map((compra) => (
              <TableRow key={compra.id || compra._id}>
                <TableCell className="font-medium">
                  {categoriaMap[compra.categoria] || compra.categoria}
                </TableCell>
                <TableCell className="text-center">
                  {compra.data.replace(/T00:00:00\.000Z$/, '')}
                </TableCell>
                <TableCell className="text-right">
                  R$ {Number(compra.valorPago).toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
export default Tabela;
