import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.tsx';

import { getCompras } from './services/comprasService';

function App() {
  const [compras, setCompras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await getCompras();
        setCompras(response.data);
      } catch (err) {
        setError('Erro ao buscar compras');
      } finally {
        setLoading(false);
      }
    };
    fetchCompras();
  }, []);

  const handleCompraCriada = (novaCompra: any) => {
    setCompras((comprasAnteriores) => [novaCompra, ...comprasAnteriores]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onCompraCriada={handleCompraCriada} />
      <main className="flex-1 flex justify-center items-start p-4">
        <Outlet context={{ compras, loading, error, setCompras }} />
      </main>
    </div>
  );
}

export default App;
