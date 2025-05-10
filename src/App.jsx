import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Scene from './components/3d/Scene';

/**
 * Componente principal da aplicação
 * Gerencia o estado de carregamento e renderiza os componentes na ordem correta
 */
function App() {
  // Estado para controlar a tela de carregamento
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar a visibilidade do conteúdo principal
  const [contentVisible, setContentVisible] = useState(false);

  // Função chamada quando a animação de carregamento for concluída
  const handleLoadingComplete = () => {
    setLoading(false);
    
    // Pequeno delay para garantir que a tela de carregamento desapareceu completamente
    setTimeout(() => {
      setContentVisible(true);
    }, 300);
  };

  return (
    <div className="App bg-black text-white min-h-screen">
      {/* Tela de carregamento */}
      <Scene />
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* Conteúdo principal - visível apenas após o carregamento */}
      <div className={`main-content transition-opacity duration-1000 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
        <NavBar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;