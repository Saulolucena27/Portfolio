import { useState, useEffect } from 'react';

/**
 * Hook personalizado para monitorar o progresso de scroll da página
 * Útil para criar animações baseadas em scroll e indicadores de progresso
 * 
 * @param {Object} options - Opções de configuração
 * @param {string} options.targetId - ID do elemento alvo (se não for fornecido, usa o documento inteiro)
 * @param {number} options.threshold - Valor entre 0 e 1 que define quando considerar que a seção está visível
 * @param {boolean} options.triggerOnce - Se deve disparar apenas uma vez quando o elemento ficar visível
 * @returns {Object} Objeto contendo informações sobre o progresso de scroll
 */
const useScrollProgress = (options = {}) => {
  const { targetId, threshold = 0.2, triggerOnce = false } = options;
  
  // Estado para rastrear o progresso geral da página (0 a 1)
  const [progress, setProgress] = useState(0);
  
  // Estado para rastrear se o elemento alvo está visível
  const [isVisible, setIsVisible] = useState(false);
  
  // Estado para rastrear o progresso dentro da seção alvo (0 a 1)
  const [sectionProgress, setSectionProgress] = useState(0);
  
  // Estado para rastrear a posição atual do scroll
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Estado para rastrear se o elemento já foi visto
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    // Função para calcular o progresso da página e visibilidade do elemento
    const handleScroll = () => {
      // Atualiza a posição de scroll atual
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
      
      // Calcula progresso geral da página
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressValue = Math.min(Math.max(currentPosition / totalHeight, 0), 1);
      setProgress(progressValue);
      
      // Se houver um elemento alvo, verifica sua visibilidade
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Calcula quanto do elemento está visível na viewport
          const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          const elementHeight = rect.height;
          const visibleRatio = visibleHeight / elementHeight;
          
          // Define se o elemento está visível baseado no threshold
          const elementIsVisible = visibleRatio > threshold;
          
          // Se triggerOnce está ativo e o elemento já foi visto, mantém o valor
          if (triggerOnce && hasBeenVisible) {
            setIsVisible(true);
          } else {
            setIsVisible(elementIsVisible);
            
            // Marca o elemento como já visto quando ele estiver completamente visível
            if (elementIsVisible && !hasBeenVisible) {
              setHasBeenVisible(true);
            }
          }
          
          // Calcula o progresso dentro da seção
          // 0 quando o topo do elemento estiver na parte inferior da viewport
          // 1 quando a parte inferior do elemento estiver no topo da viewport
          let sectionProgressValue = 0;
          
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            sectionProgressValue = 1 - (rect.bottom / (windowHeight + elementHeight));
            sectionProgressValue = Math.min(Math.max(sectionProgressValue, 0), 1);
          } else if (rect.top > windowHeight) {
            sectionProgressValue = 0;
          } else if (rect.bottom < 0) {
            sectionProgressValue = 1;
          }
          
          setSectionProgress(sectionProgressValue);
        }
      }
    };

    // Adiciona event listener para o scroll
    window.addEventListener('scroll', handleScroll);
    
    // Calcula a visibilidade inicial
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetId, threshold, triggerOnce, hasBeenVisible]);

  return {
    progress,         // Progresso geral da página (0 a 1)
    isVisible,        // Se o elemento alvo está visível
    sectionProgress,  // Progresso dentro da seção alvo (0 a 1)
    scrollPosition,   // Posição atual do scroll
    hasBeenVisible    // Se o elemento já foi visto pelo menos uma vez
  };
};

export default useScrollProgress;