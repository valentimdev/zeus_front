import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Sua instância do Axios
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TesteCard from '../components/TesteCard';
import filterDates from '../util/filterDates'

// Interface para tipar os dados de uma ração
interface Racao {
  _id: string;
  nome: string;
  marca: string;
  pesoEmKg: number;
  melhorPreco: number;
  ultimoPreco:number
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
        console.error('Erro ao buscar rações', err);
      }
    };
    fetchRacoes();
  }, []);

  // Lida com a mudança nos inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Lida com a mudança no seletor de ração
  const handleSelectChange = (value: string) => {
    setFormData((prevState) => ({ ...prevState, racao: value }));
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
      <ul className="list-disc pl-5 bg-gray-100 p-4 rounded-md">
        {racoes.map((racao) => (
          <li>
            {racao.melhorPreco} 
          </li>
        ))} 
      </ul>
  </div>
  );
}

export default RegistrosPage;
