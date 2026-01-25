import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { ArrowRight, ArrowLeft, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Certifique-se que o caminho do arquivo está correto. 
// Se você criou a pasta components, mude para: import('./components/ServiceModal')
const ServiceModal = React.lazy(() => import('./ServiceModal'));

// --- 1. DADOS E CONFIGURAÇÕES ---
const slides = [
  {
    id: 1,
    theme: {
      bg: "#008000",
      text: "#ffffff",
      accent: "#FF8C00",
      border: "#FF8C00",
      buttonText: "#008000",
      buttonBg: "#ffffff"
    },
    category: "ESTRUTURA",
    nameLine1: "CLÍNICA",
    nameLine2: "VETERINÁRIA",
    scriptName: "excelência",
    description: "Oferecemos em nossa estrutura salas de atendimento amplas e climatizadas, internamento monitorado e sala de cirurgia com todo suporte necessário.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
    details: {
      title: "Cuidado Profissional",
      coverImage: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=800&auto=format&fit=crop", 
      sections: [
        {
          heading: "Atendimento Clínico",
          text: "A nossa clínica veterinária conta com ambientes climatizados e equipamentos modernos, que nos permitem proporcionar um atendimento diferenciado ao seu animal."
        },
        {
          heading: "A Equipe",
          text: "O corpo de veterinários de nossa clínica é formado por profissionais capacitados e que amam o que fazem. Você pode ter a certeza e a tranquilidade de que eles irão tratar o seu animal com muito respeito e carinho."
        }
      ]
    }
  },
  {
    id: 2,
    theme: {
      bg: "#F5F5DC",
      text: "#003300",
      accent: "#FF8C00",
      border: "#006400",
      buttonText: "#ffffff",
      buttonBg: "#006400"
    },
    category: "ESTÉTICA",
    nameLine1: "BANHO",
    nameLine2: "& TOSA",
    scriptName: "cuidado",
    description: "Nosso salão de beleza animal está cheio de novidades! Banhos, hidratações e tosas especiais (higiênica, padrão e na tesoura).",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop",
    details: {
      title: "Spa & Estética",
      coverImage: "/spa-estetica.webp", 
      sections: [
        {
          heading: "Banho",
          text: "O nosso salão de beleza animal oferece os mais diversos tipos de banhos para a higiene e conforto do seu pet. Banhos calmantes, hidratações e tratamentos diferenciados. Traga o seu pet para relaxar com a gente!"
        },
        {
          heading: "Tosa",
          text: "A tosa é realizada tanto para estética, quanto para a higiene do seu animal. Nossos profissionais são habilitados para diversas modalidades de tosa, utilizando a máquina ou a tesoura."
        },
        {
          heading: "Transporte",
          text: "Se você não puder trazer seu animal até a nossa clínica, nós fazemos isso para você. É só entrar em contato conosco."
        }
      ]
    }
  },
  {
    id: 3,
    theme: {
      bg: "#FF8C00",
      text: "#ffffff",
      accent: "#006400",
      border: "#ffffff",
      buttonText: "#FF8C00",
      buttonBg: "#ffffff"
    },
    category: "LOJA",
    nameLine1: "PETSHOP",
    nameLine2: "& FARMÁCIA",
    scriptName: "tudo pro seu pet",
    description: "Um ambiente organizado onde você encontra tudo para o dia-a-dia. Ampla variedade de produtos da mais alta qualidade e farmácia completa.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800&auto=format&fit=crop",
    details: {
      title: "Boutique Pet",
      coverImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop", 
      sections: [
        {
          heading: "Loja",
          text: "A nossa loja conta com diversos artigos que vão fazer a alegria do seu pet. Caminhas, coleiras, sapatos, travesseiros e dezenas de brinquedos. E tudo isso em um ambiente agradável e acessorado."
        },
        {
          heading: "Farmácia",
          text: "Na farmácia da nossa clínica você encontrará tudo o que você precisa para ajudar a manter a saúde de seu animal. Contamos com um mix de medicamentos diferenciados com o melhor preço."
        }
      ]
    }
  }
];

// --- 2. COMPONENTES AUXILIARES CORRIGIDOS ---

const LetterReveal = React.memo(({ text, color, customDelay = 0, isMobile }) => {
  // CORREÇÃO: Hooks declarados ANTES de qualquer return
  const letters = useMemo(() => text.split(""), [text]);
  
  const container = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.2 + customDelay } }
  }), [customDelay]);
  
  const child = useMemo(() => ({
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 40, transition: { type: "spring", damping: 12, stiffness: 100 } }
  }), []);

  // Agora podemos fazer o retorno condicional
  if (isMobile) {
    return (
      <motion.div 
        style={{ display: "flex", overflow: "hidden", color }} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 + customDelay }}
      >
        {text}
      </motion.div>
    );
  }
  
  return (
    <motion.div style={{ display: "flex", overflow: "hidden" }} variants={container} initial="hidden" animate="visible">
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} style={{ color }}>{letter === " " ? "\u00A0" : letter}</motion.span>
      ))}
    </motion.div>
  );
});

const WordReveal = React.memo(({ text, color, isMobile }) => {
  // CORREÇÃO: Hooks declarados ANTES de qualquer return
  const words = useMemo(() => text.split(" "), [text]);

  const container = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.6 } }
  }), []);
  
  const child = useMemo(() => ({
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 100 } }
  }), []);

  // Agora podemos fazer o retorno condicional
  if (isMobile) {
    return (
      <motion.div 
        style={{ color, textAlign: 'center' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        {text}
      </motion.div>
    );
  }
  
  return (
    <motion.div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} variants={container} initial="hidden" animate="visible">
      {words.map((word, index) => (
        <motion.span variants={child} key={index} style={{ color, marginRight: "0.3em" }}>{word}</motion.span>
      ))}
    </motion.div>
  );
});

// --- 3. COMPONENTE PRINCIPAL ---
export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) return; 
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const currentSlide = slides[currentIndex];
  const currentTheme = currentSlide.theme;

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = currentSlide.image;
    img.onload = () => setImageLoaded(true);
    if (img.complete) setImageLoaded(true);
  }, [currentIndex, currentSlide.image]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) === slides.length ? 0 : prev + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1) < 0 ? slides.length - 1 : prev - 1);
  };

  const pageVariants = {
    initial: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  return (
    <div 
      className="relative w-full min-h-screen overflow-hidden flex flex-col border-[8px] md:border-[16px] transition-colors duration-700 ease-in-out font-sans select-none" 
      style={{ 
        backgroundColor: currentTheme.bg, 
        borderColor: '#ffffff',
        boxSizing: 'border-box',
      }}
    >
      {/* Botões de Navegação Desktop */}
      <button onClick={handlePrev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all border border-white/20 shadow-lg group hidden md:block" style={{ color: currentTheme.text }}>
        <ArrowLeft className="w-6 h-6 md:w-10 md:h-10 transition-transform group-hover:-translate-x-1" strokeWidth={2} />
      </button>

      <button onClick={handleNext} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all border border-white/20 shadow-lg group hidden md:block" style={{ color: currentTheme.text }}>
        <ArrowRight className="w-6 h-6 md:w-10 md:h-10 transition-transform group-hover:translate-x-1" strokeWidth={2} />
      </button>

      {/* CONTEÚDO */}
      <div className="flex-1 container mx-auto flex items-center justify-center px-6 md:px-24 relative z-10">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) handleNext();
              else if (swipe > swipeConfidenceThreshold) handlePrev();
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full grid md:grid-cols-12 gap-6 md:gap-10 items-center h-full pt-12 md:pt-0 cursor-grab active:cursor-grabbing"
          >
            {/* ESQUERDA - Texto */}
            <div className="md:col-span-7 flex flex-col items-center text-center justify-center pointer-events-none md:pointer-events-auto">
              <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3 }}
                className="mb-4 md:mb-8 border px-4 py-1.5 transition-colors duration-500 rounded-full"
                style={{ borderColor: currentTheme.text }}
              >
                <span className="text-xs md:text-sm tracking-[0.25em] font-bold uppercase" style={{ color: currentTheme.text }}>
                  {currentSlide.category}
                </span>
              </motion.div>

              <div className="relative mb-6 flex flex-col items-center">
                <div className="text-5xl md:text-8xl lg:text-[100px] leading-[0.9] font-black uppercase tracking-tight flex flex-col items-center" style={{ fontFamily: 'Impact, sans-serif' }}>
                  <LetterReveal text={currentSlide.nameLine1} color={currentTheme.text} customDelay={0} isMobile={isMobile} />
                  <LetterReveal text={currentSlide.nameLine2} color={currentTheme.text} customDelay={0.3} isMobile={isMobile} />
                </div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: -15, x: 20 }}
                  animate={{ opacity: 1, scale: 1, rotate: -6, x: 0 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-8 z-10"
                  style={{ color: currentTheme.accent, textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}
                >
                  <span className="font-serif italic text-3xl md:text-6xl font-bold tracking-tighter whitespace-nowrap">
                    {currentSlide.scriptName}
                  </span>
                </motion.div>
              </div>

              <div className="max-w-xl text-sm md:text-lg leading-relaxed font-medium mt-2 px-2 md:px-0">
                <WordReveal text={currentSlide.description} color={currentTheme.text} isMobile={isMobile} />
              </div>
            </div>

            {/* DIREITA - Imagem + Botão */}
            <div className="md:col-span-5 h-[35vh] md:h-[75vh] w-full relative flex items-center justify-center pb-8 md:pb-0">
               <motion.div 
                 className="relative w-full h-full border-[6px] md:border-[10px] z-20 overflow-hidden shadow-2xl rounded-sm bg-white/10"
                 style={{ borderColor: currentTheme.border }}
               >
                 {imageLoaded && (
                   <img 
                     src={currentSlide.image} 
                     alt={currentSlide.category}
                     width="800"
                     height="600"
                     decoding="async"
                     className="w-full h-full object-cover pointer-events-none"
                   />
                 )}
                 
                 <div className="absolute top-0 right-0 p-0 m-0 z-30 pointer-events-auto"> 
                     <button 
                       onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }} 
                       className="group px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-black flex items-center gap-2 uppercase tracking-widest transition-all duration-300 hover:pr-8 cursor-pointer"
                       style={{ backgroundColor: currentTheme.buttonBg, color: currentTheme.buttonText, borderBottomLeftRadius: '8px' }}
                     >
                       VER DETALHES <Plus size={16} strokeWidth={3} className="transition-transform duration-300 group-hover:rotate-90" />
                     </button>
                 </div>
               </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PAGINAÇÃO */}
      <div className="absolute bottom-6 left-10 right-10 flex gap-3 z-20 justify-center">
         {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
              className="h-2 flex-1 rounded-full transition-all duration-300 cursor-pointer hover:h-3"
              style={{ backgroundColor: idx === currentIndex ? (currentTheme.text === '#ffffff' ? '#ffffff' : currentTheme.border) : (currentTheme.text === '#ffffff' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)') }}
            />
         ))}
      </div>

      {/* MODAL COM SUSPENSE PARA LAZY LOADING */}
      <Suspense fallback={null}>
        <ServiceModal 
          slide={currentSlide} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </Suspense>

    </div>
  );
}