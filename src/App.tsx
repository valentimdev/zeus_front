import React from 'react';
// import './App.css';
import Header from './components/Header.tsx';
import { Grafico } from '@/components/Grafico.tsx';
import { Tabela } from '@/components/Tabela.tsx';
import { Outlet } from 'react-router-dom';
import { TesteCard } from '@/components/TesteCard.tsx';

function App() {

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center h-full w-full gap-[20px] ">
        <div className="flex flex-col  gap-[30px]">
          <div className="flex gap-[20px]">
            <div className="flex flex-col">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Ola, Felipe
              </h3>
              <Grafico />
            </div>
            <div className="flex flex-col w-[400px]">
              <TesteCard
                title="cabeçao"
                descricao="testando descricao aqui"
              />
              <TesteCard title="lindao" /> 
            </div>
          </div>
          <Tabela />
        </div>
      </div>
    </div>
  );
}

export default App;
