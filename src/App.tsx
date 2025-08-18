import React from 'react';
import './App.css';
import AdicionarZeus from './components/AdicionarZeus.tsx'; // Importe o componente

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Zeus - Gerenciamento</h1>
      </header>
      <main>
        <AdicionarZeus /> {/* Use o componente aqui */}
      </main>
    </div>
  );
}

export default App;