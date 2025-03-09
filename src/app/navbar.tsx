import React from 'react';
import Logo from './logo';

export default function NavBar() {
  return (
    <nav className="h-18 border-body flex items-center justify-between border-b py-1.5">
      <div className="aspect-[100/88.45] h-full">
        <Logo />
      </div>
      <div className="flex items-center gap-2">
        <button className="border-accent h-10 w-10 rounded-md border bg-transparent"></button>
      </div>
      navbar
    </nav>
  );
}
