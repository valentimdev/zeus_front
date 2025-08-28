import React from 'react';
import '../style/Header.css';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import RegistrarCompra from './RegistrarCompra';
import logo from '../assets/images/logo.png';

const Header: React.FC<{ onCompraCriada: () => void }> = ({
  onCompraCriada,
}) => {
  return (
    <header
      className="w-full"
      style={{ backgroundColor: 'var(--color-chart-1)' }}
    >
      <nav className=" container mx-auto flex gap-[15px] m-[20px] p-2.5 items-center w-full justify-between">
        <div className="flex gap-[20px] items-center justify-center">
          {/* <h1 className="font-bold text-2xl text-white">Patas na Conta</h1> */}
          <img src={logo} alt="Logo" className="h-13 w-70" />
          {/* <Link to="/">
            Inicio
          </Link> */}
          {/* <Link to="/registros">Registrar Compra</Link> */}
        </div>
        <div>
          <RegistrarCompra onCompraCriada={onCompraCriada} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
