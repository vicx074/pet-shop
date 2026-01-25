import React, { useEffect, useRef } from 'react';
import { Phone, MapPin, Calendar, ArrowRight } from 'lucide-react';

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
      
      {/* --- ONDA SUPERIOR */}
      <div className="absolute top-0 right-0 w-full h-[240px] z-20 pointer-events-none">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full drop-shadow-xl">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#f5f5f5', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          {/* Curva suavizada para dar mais área branca no topo direito */}
          <path 
            d="M 0,0 L 1440,0 L 1440,280 C 1100,290 850,100 0,0 Z" 
            fill="url(#waveGradient)" 
          />
        </svg>
      </div>

      {/* --- HEADER --- */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-end px-6 pt-6">
        <nav className="max-w-[1400px] w-full flex justify-end items-center gap-8">
            
            {/* LINKS*/}
            <div className="hidden lg:flex gap-8 items-center">
              {['Sobre', 'Especialidades', 'Internamento'].map((item) => (
                <a key={item} href="#" className="text-[#006400] font-bold text-sm uppercase tracking-wide hover:text-[#FF8C00] transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-6">
              {/* BOTÃO PLANTÃO (Emergência) */}
              <a href="#" className="bg-[#FF8C00] text-white px-5 py-3 rounded-lg font-bold text-xs md:text-sm shadow-lg hover:bg-[#e67e00] hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Phone size={18} />
                <span className="whitespace-nowrap">PLANTÃO 24H</span>
              </a>

              {/* LOGO PETCLIN */}
              <a href="#" className="block hover:opacity-90 transition-opacity">
                <img 
                  src="/petclin-removebg-preview.png" 
                  alt="PetClin Logo" 
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                />
              </a>
            </div>

        </nav>
      </div>

      {/* ELEMENTOS DECORATIVOS (Patinhas) */}
      <div ref={el => pawsRef.current[0] = el} className="absolute top-[8%] left-[2%] z-10 opacity-0"><img src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" className="w-16 md:w-20 drop-shadow-2xl filter brightness-0 invert rotate-12" /></div>
      <div ref={el => pawsRef.current[1] = el} className="absolute top-[40%] left-[-2%] z-10 opacity-0"><img src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" className="w-24 md:w-28 drop-shadow-2xl filter brightness-0 invert -rotate-45" /></div>
      <div ref={el => pawsRef.current[2] = el} className="absolute bottom-[5%] left-[10%] z-10 opacity-0"><img src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" className="w-18 md:w-22 drop-shadow-2xl filter brightness-0 invert rotate-90" /></div>
      <div ref={el => pawsRef.current[3] = el} className="absolute top-[15%] right-[5%] z-10 opacity-0"><img src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" className="w-14 md:w-18 drop-shadow-2xl filter brightness-0 invert -rotate-12" /></div>
      <div ref={el => pawsRef.current[4] = el} className="absolute top-[50%] right-[-3%] z-10 opacity-0"><img src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" className="w-20 md:w-24 drop-shadow-2xl filter brightness-0 invert rotate-180" /></div>
      <div ref={el => pawsRef.current[5] = el} className="absolute bottom-[15%] left-[45%] z-10 opacity-0"><img src="https://cdn-icons-png.flaticon.com/512/1076/1076928.png" className="w-28 md:w-32 drop-shadow-2xl filter brightness-0 invert rotate-45" /></div>

      {/* MANCHA LARANJA INFERIOR */}
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
          
          {/* TIPOGRAFIA */}
          <div className="flex flex-col w-full font-display font-black uppercase italic leading-[0.9] text-white drop-shadow-2xl tracking-tighter">
            <span className="text-6xl md:text-8xl lg:text-9xl">Seu Pet</span>
            <span className="text-6xl md:text-8xl lg:text-9xl md:ml-24 lg:ml-32">Merece</span>
            <span className="text-7xl md:text-9xl lg:text-[8rem] md:ml-auto text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#ff9933] to-[#ff7700] pb-2">O Melhor.</span>
          </div>

          {/* BOTÃO E LOCALIZAÇÃO  */}
          <div className="mt-12 flex flex-col md:flex-row gap-6 w-full items-center md:items-end justify-end md:pr-4">
             
             {/* Localização Sutil */}
             <div className="hidden md:flex items-center gap-2 text-white/90 text-sm font-medium bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
                <MapPin size={16} className="text-[#FF8C00]" />
                <span>Feira de Santana - BA</span>
             </div>

             {/* Botão Principal de Conversão */}
             <button className="group bg-white text-[#006400] px-8 py-4 rounded-full font-black uppercase tracking-wider shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0_20px_50px_rgba(255,140,0,0.4)] transition-all duration-300 flex items-center gap-3">
                Agendar Agora
                <ArrowRight size={22} className="group-hover:translate-x-1 text-[#FF8C00] transition-transform" />
             </button>

          </div>
        </div>
        
      </div>
    </div>
  );
}