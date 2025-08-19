import React from 'react';
import '../style/Header.css';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b bg-background/95">
      <nav className=" container mx-auto flex gap-[15px] m-[20px] p-2.5 items-center w-full justify-between">
        <div className='flex gap-[20px] items-center justify-center'>
        <h1 className="font-bold text-2xl">Zeus</h1>
          <Link to="/">
            Inicio
          </Link>
          <Link to="/registros">Registrar Compra</Link>
        </div>
        <div>
          <Button>+ Registrar Compra</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
