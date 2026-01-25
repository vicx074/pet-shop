import React from 'react';
import SmoothScroll from './SmoothScroll'; 
import Hero from './Hero';
import Services from './Services'; 
import Footer from './Footer'; // Importando o Footer novo

function App() {
  return (
    <SmoothScroll>
      <main className="w-full min-h-screen bg-white">
        
        {/* Hero Section */}
        <Hero />

        {/* Seção de Serviços (Carousel + Modal) */}
        <Services />

        {/* Footer (Rodapé) */}
        <Footer />

      </main>
    </SmoothScroll>
  )
}

export default App;