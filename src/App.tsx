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
    <div className="flex flex-col h-screen w-screen border border-amber-400">
      <Header />
      <main className="flex h-full w-full items-center justify-center border border-amber-950">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default App;
