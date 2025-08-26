import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Combobox from './Combobox';
import DayPicker from './DayPicker';
import InputCurrency from './InputCurrency';
import { useEffect, useState } from 'react';
import { createCompra } from '@/services/comprasService';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function RegistrarCompra() {
  const [categoria, setCategoria] = useState('');
  const [valorPago, setValor] = useState<string | number | undefined>('');
  const [data, setData] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const handleSubmit = async (e: any) => {
    // para impedir o reload da pagina
    e.preventDefault();
    setStatusMessage('Enviando...');
    setIsLoading(true);
    const dataFormatada = format(data, 'yyyy-MM-dd');

    // validacao para garantir que todos os campos foram preenchidos
    if (!categoria || !valorPago || !data) {
      setStatusMessage('Error: Todos os campos tem que ser preenchidos.');
      return;
    }

    // Cria o post do objeto com os dados do formulario
    const postData = {
      categoria: categoria,
      valorPago: valorPago,
      data: dataFormatada,
    };

    // Mensagem de loading enquanto a requisicao esta sendo feita
    setStatusMessage('Enviando...');

    try {
      const response = await createCompra(postData);

      console.log('Post criado com sucesso:', response.data);
      // Mensagem de sucesso quando a requisicao for concluida
      setStatusMessage(`ID: ${response.data.id}`);

      // Clear the form fields after successful submission
      setCategoria('');
      setValor('');
      setData(new Date());
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Error: Post cancelado.');
    }finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Data selecionada:', format(data, 'yyyy-MM-dd'));
  }, [data]);
  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline">+ Registrar Compra</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Registro de compra</DialogTitle>
            <DialogDescription>
              Preencha os campos para registrar uma nova compra
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Valor</Label>
              <InputCurrency
                value={valorPago}
                onValueChange={setValor}
                placeholder="R$ 0,00"
              />
            </div>
            <div className="grid gap-3">
              <Label>Categoria</Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Saúde">Saúde</SelectItem>
                  <SelectItem value="Comida">Comida</SelectItem>
                  <SelectItem value="Lazer">Lazer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label>Data da Compra</Label>
              <DayPicker date={data} setDate={setData} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
export default RegistrarCompra;
