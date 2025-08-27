import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import { Outlet } from 'react-router-dom';
import { getCompras } from './services/comprasService.ts';

function App() {
  const [compras, setCompras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompras = async () => {
    setLoading(true);
    try {
      const response = await getCompras();
      setCompras(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar compras');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompras();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header onCompraCriada={fetchCompras} />
      <main className="flex h-full w-full items-start justify-center pt-8">
        <Outlet context={{ compras, loading, error }} />
      </main>
    </div>
  );
}

export default App;
