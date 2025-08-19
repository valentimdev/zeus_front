import React from 'react';
// import './App.css';
import Header from './components/Header.tsx';
import { Grafico } from '@/components/Grafico.tsx';
import { Tabela } from '@/components/Tabela.tsx';
import { Outlet } from 'react-router-dom';
import { TesteCard } from '@/components/TesteCard.tsx';
import HomePage from './pages/HomePage.tsx';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className='flex-1 p-4 sm:p-6 md:p-8'>
      <Outlet></Outlet>
      </main>
    </div>
  );
}

export default App;
