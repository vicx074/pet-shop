import React, { useEffect, useRef, useState } from 'react';

export default function SmoothScroll({ children }) {
  const scrollRef = useRef(null);
  const requestRef = useRef(null);
  const currentScroll = useRef(0);
  const targetScroll = useRef(0);
  
  // Estado para saber se é mobile
  const [isMobile, setIsMobile] = useState(true); // Começa true para evitar CLS/Pulos

  useEffect(() => {
    // Função simples para detectar mobile pela largura
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768; // 768px é o padrão tablet/mobile
      setIsMobile(isMobileDevice);
      
      // Se for mobile, garante que limpamos a altura forçada do body
      if (isMobileDevice) {
        document.body.style.height = '';
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lógica do Smooth Scroll (SÓ RODA SE NÃO FOR MOBILE)
  useEffect(() => {
    if (isMobile) return; // Aborta se for mobile

    const handleScroll = () => {
      targetScroll.current = window.scrollY;
    };

    const smoothScroll = () => {
      // Lerp
      currentScroll.current += (targetScroll.current - currentScroll.current) * 0.08;

      // Pequena otimização: Só aplica o transform se a diferença for relevante (economiza CPU)
      if (Math.abs(targetScroll.current - currentScroll.current) > 0.1) {
          if (scrollRef.current) {
            scrollRef.current.style.transform = `translate3d(0, -${currentScroll.current}px, 0)`; // translate3d ativa aceleração de hardware
          }
          requestRef.current = requestAnimationFrame(smoothScroll);
      } else {
          // Se parou de mexer, garante que alinhou e para o loop
          if (scrollRef.current) {
             scrollRef.current.style.transform = `translate3d(0, -${targetScroll.current}px, 0)`;
          }
          requestRef.current = requestAnimationFrame(smoothScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    requestRef.current = requestAnimationFrame(smoothScroll);

    // ResizeObserver para atualizar a altura do body se o conteúdo mudar dinamicamente
    const resizeObserver = new ResizeObserver(() => {
      if (scrollRef.current && !isMobile) {
        document.body.style.height = `${scrollRef.current.offsetHeight}px`;
      }
    });

    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      resizeObserver.disconnect();
      document.body.style.height = ''; // Limpa ao desmontar
    };
  }, [isMobile, children]); // Recria se mudar de mobile para desktop

  // Renderização Condicional
  if (isMobile) {
    // No mobile, retorna o conteúdo puro (Scroll Nativo = Performance Máxima)
    return <main>{children}</main>;
  }

  return (
    <div className="fixed top-0 left-0 w-full overflow-hidden">
      <div ref={scrollRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}