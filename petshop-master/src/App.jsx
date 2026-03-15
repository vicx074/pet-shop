import React from 'react';
import Header from './components/layout/Header'; 
import SmoothScroll from './components/ui/SmoothScroll'; 
import Hero from './sections/Hero';
import Services from './sections/Services'; 
import Team from './sections/Team';
import Footer from './components/layout/Footer'; 

function App() {
  return (
    <>
      <Header />

      <SmoothScroll>
        <main className="w-full min-h-screen bg-white">
          <Hero />
          <Services />
          <Team />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  )
}

export default App;