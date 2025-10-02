import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#000000]/50 backdrop-blur-sm shadow-lg shadow-[#cd8032]/10 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <h1 className="text-3xl md:text-4xl font-bold text-[#cd8032] tracking-wider text-center">
          World Anvil Assistant
        </h1>
      </div>
    </header>
  );
};