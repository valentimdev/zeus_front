import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

const categoriaMap: Record<string, string> = {
  SAUDE: 'Saúde',
  COMIDA: 'Comida',
  LAZER: 'Lazer',
};

export function Tabela({
  compras,
  loading,
  error,
  onDelete,
}: {
  compras: any[];
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => void;
}) {
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const comprasOrdenadas = [...compras].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  return (
    <div className="h-210 overflow-y-auto w-full flex flex-col px-6">
      <p className="font-semibold text-center">Histórico de compras</p>
      <Table className="full">
        <TableHeader>
          <TableRow>
            {/* <TableHead className="text-center" colSpan={3}>
              Histórico de compras
            </TableHead> */}
          </TableRow>
          <TableRow>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-center">Data</TableHead>
            <TableHead className="text-right">Valor Pago</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comprasOrdenadas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>Nenhuma compra encontrada.</TableCell>
            </TableRow>
          ) : (
            comprasOrdenadas.map((compra) => (
              <TableRow key={compra.id || compra._id}>
                <TableCell className="font-medium">
                  {categoriaMap[compra.categoria] || compra.categoria}
                </TableCell>
                <TableCell className="text-center">
                  {new Date(compra.data).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                  })}
                </TableCell>
                <TableCell className="text-right">
                  R$ {Number(compra.valorPago).toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(compra._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
