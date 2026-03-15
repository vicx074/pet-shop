import React, { useEffect, useRef, useState } from 'react';
import { MapPin, User } from 'lucide-react'; 

const DOG_IMAGE = '/adorable-dog-isolated.webp'; 
const PAW_ICON = "https://cdn-icons-png.flaticon.com/512/1076/1076928.png"; 

export default function Hero() {
  const pawsRef = useRef([]);
  const heroRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = DOG_IMAGE;
    img.onload = () => setImageLoaded(true);
    if (img.complete) setImageLoaded(true);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (heroRef.current && scrollY > heroRef.current.offsetHeight) {
            ticking = false;
            return;
          }

          const scrollProgress = Math.min(scrollY / (heroRef.current?.offsetHeight || 1000), 1);
          const baseOpacity = 0.12;

          pawsRef.current.forEach((paw, index) => {
            if (paw) {
              const rotation = scrollProgress * 720 * (index % 2 === 0 ? 1 : -1);
              const translateX = scrollProgress * (index % 2 === 0 ? 250 : -250);
              const translateY = scrollProgress * 300;
              const scale = 1 - scrollProgress * 0.5;
              const opacity = Math.max(0, baseOpacity - (scrollProgress * baseOpacity));

              paw.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotation}deg) scale(${scale})`;
              paw.style.opacity = opacity;
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]); 

  return (
    <div 
      ref={heroRef} 
      className="relative w-full h-screen bg-gradient-to-br from-[#006400] via-[#007a00] to-[#005500] overflow-hidden font-sans flex flex-col justify-between"
      style={{ contentVisibility: 'auto' }} 
    >
      {!isMobile && (
        <>
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px),
                                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`
            }}></div>
          </div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FF8C00] rounded-full blur-3xl opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-white rounded-full blur-3xl opacity-10 pointer-events-none"></div>
        </>
      )}
      
      <div className="absolute top-0 right-0 w-full h-[120px] md:h-[160px] z-20 pointer-events-none">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#f8f8f8', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <path d="M 150,0 L 1440,0 L 1440,160 C 1100,160 900,80 150,0 Z" fill="url(#waveGradient)" />
        </svg>
      </div>

      {[
        { t: '15%', l: '5%', r: 12, w: 'w-12 md:w-20' },
        { t: '40%', l: '-5%', r: -45, w: 'w-16 md:w-28' },
        { t: '5%', l: '10%', r: 90, w: 'w-14 md:w-22', isBottom: true },
        { t: '20%', r: -12, w: 'w-10 md:w-18', isRight: true, pos: '5%' },
        { t: '60%', r: 180, w: 'w-14 md:w-24', isRight: true, pos: '-3%' }
      ].map((p, i) => (
        <div 
          key={i}
          ref={el => pawsRef.current[i] = el} 
          className={`absolute z-10 opacity-0 transition-transform will-change-transform`}
          style={{ 
            top: p.isBottom ? undefined : p.t, 
            bottom: p.isBottom ? p.t : undefined,
            left: p.isRight ? undefined : (p.l || p.pos), 
            right: p.isRight ? p.pos : undefined 
          }}
        >
          <img 
            src={PAW_ICON} 
            loading="lazy" 
            width="100" 
            height="100" 
            className={`${p.w} drop-shadow-2xl filter brightness-0 invert`} 
            style={{ transform: `rotate(${p.r}deg)` }}
            alt="" 
          />
        </div>
      ))}
      
      <div className="absolute bottom-0 left-0 w-[80%] md:w-[45%] h-[50%] md:h-[75%] z-0 pointer-events-none">
         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,100 L0,20 Q30,0 50,30 Q80,80 60,100 Z" fill="url(#orangeBlob)" />
            <defs>
              <linearGradient id="orangeBlob" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FF8C00', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#ff7700', stopOpacity: 0.95}} />
              </linearGradient>
            </defs>
         </svg>
      </div>

      <div className="relative z-10 flex flex-col-reverse md:grid md:grid-cols-12 h-full w-full max-w-[1400px] mx-auto px-6 pb-6 md:pb-0">
        
        <div className="md:col-span-5 h-[40%] md:h-full flex items-end justify-center md:justify-start relative overflow-visible mt-4 md:mt-0">
             <div className="relative w-full h-full flex items-end">
               {!isMobile && (
                 <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C00]/10 to-transparent rounded-full blur-3xl scale-110"></div>
               )}
               
               <div className="w-full h-[120%] md:h-[95%] relative">
                 {imageLoaded ? (
                   <img 
                     src={DOG_IMAGE} 
                     alt="Golden Retriever PetClin"
                     width="600"
                     height="800"
                     fetchPriority="high"
                     decoding="async"
                     className="w-full h-full object-contain z-20 drop-shadow-2xl md:-ml-20"
                     style={{
                       transform: 'translate(-5%, 5%) scale(1.1) scaleX(-1) rotate(65deg)',
                       filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.3))',
                     }}
                   />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center animate-pulse">
                     <div className="w-32 h-32 bg-white/10 rounded-full"></div>
                   </div>
                 )}
               </div>
             </div>
        </div>

        <div className="md:col-span-7 flex flex-col justify-center items-start pt-32 md:pt-0 pl-2 md:pl-10 w-full h-auto md:h-full">
          <div className="flex flex-col w-full font-display font-black uppercase italic leading-[0.9] text-white drop-shadow-2xl tracking-tighter">
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl">Seu Pet</span>
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl ml-12 md:ml-24 lg:ml-32">Merece</span>
            <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[8rem] md:ml-auto text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#ff9933] to-[#ff7700] pb-2">
              O Melhor.
            </span>
          </div>

          <div className="mt-8 md:mt-12 flex flex-col md:flex-row gap-4 w-full items-start md:items-end justify-start md:justify-end md:pr-4">
             <div className="hidden md:flex items-center justify-center gap-3 bg-[#0a3f0a]/60 border border-white/10 px-5 py-3 backdrop-blur-sm rounded-md shadow-sm min-w-[200px]">
                <MapPin size={20} className="text-[#FF8C00]" />
                <span className="text-white text-sm font-bold tracking-wide">Feira de Santana - BA</span>
             </div>

             <a 
               href="https://meu.simplespet.com.br/access/login?a=lindiane-sodre-ramos"
               target="_blank" 
               rel="noopener noreferrer"
               className="group w-full md:w-auto bg-white text-[#006400] px-6 py-4 md:py-3 font-bold uppercase tracking-wide shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 rounded-md min-w-[240px]"
             >
                ÁREA DO CLIENTE
                <User size={20} className="text-[#FF8C00]" />
             </a>
          </div>
        </div>
        
      </div>
    </div>
  );
}