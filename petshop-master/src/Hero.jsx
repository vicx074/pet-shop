import React, { useEffect, useRef } from 'react';
import { Instagram, MapPin, Phone, ArrowRight } from 'lucide-react';

export default function Hero() {
  const pawsRef = useRef([]);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const scrollProgress = Math.min(scrollY / heroHeight, 1);

      // Defini uma opacidade base baixa para elas ficarem transparentes desde o início
      const baseOpacity = 0.12; // Máximo de 12% de opacidade

      pawsRef.current.forEach((paw, index) => {
        if (paw) {
          const rotation = scrollProgress * 720 * (index % 2 === 0 ? 1 : -1);
          // Aumentei um pouco o deslocamento X para elas "fugirem" mais para os lados ao rolar
          const translateX = scrollProgress * (index % 2 === 0 ? 250 : -250); 
          const translateY = scrollProgress * 300;
          const scale = 1 - scrollProgress * 0.5;
          
          // Cálculo novo de opacidade: Começa em 0.12 e vai sumindo
          const opacity = Math.max(0, baseOpacity - (scrollProgress * baseOpacity));

          paw.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg) scale(${scale})`;
          paw.style.opacity = opacity;
        }
      });
    };

    // Chama uma vez para setar a opacidade inicial correta antes do scroll
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={heroRef} className="relative w-full h-screen bg-gradient-to-br from-[#006400] via-[#007a00] to-[#005500] overflow-hidden font-sans flex flex-col justify-between">
      
      {/* GRID PATTERN BACKGROUND */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px),
                            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`
        }}></div>
      </div>

      {/* ANIMATED GRADIENT ORBS */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FF8C00] rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-white rounded-full blur-3xl opacity-10"></div>
      
      {/* ONDA SUPERIOR */}
      <div className="absolute top-0 right-0 w-[70%] h-[220px] z-20 pointer-events-none">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: 'white', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#f8f8f8', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <path d="M150,0 L500,0 L500,120 Q450,150 350,100 T200,40 L150,0 Z" fill="url(#waveGradient)" />
        </svg>
      </div>

      {/* MENU DE NAVEGAÇÃO */}
      <nav className="absolute top-6 right-8 z-30 flex items-center gap-6 text-[#006400] font-bold text-sm backdrop-blur-sm">
          <div className="hidden md:flex gap-8 mr-4">
            <a href="#" className="hover:text-[#FF8C00] transition-all duration-300 relative group">
              Sobre
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="hover:text-[#FF8C00] transition-all duration-300 relative group">
              Especialidades
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="hover:text-[#FF8C00] transition-all duration-300 relative group">
              Internamento
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          
          <a href="#" className="bg-gradient-to-r from-[#FF8C00] to-[#ff7700] text-white px-6 py-2.5 rounded-lg shadow-2xl hover:shadow-[#FF8C00]/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 text-xs md:text-sm relative overflow-hidden group">
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <Phone size={16} className="relative z-10" />
            <span className="relative z-10">Plantão 24h</span>
          </a>
      </nav>

      {/* LOGO */}
      <div className="absolute top-6 left-6 md:left-12 z-30">
        <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-md p-4 rounded-xl shadow-2xl inline-block border border-white/30 hover:scale-105 transition-transform duration-300 hover:shadow-[#FF8C00]/20">
             <img 
               src="/petclin-removebg-preview.png" 
               alt="PetClin Logo" 
               className="h-12 md:h-14 w-auto object-contain"
             />
        </div>
      </div>

      {/* --- PATINHAS REPOSICIONADAS E MAIS ESPALHADAS --- */}
      
      {/* 1. Canto Superior Esquerdo (Bem no topo) */}
      <div ref={el => pawsRef.current[0] = el} className="absolute top-[8%] left-[2%] z-10 opacity-0 transition-all duration-500">
         <img 
            src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" 
            alt="Patinha" 
            className="w-16 md:w-20 drop-shadow-2xl filter brightness-0 invert rotate-12" 
         />
      </div>

      {/* 2. Meio Esquerda (Mais para a borda) */}
      <div ref={el => pawsRef.current[1] = el} className="absolute top-[40%] left-[-2%] z-10 opacity-0 transition-all duration-500">
         <img 
            src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" 
            alt="Patinha" 
            className="w-24 md:w-28 drop-shadow-2xl filter brightness-0 invert -rotate-45" 
         />
      </div>

      {/* 3. Canto Inferior Esquerdo (Bem embaixo) */}
      <div ref={el => pawsRef.current[2] = el} className="absolute bottom-[5%] left-[10%] z-10 opacity-0 transition-all duration-500">
         <img 
            src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" 
            alt="Patinha" 
            className="w-18 md:w-22 drop-shadow-2xl filter brightness-0 invert rotate-90" 
         />
      </div>

      {/* 4. Canto Superior Direito (Longe do menu) */}
      <div ref={el => pawsRef.current[3] = el} className="absolute top-[15%] right-[5%] z-10 opacity-0 transition-all duration-500">
         <img 
            src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" 
            alt="Patinha" 
            className="w-14 md:w-18 drop-shadow-2xl filter brightness-0 invert -rotate-12" 
         />
      </div>

      {/* 5. Meio Direita (Quase saindo da tela) */}
      <div ref={el => pawsRef.current[4] = el} className="absolute top-[50%] right-[-3%] z-10 opacity-0 transition-all duration-500">
         <img 
            src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" 
            alt="Patinha" 
            className="w-20 md:w-24 drop-shadow-2xl filter brightness-0 invert rotate-180" 
         />
      </div>

      {/* 6. Centro Inferior (Atrás do cachorro/texto sutilmente) */}
      <div ref={el => pawsRef.current[5] = el} className="absolute bottom-[15%] left-[45%] z-10 opacity-0 transition-all duration-500">
         <img 
            src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" 
            alt="Patinha" 
            className="w-28 md:w-32 drop-shadow-2xl filter brightness-0 invert rotate-45" 
         />
      </div>

      {/* MANCHA DE FUNDO LARANJA */}
      <div className="absolute bottom-0 left-0 w-[45%] h-[75%] z-0 pointer-events-none">
         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="orangeBlob" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FF8C00', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#ff7700', stopOpacity: 0.95}} />
              </linearGradient>
            </defs>
            <path d="M0,100 L0,20 Q30,0 50,30 Q80,80 60,100 Z" fill="url(#orangeBlob)" />
         </svg>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 h-full w-full max-w-[1400px] mx-auto px-6">
        
        {/* COLUNA ESQUERDA: GOLDEN RETRIEVER */}
        <div className="md:col-span-5 h-full flex items-end justify-center md:justify-start relative overflow-visible">
             <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C00]/10 to-transparent rounded-full blur-3xl scale-110"></div>
               
               <img 
                  src="/adorable-dog-isolated.png" 
                  alt="Golden Retriever PetClin"
                  className="h-[65%] md:h-[95%] object-contain z-20 drop-shadow-2xl md:-ml-20 relative"
                  style={{
                    transform: 'translateX(-5%) scale(1.15)',
                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.3))'
                  }}
               />
             </div>
        </div>

        {/* COLUNA DIREITA: TEXTO */}
        <div className="md:col-span-7 flex flex-col justify-center items-start text-white pt-20 md:pt-0 pl-4 md:pl-10">
          
          <span className="bg-gradient-to-r from-[#FF8C00] to-[#ff7700] text-white px-4 py-2 rounded-lg text-xs font-bold tracking-widest mb-8 uppercase shadow-2xl flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Medicina Veterinária Avançada
          </span>

          <h1 className="text-5xl md:text-[5.5rem] font-display font-black uppercase leading-[0.85] text-white drop-shadow-2xl tracking-tight">
            <span className="inline-block">Seu Pet</span> <br/>
            <span className="inline-block">Merece</span> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#ff9933] to-[#ff7700] italic inline-block">O Melhor.</span>
          </h1>
          
          <p className="mt-10 max-w-lg text-base md:text-lg font-light leading-relaxed border-l-4 border-[#FF8C00] pl-6 backdrop-blur-sm bg-white/5 py-4 rounded-r-md">
            Referência em atendimento 24h. Tecnologia de ponta, diagnósticos precisos e uma equipe apaixonada pelo que faz.
          </p>

          <div className="mt-12 flex flex-wrap gap-4 w-full">
             <button className="bg-white text-[#006400] px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#FF8C00] hover:text-white transition-all duration-300 shadow-2xl hover:shadow-[#FF8C00]/50 flex items-center gap-3 group relative overflow-hidden">
                <span className="relative z-10">Agendar Agora</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300 relative z-10"/>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FF8C00] to-[#ff7700] translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
             </button>
             
             <button className="px-10 py-5 rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-white/10 hover:border-white/60 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm group">
                <MapPin size={20} className="group-hover:scale-110 transition-transform duration-300" />
                Localização
             </button>
          </div>

          <div className="mt-20 flex items-center gap-6 opacity-70 hover:opacity-100 transition-all duration-300 text-sm font-medium">
             <div className="flex items-center gap-3 cursor-pointer hover:text-[#FF8C00] transition-colors duration-300 group">
                <Instagram size={22} className="group-hover:scale-110 transition-transform duration-300" />
                <span>@petclin_feiradesantana</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}