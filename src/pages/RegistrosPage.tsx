import React, { useState } from 'react';
import DayPicker from '../components/DayPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import comprasService from '../services/comprasService';

function RegistrosPage() {
  const [valorPago, setValorPago] = useState('');
  const [quantidadeComprada, setQuantidadeComprada] = useState('1');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await comprasService.createCompra({
        valorPago: parseFloat(valorPago),
        // quantidadeComprada: parseInt(quantidadeComprada, 10),
        data: date ? date.toISOString() : undefined,
      });
      setSuccess('Compra registrada com sucesso!');
      setValorPago('');
      setQuantidadeComprada('1');
      setDate(new Date());
    } catch {
      setError('Erro ao registrar compra.');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Valor Pago</label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={valorPago}
            onChange={e => setValorPago(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Quantidade Comprada</label>
          <Input
            type="number"
            min="1"
            value={quantidadeComprada}
            onChange={e => setQuantidadeComprada(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Data</label>
          <DayPicker date={date} setDate={setDate} />
        </div>
        {success && <div className="text-green-600">{success}</div>}
        {error && <div className="text-red-500">{error}</div>}
        <Button type="submit">Registrar Compra</Button>
      </form>
    </div>
  );
}

export default RegistrosPage;