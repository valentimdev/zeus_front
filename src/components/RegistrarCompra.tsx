import { Button } from '@/components/ui/button';
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
import { useState } from 'react';

export function RegistrarCompra() {
  const [racaoId, setRacao] = useState(null);
  const [valorPago, setValor] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [data, setData] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const compraData = {
    racao: racaoId, // Pode ser null se nenhuma ração for selecionada
    valorPago,
    quantidade,
    data,
  };
  return (
    <Dialog>
      <form>
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
              <Label htmlFor="name-1">Ração</Label>
              <Combobox />
            </div>
            <div className="grid gap-3">
              <Label>Valor</Label>
              <InputCurrency placeholder="R$ 0,00"></InputCurrency>
            </div>
            <div className="grid gap-3">
              <Label>Quantidade Comprada</Label>
              <Input id="username-1" name="username" defaultValue={1} />
            </div>
            <div className="grid gap-3">
              <Label>Data da Compra</Label>
              <DayPicker />
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
