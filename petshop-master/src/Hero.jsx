import React, { useEffect, useRef } from 'react';
import { MapPin, MessageCircle } from 'lucide-react'; // Phone foi movido para o Header
import Header from './Header'; // <--- Importando o componente Header

export default function Hero() {
  const pawsRef = useRef([]);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const scrollProgress = Math.min(scrollY / heroHeight, 1);
      const baseOpacity = 0.12; 

      pawsRef.current.forEach((paw, index) => {
        if (paw) {
          const rotation = scrollProgress * 720 * (index % 2 === 0 ? 1 : -1);
          const translateX = scrollProgress * (index % 2 === 0 ? 250 : -250); 
          const translateY = scrollProgress * 300;
          const scale = 1 - scrollProgress * 0.5;
          const opacity = Math.max(0, baseOpacity - (scrollProgress * baseOpacity));

          paw.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg) scale(${scale})`;
          paw.style.opacity = opacity;
        }
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={heroRef} className="relative w-full h-screen bg-gradient-to-br from-[#006400] via-[#007a00] to-[#005500] overflow-hidden font-sans flex flex-col justify-between">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px),
                            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`
        }}></div>
      </div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FF8C00] rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-white rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      
      {/* --- ONDA SUPERIOR AJUSTADA --- */}
      <div className="absolute top-0 right-0 w-full h-[160px] z-20 pointer-events-none">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#f8f8f8', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <path 
            d="M 150,0 L 1440,0 L 1440,160 C 1100,160 900,80 150,0 Z" 
            fill="url(#waveGradient)" 
          />
        </svg>
      </div>

      {/* --- HEADER COMPONENT --- */}
      <Header />

      {/* ELEMENTOS DECORATIVOS (Patinhas) */}
      <div ref={el => pawsRef.current[0] = el} className="absolute top-[8%] left-[2%] z-10 opacity-0"><img src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" className="w-16 md:w-20 drop-shadow-2xl filter brightness-0 invert rotate-12" /></div>
      <div ref={el => pawsRef.current[1] = el} className="absolute top-[40%] left-[-2%] z-10 opacity-0"><img src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" className="w-24 md:w-28 drop-shadow-2xl filter brightness-0 invert -rotate-45" /></div>
      <div ref={el => pawsRef.current[2] = el} className="absolute bottom-[5%] left-[10%] z-10 opacity-0"><img src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" className="w-18 md:w-22 drop-shadow-2xl filter brightness-0 invert rotate-90" /></div>
      <div ref={el => pawsRef.current[3] = el} className="absolute top-[15%] right-[5%] z-10 opacity-0"><img src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" className="w-14 md:w-18 drop-shadow-2xl filter brightness-0 invert -rotate-12" /></div>
      <div ref={el => pawsRef.current[4] = el} className="absolute top-[50%] right-[-3%] z-10 opacity-0"><img src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" className="w-20 md:w-24 drop-shadow-2xl filter brightness-0 invert rotate-180" /></div>
      <div ref={el => pawsRef.current[5] = el} className="absolute bottom-[15%] left-[45%] z-10 opacity-0"><img src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" className="w-28 md:w-32 drop-shadow-2xl filter brightness-0 invert rotate-45" /></div>

      {/* MANCHA LARANJA */}
      <div className="absolute bottom-0 left-0 w-[45%] h-[75%] z-0 pointer-events-none">
         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,100 L0,20 Q30,0 50,30 Q80,80 60,100 Z" fill="url(#orangeBlob)" />
            <defs><linearGradient id="orangeBlob" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor: '#FF8C00', stopOpacity: 1}} /><stop offset="100%" style={{stopColor: '#ff7700', stopOpacity: 0.95}} /></linearGradient></defs>
         </svg>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 h-full w-full max-w-[1400px] mx-auto px-6">
        
        {/* COLUNA ESQUERDA */}
        <div className="md:col-span-5 h-full flex items-end justify-center md:justify-start relative overflow-visible">
             <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C00]/10 to-transparent rounded-full blur-3xl scale-110"></div>
               <img 
                 src="/adorable-dog-isolated.png" 
                 alt="Golden Retriever PetClin"
                 className="h-[65%] md:h-[95%] object-contain z-20 drop-shadow-2xl md:-ml-20 relative"
                 style={{ transform: 'translateX(-5%) scale(1.15)', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.3))' }}
               />
             </div>
        </div>

        {/* COLUNA DIREITA */}
        <div className="md:col-span-7 flex flex-col justify-center items-start pt-20 md:pt-0 pl-4 md:pl-10 w-full">
          
          <div className="flex flex-col w-full font-display font-black uppercase italic leading-[0.9] text-white drop-shadow-2xl tracking-tighter">
            <span className="text-6xl md:text-8xl lg:text-9xl">Seu Pet</span>
            <span className="text-6xl md:text-8xl lg:text-9xl md:ml-24 lg:ml-32">Merece</span>
            <span className="text-7xl md:text-9xl lg:text-[8rem] md:ml-auto text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#ff9933] to-[#ff7700] pb-2">O Melhor.</span>
          </div>

          {/* --- BOTÕES INFERIORES AJUSTADOS --- */}
          <div className="mt-12 flex flex-col md:flex-row gap-4 w-full items-center md:items-end justify-end md:pr-4">
             
             {/* 1. Localização */}
             <div className="hidden md:flex items-center justify-center gap-2 text-white text-sm font-semibold bg-white/10 px-6 border border-white/20 backdrop-blur-md h-14 rounded-lg min-w-[200px]">
                <MapPin size={18} className="text-[#FF8C00]" />
                <span>Feira de Santana - BA</span>
             </div>

             {/* 2. Botão WhatsApp */}
             <button className="group bg-white text-[#006400] px-8 font-black uppercase tracking-wider shadow-lg hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-3 h-14 rounded-lg min-w-[260px]">
                Contato via WhatsApp
                <MessageCircle size={20} className="text-[#FF8C00]" />
             </button>

          </div>
        </div>
        
      </div>
    </div>
  );
}