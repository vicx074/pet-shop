import React from 'react';
import SmoothScroll from './SmoothScroll'; 
import Hero from './Hero';
import Services from './Services'; 

function App() {
  return (
    <SmoothScroll>
      <main className="w-full min-h-screen bg-white">
        
        {/* Hero */}
        <Hero />

        {/* Nova Seção de Serviços (Estilo do vídeo) */}
        <Services />

      </main>
    </SmoothScroll>
  )
}

export default App;