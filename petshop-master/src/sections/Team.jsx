import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: "Dr. Roberto Alves",
    role: "Cirurgia Geral",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop", 
  },
  {
    id: 2,
    name: "Dra. Camila Fontes",
    role: "Dermatologia Veterinária",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Dr. Fernando Souza",
    role: "Ortopedia & Fisio",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Dra. Juliana Mendes",
    role: "Felinos",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop",
  }
];

export default function Team() {
  // Variantes para a entrada suave dos cards na tela
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 100 } }
  }), []);

  return (
    <section 
      id="equipe" 
      // content-visibility ajuda muito no LCP e INP, pois o navegador só renderiza a seção quando ela chega perto da tela
      className="relative w-full py-24 md:py-32 bg-[#002b00] overflow-hidden content-visibility-auto"
    >
      
      {/* 1. LETREIRO GIGANTE (MARQUEE CSS PURO PARA PERFORMANCE) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.03] pointer-events-none z-0">
        <div className="inline-block animate-[marquee_30s_linear_infinite]">
          <span className="text-[12rem] md:text-[20rem] font-black uppercase tracking-tighter text-white">
            SEU PET EM BOAS MÃOS • CUIDADO DE EXCELÊNCIA • SEU PET EM BOAS MÃOS •
          </span>
        </div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        
        {/* CABEÇALHO DA SEÇÃO (Centralizado no mobile) */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-24 gap-6 text-center md:text-left">
          <div className="max-w-2xl flex flex-col items-center md:items-start">
            <span className="text-[#FF8C00] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 md:mb-4 block">
              Quem Cuida do seu Pet
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.9] tracking-tighter">
              Nossa <br className="hidden md:block"/> Equipe.
            </h2>
          </div>
          <p className="text-white/60 text-sm md:text-base font-medium max-w-sm">
            Profissionais apaixonados, altamente qualificados e prontos para atender qualquer emergência.
          </p>
        </div>

        {/* GRID DE CARDS (Max-width no mobile para não ficar gigante) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 max-w-[280px] sm:max-w-none mx-auto"
        >
          {teamMembers.map((member) => (
            <motion.div 
              key={member.id} 
              variants={cardVariants}
              className="group relative cursor-pointer flex flex-col"
            >
              
              {/* CONTAINER DA IMAGEM - ASPECT RATIO FIXO PARA ZERO CLS */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#001a00] rounded-sm mb-6 border border-white/10 group-hover:border-[#FF8C00]/50 transition-colors duration-500">
                <img 
                  src={member.image} 
                  alt={`Foto do ${member.name}`}
                  loading="lazy"
                  decoding="async"
                  // width e height são ignorados visualmente por causa do h-full w-full, mas obrigatórios para o navegador calcular o espaço (CLS)
                  width="400"
                  height="533"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                
                {/* OVERLAY SUTIL */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#002b00] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* ÍCONE DE REVEAL (Aparece no hover) */}
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-[#FF8C00] text-white flex items-center justify-center rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                   <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </div>
              </div>

              {/* INFORMAÇÕES DO VETERINÁRIO */}
              <div className="flex flex-col relative">
                {/* Linha laranja que "estica" no hover */}
                <div className="w-0 h-0.5 bg-[#FF8C00] mb-3 group-hover:w-12 transition-all duration-500 ease-out"></div>
                
                <h3 className="text-2xl font-black uppercase text-white tracking-tight mb-1 group-hover:text-[#FF8C00] transition-colors text-center md:text-left">
                  {member.name}
                </h3>
                <p className="text-white/50 font-serif italic text-lg group-hover:text-white/80 transition-colors text-center md:text-left">
                  {member.role}
                </p>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}