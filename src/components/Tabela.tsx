import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

/**
 * @constant {Record<string, string>} categoriaMap
 * A map to translate category keys to human-readable names.
 */
const categoriaMap: Record<string, string> = {
  SAUDE: 'Saúde',
  COMIDA: 'Comida',
  LAZER: 'Lazer',
};

/**
 * A component that displays a table of purchases with an option to delete each entry.
 * @param {object} props - The component props.
 * @param {any[]} props.compras - An array of purchase objects.
 * @param {boolean} props.loading - A flag indicating if the data is being loaded.
 * @param {string | null} props.error - An error message, if any.
 * @param {(id: number) => void} props.onDelete - Callback function to be called when a purchase is deleted.
 * @returns {JSX.Element} The rendered Tabela component.
 */
interface Compra {
  id: string | number;
  _id: string | number;
  categoria: string;
  valorPago: number;
  data: string;
}

export function Tabela({
  compras,
  loading,
  error,
  onDelete,
}: {
  compras: Compra[];
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => void;
}) {
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const comprasOrdenadas = [...compras].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );
  const [compraToDelete, setCompraToDelete] = useState<string | number | null>(
    null
  );

  const handleConfirmDelete = () => {
    if (compraToDelete) {
      onDelete(compraToDelete as number); // Ajuste o tipo se necessário
      setCompraToDelete(null);
    }
  };

  return (
    <div className="h-180 overflow-y-auto w-full a flex flex-col px-6 align-middle">
      <p className="font-semibold text-center">Histórico de compras</p>
      <Table className="full">
        <TableHeader className="text-center ">
          <TableRow>
            {/* <TableHead className="text-center" colSpan={3}>
            Histórico de compras
          </TableHead> */}
          </TableRow>
          <TableRow>
            <TableHead className="text-center">Categoria</TableHead>
            <TableHead className="text-center">Data</TableHead>
            <TableHead className="text-center">Valor Pago</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
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
                <TableCell className="">
                  {new Date(compra.data).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                  })}
                </TableCell>
                <TableCell className="">
                  R$ {Number(compra.valorPago).toFixed(2)}
                </TableCell>
                <TableCell className="">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação não pode ser desfeita. Isso irá deletar
                          permanentemente o registro da sua compra.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(compra._id)}>
                          Continuar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
