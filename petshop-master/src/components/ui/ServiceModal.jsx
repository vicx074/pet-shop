import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const ServiceModal = ({ slide, isOpen, onClose }) => {
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Deixamos apenas o overflow hidden para não rolar o fundo
      document.body.style.overflow = 'hidden';
      
      // Preload da imagem do modal
      if (slide?.details?.coverImage) {
        const img = new Image();
        img.src = slide.details.coverImage;
        img.onload = () => setModalImageLoaded(true);
      }
    } else {
      document.body.style.overflow = '';
      setModalImageLoaded(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, slide]);

  if (!slide) return null;

  const { theme, details } = slide;

  // Renderizamos o modal no 'document.body' usando createPortal 
  // para tirá-lo do fluxo do SmoothScroll
  return createPortal(
    <div className={`fixed inset-0 z-[9999] w-full h-full ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal-backdrop"
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{ backgroundColor: theme.bg, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <button 
              onClick={onClose}
              className="fixed top-4 right-4 md:top-6 md:right-6 z-[10000] p-2 rounded-full hover:scale-110 transition-transform shadow-lg bg-white/20 backdrop-blur-md border border-white/30 cursor-pointer"
              style={{ color: theme.text }}
              aria-label="Fechar"
            >
              <X size={28} />
            </button>

            <motion.div 
              className="w-full h-full flex flex-col-reverse md:flex-row overflow-hidden"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%", opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{ height: '100dvh' }}
            >
              
              {/* LADO TEXTO */}
              <div className="w-full md:w-1/2 h-[65vh] md:h-full flex flex-col relative overflow-hidden">
                 <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-8 md:px-20 md:py-24" style={{ WebkitOverflowScrolling: 'touch' }}>
                    <motion.h2 
                      className="text-4xl md:text-7xl font-black uppercase mb-8 md:mb-12 tracking-tighter leading-none"
                      style={{ color: theme.text }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {details.title}
                      <span className="block text-xl md:text-3xl font-serif italic normal-case mt-2 opacity-80" style={{ color: theme.accent }}>
                        {slide.scriptName}
                      </span>
                    </motion.h2>

                    <div className="space-y-8 md:space-y-10 pb-10">
                      {details.sections.map((section, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + (idx * 0.1) }}
                          className="border-l-4 pl-4 md:pl-6"
                          style={{ borderColor: theme.accent }}
                        >
                          <h3 className="text-xl md:text-2xl font-bold uppercase mb-2 md:mb-3" style={{ color: theme.text }}>
                            {section.heading}
                          </h3>
                          <p className="text-sm md:text-lg leading-relaxed font-medium opacity-90" style={{ color: theme.text }}>
                            {section.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                 </div>
              </div>

              {/* LADO IMAGEM */}
              <div className="w-full h-[35vh] md:h-full md:w-1/2 relative overflow-hidden flex-shrink-0">
                <motion.div 
                  className="w-full h-full relative"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                >
                  <div className="absolute inset-0 bg-black/20 z-10"></div>
                  {modalImageLoaded ? (
                    <img 
                      src={details.coverImage} 
                      alt={details.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: theme.bg }}>
                      <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: theme.text, borderTopColor: 'transparent' }}></div>
                    </div>
                  )}
                </motion.div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body // O portal empurra o HTML pra fora da sua Div do scroll
  );
};

export default ServiceModal;