'use client';
import Link from 'next/link';
import { useState } from 'react';

import IconMobileMenu from '@/components/icons/icon-mobile-menu.svg';
import IconClose from '@/components/icons/icon-close.svg';


const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Cronograma', href: '/timeline' },
  { name: 'Club', href: '/club' },
  { name: 'Contacto', href: '/contact' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  return (
    <nav className="mx-auto flex flex-col justify-between items-center text-black dark:text-white py-4">
      {/* Menú de navegación para desktop */}
      <div className="hidden md:flex items-center space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="hover:text-gray-400 transition-colors duration-200"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Contenedor para móvil: menú hamburguesa y toggle de tema */}
      <div className="md:hidden flex items-center space-x-4">
        <button
          className="text-4xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <IconClose /> : <IconMobileMenu />}
        </button>
      </div>

      {/* Menú desplegable para móvil */}
      <div
        className={`md:hidden ${isMenuOpen ? 'flex flex-col' : 'hidden'} mt-2 space-y-2`}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block text-center py-2 hover:bg-gray-700 transition-colors duration-200"
            onClick={() => setIsMenuOpen(true)}
          >
            {item.name}
          </Link>
        ))}
        {/* Tema toggle en móvil (oculto porque ya está en el header) */}
      </div>
    </nav>
  );
}