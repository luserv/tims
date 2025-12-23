'use client';

import { useState } from 'react';

export function TestButton() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    console.log('=== TEST BUTTON CLICKED ===');
    console.log('Count before:', count);
    console.log('isOpen before:', isOpen);
    
    setCount(count + 1);
    setIsOpen(!isOpen);
    
    console.log('Count after:', count + 1);
    console.log('isOpen after:', !isOpen);
  };

  return (
    <div className="p-4 bg-purple-500 text-white rounded-lg">
      <h3 className="text-xl font-bold mb-2">COMPONENTE DE PRUEBA</h3>
      <button 
        onClick={handleClick}
        className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400"
      >
        HAZ CLIC AQUÍ (Count: {count})
      </button>
      <div className="mt-2">
        Estado: {isOpen ? 'ABIERTO' : 'CERRADO'}
      </div>
    </div>
  );
}