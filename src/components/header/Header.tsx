'use client';

import { Navbar } from './Navbar';

export function Header() {
  return (
    <header className="fixed w-full bg-blueti text-white p-4 z-10 md:text-xl">

      <Navbar/>
    </header>
  );
}


export default Header;