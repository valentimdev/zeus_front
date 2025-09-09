import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import { Outlet } from 'react-router-dom';
import comprasService, { getCompras } from './services/comprasService.ts';

/**
 * The main component of the application.
 * It serves as the root layout and handles fetching and managing purchase data.
 * @returns {JSX.Element} The rendered App component.
 */
interface Compra {
  id: string | number;
  _id: string | number;
  categoria: string;
  valorPago: number;
  data: string;
}

function App() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the list of purchases from the server and updates the state.
   */
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

  /**
   * Handles the deletion of a purchase.
   * @param {number} id - The ID of the purchase to be deleted.
   */
  const handleDeleteCompra = async (id: number) => {
    try {
      await comprasService.deleteCompra(id);
      fetchCompras();
    } catch (error) {
      console.error('Erro ao deletar compra:', error);
      setError('Erro ao deletar compra');
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header onCompraCriada={fetchCompras} />
      <main className="flex h-full w-full items-start justify-center pt-8">
        <Outlet context={{ compras, loading, error, handleDeleteCompra }} />
      </main>
    </div>
  );
}

export default App;
