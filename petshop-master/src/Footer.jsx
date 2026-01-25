import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  
  // Animação dos itens ao aparecer na tela
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <footer className="relative bg-[#002b00] text-white pt-24 pb-8 overflow-hidden font-sans">
      
      {/* ELEMENTO DECORATIVO DE FUNDO (Patinha Gigante Sutil) */}
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] opacity-[0.03] pointer-events-none rotate-12">
        <svg viewBox="0 0 512 512" fill="currentColor">
          <path d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M256,464C141.1,464,48,370.9,48,256S141.1,48,256,48s208,93.1,208,208S370.9,464,256,464z"/>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- CABEÇALHO DE AÇÃO --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-16 mb-16 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
              Seu Pet em <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#ffaa44]">Boas Mãos.</span>
            </h2>
            <p className="text-white/60 text-lg font-medium max-w-md">
              Cuidado veterinário de excelência, disponível a qualquer hora do dia ou da noite.
            </p>
          </div>

          <a 
            href="https://wa.me/5575992996010" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-[#FF8C00] hover:bg-[#ff7700] text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-900/20"
          >
            <span className="font-bold uppercase tracking-widest text-sm">Agendar Agora no Whatsapp</span>
            <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </motion.div>


        {/* --- GRID DE INFORMAÇÕES --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20"
        >
          
          {/* COLUNA 1: ENDEREÇO */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2 text-[#FF8C00] mb-2">
              <MapPin size={24} />
              <h3 className="font-bold uppercase tracking-wider text-sm">Localização</h3>
            </div>
            <p className="text-xl font-medium leading-relaxed text-white/90">
              Rua Antônio Carlos Magalhães, 1372 <br/>
              Cidade Nova <br/>
              Feira de Santana - BA
            </p>
            <a 
              href="https://maps.google.com/?q=Rua+Antônio+Carlos+Magalhães+1372+Feira+de+Santana" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-sm font-bold text-[#FF8C00] border-b border-[#FF8C00]/30 hover:border-[#FF8C00] pb-0.5 transition-colors"
            >
              Ver no Google Maps
            </a>
          </motion.div>

          {/* COLUNA 2: CONTATO */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2 text-[#FF8C00] mb-2">
              <Phone size={24} />
              <h3 className="font-bold uppercase tracking-wider text-sm">Fale Conosco</h3>
            </div>
            <div className="flex flex-col gap-2">
              <a href="tel:+557530306010" className="text-xl font-medium hover:text-[#FF8C00] transition-colors">(75) 3030-6010</a>
              <a href="https://wa.me/5575992996010" className="text-xl font-medium hover:text-[#FF8C00] transition-colors">(75) 99299-6010</a>
            </div>
            <div className="pt-2 flex items-center gap-3">
               <Mail size={18} className="text-[#FF8C00]" />
               <a href="mailto:atendimento.petclin2019@gmail.com" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                 atendimento.petclin2019@gmail.com
               </a>
            </div>
          </motion.div>

          {/* COLUNA 3: HORÁRIO */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2 text-[#FF8C00] mb-2">
              <Clock size={24} />
              <h3 className="font-bold uppercase tracking-wider text-sm">Horário</h3>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg backdrop-blur-sm">
               <span className="block text-4xl font-black text-[#FF8C00] mb-1">24 HORAS</span>
               <span className="text-white/60 text-sm font-medium uppercase tracking-wide">
                 Segunda a Segunda
               </span>
               <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
                 <div className="w-full h-full bg-[#FF8C00] animate-pulse"></div>
               </div>
               <p className="mt-2 text-xs text-white/40">Plantão Veterinário Disponível</p>
            </div>
          </motion.div>

          {/* COLUNA 4: REDES SOCIAIS */}
          <motion.div variants={itemVariants} className="space-y-4">
             <h3 className="font-bold uppercase tracking-wider text-sm text-[#FF8C00] mb-4">Redes Sociais</h3>
             <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF8C00] hover:border-[#FF8C00] hover:scale-110 transition-all duration-300 group">
                  <Instagram size={20} className="group-hover:text-white text-white/80" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF8C00] hover:border-[#FF8C00] hover:scale-110 transition-all duration-300 group">
                  <Facebook size={20} className="group-hover:text-white text-white/80" />
                </a>
             </div>
             <p className="text-white/40 text-sm leading-relaxed mt-4">
               Siga-nos para dicas de saúde, novidades e fotos dos nossos pacientes fofos.
             </p>
          </motion.div>

        </motion.div>


        {/* --- COPYRIGHT BAR --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-white/40 uppercase tracking-wider">
           <div>
             Copyright © 2026 Victor Eduardo. Todos os direitos reservados.
           </div>
           <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
           </div>
        </div>

      </div>
    </footer>
  );
}