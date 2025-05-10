import { createContext, useState, useContext, useCallback, useEffect } from 'react';

/**
 * Contexto para gerenciar estados globais de animação na aplicação
 * Permite coordenar animações entre componentes diferentes
 */
const AnimationContext = createContext();

/**
 * Provider do contexto de animação
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componentes filhos
 */
export const AnimationProvider = ({ children }) => {
  // Estado para rastrear se a animação inicial foi completada
  const [introAnimationComplete, setIntroAnimationComplete] = useState(false);
  
  // Estado para rastrear a posição atual do scroll
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Estado para rastrear quais seções já foram animadas
  const [animatedSections, setAnimatedSections] = useState({
    hero: false,
    about: false,
    projects: false,
    skills: false,
    contact: false
  });

  // Função para marcar uma seção como animada
  const markSectionAsAnimated = useCallback((sectionId) => {
    setAnimatedSections((prev) => ({
      ...prev,
      [sectionId]: true
    }));
  }, []);

  // Função para verificar se uma seção já foi animada
  const isSectionAnimated = useCallback((sectionId) => {
    return animatedSections[sectionId] || false;
  }, [animatedSections]);

  // Monitora o scroll da página para atualizar a posição
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Utilitário para verificar se um elemento está visível na tela
  const isElementInView = useCallback((element, offset = 0) => {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top + offset <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }, []);

  // Valores disponibilizados pelo contexto
  const contextValue = {
    introAnimationComplete,
    setIntroAnimationComplete,
    scrollPosition,
    markSectionAsAnimated,
    isSectionAnimated,
    isElementInView
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};

/**
 * Hook personalizado para acessar o contexto de animação
 * @returns {Object} O valor atual do contexto de animação
 */
export const useAnimation = () => {
  const context = useContext(AnimationContext);
  
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  
  return context;
};

export default AnimationContext;