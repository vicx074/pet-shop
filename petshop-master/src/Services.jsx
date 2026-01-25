import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DADOS E CONFIGURAÇÕES DE TEMA ---
const slides = [
  {
    id: 1,
    // Tema 1: Clínica (Verde Institucional)
    theme: {
      bg: "#008000",       
      text: "#ffffff",     
      accent: "#FF8C00",   // Laranja (Script e detalhes)
      border: "#FF8C00",
      buttonText: "#008000",
      buttonBg: "#ffffff"
    },
    category: "ESTRUTURA",
    nameLine1: "CLÍNICA",
    nameLine2: "VETERINÁRIA",
    scriptName: "excelência",
    description: "Oferecemos em nossa estrutura salas de atendimento amplas e climatizadas, internamento monitorado e sala de cirurgia com todo suporte necessário.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop", 
  },
  {
    id: 2,
    // Tema 2: Banho e Tosa (Bege Clean)
    theme: {
      bg: "#F5F5DC",       
      text: "#003300",     // Verde escuro fechado (Melhor contraste)
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
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop", 
  },
  {
    id: 3,
    // Tema 3: Petshop (Laranja Vibrante)
    theme: {
      bg: "#FF8C00",       
      text: "#ffffff",     
      accent: "#006400",   // Verde escuro (Script)
      border: "#ffffff",
      buttonText: "#FF8C00",
      buttonBg: "#ffffff"
    },
    category: "LOJA",
    nameLine1: "PETSHOP",
    nameLine2: "& FARMÁCIA",
    scriptName: "tudo pro seu pet",
    description: "Um ambiente organizado onde você encontra tudo para o dia-a-dia. Ampla variedade de produtos da mais alta qualidade e farmácia completa.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2070&auto=format&fit=crop", 
  }
];

// --- COMPONENTES VISUAIS (ANIMAÇÕES DE TEXTO) ---

// Efeito Cascata: Letra por Letra (Usado no Título)
const LetterReveal = ({ text, color, customDelay = 0 }) => {
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({ 
      opacity: 1, 
      transition: { staggerChildren: 0.04, delayChildren: 0.2 + customDelay } 
    })
  };

  const child = {
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", damping: 12, stiffness: 100 } 
    },
    hidden: { 
      opacity: 0, 
      y: 40, // Vem de baixo
      transition: { type: "spring", damping: 12, stiffness: 100 } 
    }
  };

  return (
    <motion.div style={{ display: "flex", overflow: "hidden" }} variants={container} initial="hidden" animate="visible">
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} style={{ color }}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Efeito Cascata: Palavra por Palavra (Usado na Descrição)
const WordReveal = ({ text, color }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({ 
      opacity: 1, 
      transition: { staggerChildren: 0.05, delayChildren: 0.6 } 
    })
  };

  const child = {
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", damping: 12, stiffness: 100 } 
    },
    hidden: { 
      opacity: 0, 
      y: 20, 
      transition: { type: "spring", damping: 12, stiffness: 100 } 
    }
  };

  return (
    <motion.div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} variants={container} initial="hidden" animate="visible">
      {words.map((word, index) => (
        <motion.span variants={child} key={index} style={{ color, marginRight: "0.3em" }}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function PetClinPortfolioSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Handlers de Navegação
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) === slides.length ? 0 : prev + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1) < 0 ? slides.length - 1 : prev - 1);
  };

  const currentSlide = slides[currentIndex];
  const currentTheme = currentSlide.theme;

  // Variantes de Transição de Slide
  const pageVariants = {
    initial: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 100 : -100, opacity: 0 })
  };

  return (
    <div 
      className="relative w-full min-h-screen overflow-hidden flex flex-col border-[12px] md:border-[16px] transition-colors duration-700 ease-in-out font-sans" 
      style={{ 
        backgroundColor: currentTheme.bg, 
        borderColor: '#ffffff', // Borda Externa Branca Fixa
        boxSizing: 'border-box' 
      }}
    >
      
      {/* --- NAVEGAÇÃO LATERAL (SETAS) --- */}
      <button 
        onClick={handlePrev}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-40 hover:scale-110 active:scale-95 transition-transform duration-200 p-2"
        style={{ color: currentTheme.text }}
      >
        <ArrowLeft size={48} strokeWidth={1.5} />
      </button>

      <button 
        onClick={handleNext}
        className="absolute right-2 md:left-[55%] top-1/2 -translate-y-1/2 z-40 hover:scale-110 active:scale-95 transition-transform duration-200 p-2"
        style={{ color: currentTheme.text }}
      >
        <ArrowRight size={48} strokeWidth={1.5} />
      </button>

      {/* --- ÁREA DE CONTEÚDO CENTRAL --- */}
      <div className="flex-1 container mx-auto flex items-center justify-center px-6 md:px-0 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full grid md:grid-cols-12 gap-10 items-center h-full"
          >
            
            {/* COLUNA ESQUERDA: TEXTO E INFO */}
            <div className="md:col-span-7 flex flex-col items-center text-center justify-center pt-8 md:pt-0">
              
              {/* Tag Categoria */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="mb-4 md:mb-8 border px-4 py-1.5 transition-colors duration-500 rounded-full"
                style={{ borderColor: currentTheme.text }}
              >
                <span className="text-xs md:text-sm tracking-[0.25em] font-bold uppercase" style={{ color: currentTheme.text }}>
                  {currentSlide.category}
                </span>
              </motion.div>

              {/* Bloco de Título Principal */}
              <div className="relative mb-6 flex flex-col items-center">
                <div 
                  className="text-6xl md:text-8xl lg:text-[100px] leading-[0.9] font-black uppercase tracking-tight flex flex-col items-center" 
                  style={{ fontFamily: 'Impact, sans-serif' }}
                >
                  <LetterReveal text={currentSlide.nameLine1} color={currentTheme.text} customDelay={0} />
                  <LetterReveal text={currentSlide.nameLine2} color={currentTheme.text} customDelay={0.3} />
                </div>

                {/* Texto Cursivo (Script) - Canto Inferior Direito */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: -15, x: 20 }}
                  animate={{ opacity: 1, scale: 1, rotate: -6, x: 0 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -bottom-4 -right-2 md:-right-8 z-10"
                  style={{ color: currentTheme.accent, textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}
                >
                  <span className="font-serif italic text-4xl md:text-6xl font-bold tracking-tighter whitespace-nowrap">
                    {currentSlide.scriptName}
                  </span>
                </motion.div>
              </div>

              {/* Descrição */}
              <div className="max-w-xl text-sm md:text-lg leading-relaxed font-medium mt-4 px-4 md:px-0">
                <WordReveal text={currentSlide.description} color={currentTheme.text} />
              </div>

            </div>

            {/* COLUNA DIREITA: IMAGEM + BOTÃO */}
            <div className="md:col-span-5 h-[40vh] md:h-[75vh] w-full relative flex items-center justify-center pb-8 md:pb-0">
               <motion.div 
                 initial={{ scale: 0.95, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 0.6, ease: "easeOut" }}
                 // Borda mais fina (md:border-[10px]) para suavizar
                 className="relative w-full h-full border-[8px] md:border-[10px] z-20 overflow-hidden shadow-2xl rounded-sm"
                 style={{ borderColor: currentTheme.border }}
               >
                  {/* Imagem */}
                  <img 
                    src={currentSlide.image} 
                    alt={currentSlide.category} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Botão de Ação (Canto Superior Direito) */}
                  <div className="absolute top-0 right-0 p-0 m-0 z-30">
                     <button 
                       className="group px-6 py-3 text-xs md:text-sm font-black flex items-center gap-2 uppercase tracking-widest transition-all duration-300 hover:pr-8 cursor-pointer"
                       style={{ 
                         backgroundColor: currentTheme.theme?.buttonBg || 'rgba(255,255,255,0.9)', 
                         color: currentTheme.theme?.buttonText || '#000',
                         borderBottomLeftRadius: '8px'
                       }}
                     >
                        VER DETALHES 
                        <Plus size={16} strokeWidth={3} className="transition-transform duration-300 group-hover:rotate-90" />
                     </button>
                  </div>
               </motion.div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- PAGINAÇÃO INFERIOR --- */}
      <div className="absolute bottom-6 left-10 right-10 flex gap-3 z-20">
         {slides.map((_, idx) => (
            <div 
              key={idx}
              className="h-2 flex-1 rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: idx === currentIndex 
                  ? (currentTheme.text === '#ffffff' ? '#ffffff' : currentTheme.border) 
                  : (currentTheme.text === '#ffffff' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)')
              }}
            />
         ))}
      </div>

    </div>
  );
}