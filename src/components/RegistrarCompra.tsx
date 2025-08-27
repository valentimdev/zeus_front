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

export function RegistrarCompra({
  onCompraCriada,
}: {
  onCompraCriada: (novaCompra: any) => void;
}) {
  const [categoria, setCategoria] = useState('');
  const [valorPago, setValor] = useState<string | number | undefined>('');
  const [data, setData] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const handleSubmit = async (e: any) => {
    console.log('Enviado!')
    e.preventDefault();
    setStatusMessage(''); // Limpa antes de validar

    if (!categoria || !valorPago || !data) {
      setStatusMessage('Todos os campos precisam ser preenchidos.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('Enviando...');
    const dataFormatada = format(data, 'yyyy-MM-dd');

    const postData = {
      categoria: categoria,
      valorPago: valorPago,
      data: dataFormatada,
    };

    try {
      const response = await createCompra(postData);

      console.log('Post criado com sucesso:', response.data);
      setStatusMessage(`ID: ${response.data.id}`);
      onCompraCriada(response.data);

      setCategoria('');
      setValor('');
      setData(new Date());
      setOpen(false); // Fecha o Dialog após sucesso
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Error: Post cancelado.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Data selecionada:', format(data, 'yyyy-MM-dd'));
  }, [data]);
  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          setStatusMessage('');
          if (v) {
            setCategoria('');
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline">+ Registrar Compra</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit} className="grid gap-8">
            {/* Header */}
            <div className="grid gap-6">
              <DialogHeader>
                <DialogTitle>Registro de compra</DialogTitle>
                <DialogDescription>
                  Preencha os campos para registrar uma nova compra
                </DialogDescription>
              </DialogHeader>
            </div>
            {/* Body */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Valor</Label>
                <InputCurrency
                  value={valorPago}
                  onValueChange={setValor}
                  placeholder="R$ 0,00"
                />
              </div>
              <div className="grid gap-2">
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
              <div className="grid gap-2">
                <Label>Data da Compra</Label>
                <DayPicker date={data} setDate={setData} />
              </div>
            </div>
            {/* Footer */}
            <div className="grid gap-6">
              {/* Mensagem de status discreta */}
              {statusMessage && (
                <span
                  className={`text-xs ${
                    statusMessage.includes('Error') ||
                    statusMessage.includes('Todos os campos')
                      ? 'text-red-500'
                      : 'text-black'
                  }`}
                >
                  {statusMessage}
                </span>
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Salvando...' : 'Salvar compra'}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default RegistrarCompra;
