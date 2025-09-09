import React from 'react';
import '../style/Header.css';
import { Link } from 'react-router-dom';
import RegistrarCompra from './RegistrarCompra';
import logo from '../assets/images/logo.svg';

/**
 * The header component of the application.
 * @param {object} props - The component props.
 * @param {() => void} props.onCompraCriada - Callback function to be called when a new purchase is created.
 * @returns {JSX.Element} The rendered Header component.
 */
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
          <Link to="/">
            <img src={logo} alt="Logo" className="h-13 w-70" />
          </Link>
        </div>
        <div>
          <RegistrarCompra onCompraCriada={onCompraCriada} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
