import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: "CONSULTAS &",
    titleSecondLine: "CHECK-UPS",
    subtitle: "PREVENÇÃO",
    description: "Diagnósticos precisos para garantir a longevidade do seu pet antes que problemas se tornem graves.",
    detailsTitle: "COMO FUNCIONA",
    detailsPoints: ["Agendamento prévio.", "Análise clínica completa.", "Histórico revisado.", "Retorno em 15 dias."],
    theme: "orange", // Laranja
    color: "#FF8C00"
  },
  {
    id: 2,
    title: "CIRURGIAS &",
    titleSecondLine: "INTERNAMENTO",
    subtitle: "HOSPITALAR",
    description: "Centro cirúrgico avançado com monitoramento 24h e baias individuais climatizadas.",
    detailsTitle: "SEGURANÇA TOTAL",
    detailsPoints: ["Monitoramento veterinário 24h.", "Exames pré-cirúrgicos.", "Ambiente estéril.", "Boletim via WhatsApp."],
    theme: "green", // Verde
    color: "#007a00"
  },
  {
    id: 3,
    title: "VACINAS &",
    titleSecondLine: "LABORATÓRIO",
    subtitle: "IMUNIZAÇÃO",
    description: "Laboratório próprio para exames rápidos e vacinas importadas de alta qualidade.",
    detailsTitle: "PROCEDIMENTO",
    detailsPoints: ["Vacinas Importadas.", "Resultados rápidos.", "Coleta domiciliar.", "Carteirinha digital."],
    theme: "orange", // Laranja
    color: "#FF8C00"
  }
];

// COMPONENTE DO CARD INDIVIDUAL
const Card = ({ i, title, titleSecondLine, subtitle, description, detailsTitle, detailsPoints, color, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  // Animação de escala: O card diminui levemente quando o próximo sobe
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }} 
        className="flex flex-col relative w-[1000px] h-[500px] md:h-[600px] bg-white rounded-[2rem] border border-gray-200 shadow-2xl origin-top overflow-hidden"
      >
        <div className="flex h-full flex-col md:flex-row">
          
          {/* LADO ESQUERDO: TEXTO DE AUTORIDADE */}
          <div className="w-full md:w-[60%] p-10 flex flex-col justify-center items-center text-center relative z-10">
            <span className="inline-block py-1 px-3 rounded bg-gray-100 text-gray-500 text-[10px] md:text-xs font-black tracking-[0.2em] mb-6 uppercase">
              {subtitle}
            </span>
            
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#006400] leading-[0.85] mb-6 uppercase tracking-tight">
              {title} <br/>
              <span style={{ color: color }} className="opacity-90">{titleSecondLine}</span>
            </h3>

            <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed max-w-sm mb-8">
              {description}
            </p>

            <button style={{ backgroundColor: color }} className="text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-xs md:text-sm hover:brightness-110 transition-all shadow-lg flex items-center gap-2">
              Agendar <ArrowRight size={16}/>
            </button>
          </div>

          {/* LADO DIREITO: BADGE COLORIDO (Igual ao vídeo) */}
          <div 
            className="w-full md:w-[40%] h-full p-8 md:p-10 text-white flex flex-col justify-center relative overflow-hidden"
            style={{ backgroundColor: color }}
          >
            {/* Efeito decorativo de fundo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <h4 className="text-xl md:text-2xl font-black uppercase mb-6 border-b-2 border-white/30 pb-4 relative z-10">
              {detailsTitle}
            </h4>
            
            <ul className="space-y-4 relative z-10">
              {detailsPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm font-bold leading-snug opacity-95">
                   <div className="mt-1 min-w-[16px]">
                     <CheckCircle size={16} className="text-white" />
                   </div>
                   {point}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8 relative z-10">
               <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center border border-white/10 inline-block w-full">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Disponibilidade Imediata</span>
               </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

// COMPONENTE PRINCIPAL QUE RENDERIZA A LISTA
export default function Services() {
  const container = useRef(null);
  
  // Monitora o scroll de TODO o container de serviços
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  return (
    <div ref={container} className="relative mt-[10vh] bg-gray-50">
      
      {/* TÍTULO DA SEÇÃO FIXO NO FLUXO (Opcional, pode tirar se quiser só os cards) */}
      <div className="text-center py-20 px-6">
        <h2 className="text-3xl md:text-5xl font-black text-[#006400] uppercase mb-2">
          Nossos Serviços
        </h2>
        <p className="text-gray-500 font-medium">Role para baixo para explorar</p>
      </div>

      {servicesData.map((project, i) => {
        // Cálculo matemático para a escala funcionar perfeitamente empilhada
        const targetScale = 1 - ( (servicesData.length - i) * 0.05 );
        return (
          <Card 
            key={i} 
            i={i} 
            {...project} 
            progress={scrollYProgress} 
            range={[i * 0.25, 1]} 
            targetScale={targetScale} 
          />
        )
      })}
    </div>
  );
}