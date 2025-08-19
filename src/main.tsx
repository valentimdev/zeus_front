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
    element: <App />,
    children: [
      {
        index: true, 
        element: <HomePage />,
      },
      {
        path: 'registros',
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
