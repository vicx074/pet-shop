import React from 'react';
import { Phone } from 'lucide-react';

export default function Header() {
  
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-30 flex justify-end px-6 pt-4">
      <nav className="max-w-[1400px] w-full flex justify-end items-center gap-8">
        
        {/* LINKS DE NAVEGAÇÃO SIMPLES */}
        <div className="hidden lg:flex gap-8 items-center">
          
          <a 
            href="#sobre" 
            onClick={(e) => handleScroll(e, 'services-section')} // Leva para o Carrossel
            className="text-[#006400] font-bold text-sm uppercase tracking-wide hover:text-[#FF8C00] transition-colors relative group cursor-pointer"
          >
            Sobre
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] group-hover:w-full transition-all duration-300"></span>
          </a>

          <a 
            href="#contato" 
            onClick={(e) => handleScroll(e, 'footer-section')} // Leva para o Rodapé
            className="text-[#006400] font-bold text-sm uppercase tracking-wide hover:text-[#FF8C00] transition-colors relative group cursor-pointer"
          >
            Contato
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] group-hover:w-full transition-all duration-300"></span>
          </a>

        </div>
        
        <div className="flex items-center gap-6">
          {/* BOTÃO PLANTÃO */}
          <a href="#" className="bg-[#FF8C00] text-white px-5 py-2 rounded-md font-bold text-sm shadow-md hover:bg-[#e67e00] hover:scale-105 transition-all duration-300 flex items-center gap-2 h-10">
            <Phone size={16} />
            <span className="whitespace-nowrap">PLANTÃO 24H</span>
          </a>

          {/* LOGO PETCLIN */}
          <a href="#" className="block hover:opacity-90 transition-opacity">
            <img 
              src="/petclin-removebg-preview.png" 
              alt="PetClin Logo" 
              className="h-14 md:h-20 w-auto object-contain"
            />
          </a>
        </div>

      </nav>
    </div>
  );
}