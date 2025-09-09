/**
 * @file This is the main entry point for the application.
 * It sets up the routing and renders the root component.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import HomePage from './pages/HomePage.tsx';
import RegistrosPage from './pages/RegistrosPage.tsx';
import './index.css';


/**
 * The router configuration for the application.
 * @type {import('react-router-dom').BrowserRouter}
 */
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
