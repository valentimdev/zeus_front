import React from 'react';
import '../style/Header.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="flex bg-gray-200 ">
      <div className="flex m-[20px]">
        <nav className="flex gap-[15px] p-2.5 items-center justify-center">
          <h1 className="font-bold text-2xl">Zeus</h1>
          <Link to="/" className="">
            Home
          </Link>
          <Link to="/registros">Registrar Compra</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
