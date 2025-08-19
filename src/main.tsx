import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import HomePage from './pages/HomePage.tsx'; // Importando a HomePage
import RegistrosPage from './pages/RegistrosPage.tsx'; // Importando a nova página
import './index.css';

// Configuração do roteador
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // O App é o layout principal (com o Header)
    children: [
      {
        index: true, // Rota principal (/)
        element: <HomePage />,
      },
      {
        path: 'registros', // Rota para /registros
        element: <RegistrosPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
