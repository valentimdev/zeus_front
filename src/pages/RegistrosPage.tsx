import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Sua instância do Axios
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TesteCard from '../components/TesteCard';

// Interface para tipar os dados de uma ração
interface Racao {
  _id: string;
  nome: string;
  marca: string;
  pesoEmKg: number;
}

function RegistrosPage() {
  // Estado para armazenar a lista de rações vinda da API
  const [racoes, setRacoes] = useState<Racao[]>([]);

  // Estado para o formulário de envio (POST)
  const [formData, setFormData] = useState({
    racao: '', // Vai armazenar o ID da ração selecionada
    valorPago: '',
    quantidadeComprada: '1',
    data: new Date().toISOString().split('T')[0],
  });

  // Estado para os dados recebidos para os cards (GET)
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Efeito que busca as rações cadastradas quando a página carrega
  useEffect(() => {
    const fetchRacoes = async () => {
      try {
        // Assumindo que você tem uma rota GET /api/racoes no seu back-end
        const response = await api.get('/api/racoes');
        setRacoes(response.data);
      } catch (err) {
        console.error("Erro ao buscar rações", err);
      }
    };
    fetchRacoes();
  }, []);

  // Lida com a mudança nos inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  
  // Lida com a mudança no seletor de ração
  const handleSelectChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, racao: value }));
  };

  // Função para ENVIAR uma nova compra (POST)
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.racao) {
      alert('Por favor, selecione uma ração.');
      return;
    }
    try {
      const payload = {
        ...formData,
        valorPago: parseFloat(formData.valorPago),
        quantidadeComprada: parseInt(formData.quantidadeComprada, 10),
      };
      const response = await api.post('/api/compras', payload);
      alert('Compra registrada com sucesso! ID: ' + response.data._id);
    } catch (err) {
      alert('Erro ao registrar compra: ' + (err as Error).message);
    }
  };

  // Função para BUSCAR os dados dos cards (GET)
  const handleGetStats = async () => {
    setLoading(true);
    setError('');
    setCardData(null);
    try {
      const response = await api.get('/api/compras/stats');
      setCardData(response.data);
    } catch (err) {
      setError('Erro ao buscar dados: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Coluna 1: Formulário para Testar o POST */}
      <Card>
        <CardHeader>
          <CardTitle>Testar API (POST)</CardTitle>
          <CardDescription>Adicione uma nova compra no banco de dados.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <div>
              <Label htmlFor="racao">Ração</Label>
              <Select onValueChange={handleSelectChange} value={formData.racao}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma ração" />
                </SelectTrigger>
                <SelectContent>
                  {racoes.map((racao) => (
                    <SelectItem key={racao._id} value={racao._id}>
                      {racao.nome} ({racao.marca})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="valorPago">Valor Pago</Label>
              <Input id="valorPago" name="valorPago" type="number" step="0.01" value={formData.valorPago} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="quantidadeComprada">Quantidade Comprada</Label>
              <Input id="quantidadeComprada" name="quantidadeComprada" type="number" value={formData.quantidadeComprada} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="data">Data da Compra</Label>
              <Input id="data" name="data" type="date" value={formData.data} onChange={handleInputChange} required />
            </div>
            <Button type="submit">Registrar Compra (Teste)</Button>
          </form>
        </CardContent>
      </Card>

      {/* Coluna 2: Botão e Cards para Testar o GET */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Testar API (GET)</CardTitle>
            <CardDescription>Busque os dados da rota `/stats` para popular os cards.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGetStats} disabled={loading}>
              {loading ? 'A carregar...' : 'Carregar Dados dos Cards'}
            </Button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </CardContent>
        </Card>

        {cardData && (
          <div className="space-y-4">
            <TesteCard
              title="Gasto do Mês"
              descricao="Total gasto no mês atual"
              conteudo={`R$ ${cardData.gastoMesAtual.toFixed(2)}`}
            />
            <TesteCard
              title="Última Compra"
              descricao={cardData.ultimaCompra.produto}
              conteudo={`R$ ${cardData.ultimaCompra.valor.toFixed(2)}`}
            />
            <TesteCard
              title="Média Mensal"
              descricao="Cálculo simplificado"
              conteudo={`~ R$ ${cardData.mediaMensal.toFixed(2)}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistrosPage;
