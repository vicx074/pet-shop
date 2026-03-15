import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    
    const element = document.getElementById(targetId);
    if (element) {
      // Pega a posição do elemento em relação ao topo da página
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      // Define um recuo (offset) para o Header não ficar em cima do conteúdo
      const offsetPosition = elementPosition - 80; 

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'p-4' : 'pt-4 md:pt-6 px-4 md:px-8'
      }`}
    >
      <nav 
        // A mágica acontece aqui: bg-transparent sem scroll, bg-white com scroll
        className={`mx-auto max-w-[1400px] w-full flex justify-between items-center transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 rounded-full px-6 md:px-8 py-2 md:py-3' 
            : 'bg-transparent shadow-none border-transparent px-2 py-2'
        }`}
      >
        {/* LOGO - TAMANHO AUMENTADO */}
      <a href="#" className="block hover:opacity-80 transition-opacity z-50">
        <img 
          src="/petclin-removebg-preview.webp" 
          alt="PetClin Logo" 
          className={`transition-all duration-500 object-contain ${
            scrolled ? 'h-14 md:h-16 w-auto' : 'h-20 md:h-28 w-auto'
          }`} 
  />
</a>

        {/* NAVEGAÇÃO DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8 items-center">
            <a href="#sobre" onClick={(e) => handleScrollTo(e, 'services-section')} className="text-[#006400] font-black text-sm uppercase tracking-wide hover:text-[#FF8C00] transition-colors relative group">
              Sobre
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#equipe" onClick={(e) => handleScrollTo(e, 'equipe')} className="text-[#006400] font-black text-sm uppercase tracking-wide hover:text-[#FF8C00] transition-colors relative group">
              Equipe
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contato" onClick={(e) => handleScrollTo(e, 'footer-section')} className="text-[#006400] font-black text-sm uppercase tracking-wide hover:text-[#FF8C00] transition-colors relative group">
              Contato
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          
          <a href="https://wa.me/5575992996010" target="_blank" rel="noopener noreferrer" className="bg-[#FF8C00] text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:bg-[#e67e00] hover:scale-105 transition-transform duration-300 flex items-center gap-2">
            <Phone size={18} />
            <span className="whitespace-nowrap">PLANTÃO 24H</span>
          </a>
        </div>

        {/* BOTÃO HAMBÚRGUER MOBILE */}
        <button 
          className="md:hidden z-50 p-2 text-[#006400] hover:text-[#FF8C00] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* MENU DROPDOWN MOBILE */}
      {isOpen && (
        <div className="absolute top-[110%] left-4 right-4 bg-white/98 backdrop-blur-xl shadow-2xl border border-gray-200 flex flex-col p-6 gap-6 md:hidden z-40 rounded-3xl animate-in slide-in-from-top-4 fade-in duration-200">
          <a href="#sobre" onClick={(e) => handleScrollTo(e, 'services-section')} className="text-[#006400] font-black text-xl uppercase tracking-wide text-center hover:text-[#FF8C00]">Sobre</a>
          <a href="#equipe" onClick={(e) => handleScrollTo(e, 'equipe')} className="text-[#006400] font-black text-xl uppercase tracking-wide text-center hover:text-[#FF8C00]">Equipe</a>
          <a href="#contato" onClick={(e) => handleScrollTo(e, 'footer-section')} className="text-[#006400] font-black text-xl uppercase tracking-wide text-center hover:text-[#FF8C00]">Contato</a>
          <hr className="border-gray-100" />
          <a href="https://wa.me/5575992996010" target="_blank" rel="noopener noreferrer" className="bg-[#FF8C00] text-white px-5 py-4 rounded-xl font-black text-center shadow-lg w-full flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <Phone size={20} />
            PLANTÃO 24H
          </a>
        </div>
      )}
    </header>
  );
}