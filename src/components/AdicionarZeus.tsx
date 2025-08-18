import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Importe o CSS se você o criou
// import './AdicionarZeus.css'; 

// --- Interfaces para definir o formato dos dados ---
interface Racao {
  _id: string;
  nome: string;
  marca: string;
  pesoEmKg: number;
}

interface NovaCompra {
  racaoId: string;
  valorPago: number;
  quantidadeComprada: number;
}

const AdicionarZeus = () => {
  // --- Estados para o formulário de Ração ---
  const [racaoNome, setRacaoNome] = useState('');
  const [racaoMarca, setRacaoMarca] = useState('');
  const [racaoPeso, setRacaoPeso] = useState('');
  const [mensagemRacao, setMensagemRacao] = useState({ tipo: '', texto: '' });

  // --- Estados para o formulário de Compra ---
  const [racoesDisponiveis, setRacoesDisponiveis] = useState<Racao[]>([]);
  const [loadingRacoes, setLoadingRacoes] = useState(true);
  const [compraRacaoId, setCompraRacaoId] = useState('');
  const [compraValorPago, setCompraValorPago] = useState('');
  const [compraQuantidade, setCompraQuantidade] = useState('1');
  const [mensagemCompra, setMensagemCompra] = useState({ tipo: '', texto: '' });

  // --- Efeito para buscar as rações existentes quando o componente carrega ---
  const carregarRacoes = async () => {
    try {
      setLoadingRacoes(true);
      const response = await axios.get<Racao[]>('http://localhost:3000/api/racao'); // Rota ajustada
      setRacoesDisponiveis(response.data);
    } catch (error) {
      console.error('Erro ao carregar as rações:', error);
      setMensagemCompra({ tipo: 'erro', texto: 'Falha ao carregar rações.' });
    } finally {
      setLoadingRacoes(false);
    }
  };

  useEffect(() => {
    carregarRacoes();
  }, []);

  // --- Funções para lidar com o envio dos formulários ---
  const handleAdicionarRacao = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagemRacao({ tipo: '', texto: '' });
    try {
      const novaRacao = {
        nome: racaoNome,
        marca: racaoMarca,
        pesoEmKg: parseFloat(racaoPeso),
      };
      await axios.post('http://localhost:3000/api/racao', novaRacao); // Rota ajustada
      setMensagemRacao({ tipo: 'sucesso', texto: `Ração "${novaRacao.nome}" adicionada!` });
      setRacaoNome('');
      setRacaoMarca('');
      setRacaoPeso('');
      carregarRacoes(); // Recarrega a lista de rações para o outro formulário
    } catch (error: any) {
      setMensagemRacao({ tipo: 'erro', texto: error.response?.data?.message || 'Erro ao adicionar ração.' });
    }
  };

  const handleAdicionarCompra = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagemCompra({ tipo: '', texto: '' });
    try {
      const novaCompra: NovaCompra = {
        racaoId: compraRacaoId,
        valorPago: parseFloat(compraValorPago),
        quantidadeComprada: parseInt(compraQuantidade, 10),
      };
      await axios.post('http://localhost:3000/api/compras', novaCompra); // Rota ajustada
      setMensagemCompra({ tipo: 'sucesso', texto: 'Compra adicionada com sucesso!' });
      setCompraRacaoId('');
      setCompraValorPago('');
      setCompraQuantidade('1');
    } catch (error: any) {
      setMensagemCompra({ tipo: 'erro', texto: error.response?.data?.message || 'Erro ao adicionar compra.' });
    }
  };

  // --- Parte Visual (JSX) ---
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', padding: '20px', flexWrap: 'wrap' }}>
      {/* Formulário para Adicionar Ração */}
      <form onSubmit={handleAdicionarRacao} style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9', width: '400px' }}>
        <h3>Cadastrar Nova Ração</h3>
        <input
          type="text"
          placeholder="Nome da Ração (ex: Golden Filhotes 15kg)"
          value={racaoNome}
          onChange={(e) => setRacaoNome(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Marca"
          value={racaoMarca}
          onChange={(e) => setRacaoMarca(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Peso em Kg"
          value={racaoPeso}
          onChange={(e) => setRacaoPeso(e.target.value)}
          required
          min="0.1"
          step="0.1"
        />
        <button type="submit">Cadastrar Ração</button>
        {mensagemRacao.texto && <p style={{ color: mensagemRacao.tipo === 'sucesso' ? 'green' : 'red' }}>{mensagemRacao.texto}</p>}
      </form>

      {/* Formulário para Adicionar Compra */}
      <form onSubmit={handleAdicionarCompra} style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9', width: '400px' }}>
        <h3>Registrar Nova Compra</h3>
        {loadingRacoes ? (
          <p>Carregando rações...</p>
        ) : (
          <select
            value={compraRacaoId}
            onChange={(e) => setCompraRacaoId(e.target.value)}
            required
          >
            <option value="" disabled>Selecione a Ração Comprada</option>
            {racoesDisponiveis.map((racao) => (
              <option key={racao._id} value={racao._id}>
                {racao.nome}
              </option>
            ))}
          </select>
        )}
        <input
          type="number"
          placeholder="Valor Pago (ex: 182.50)"
          value={compraValorPago}
          onChange={(e) => setCompraValorPago(e.target.value)}
          required
          min="0.01"
          step="0.01"
        />
        <input
          type="number"
          placeholder="Quantidade de Sacos"
          value={compraQuantidade}
          onChange={(e) => setCompraQuantidade(e.target.value)}
          required
          min="1"
        />
        <button type="submit" disabled={loadingRacoes || racoesDisponiveis.length === 0}>
          Registrar Compra
        </button>
        {mensagemCompra.texto && <p style={{ color: mensagemCompra.tipo === 'sucesso' ? 'green' : 'red' }}>{mensagemCompra.texto}</p>}
      </form>
    </div>
  );
};

export default AdicionarZeus;