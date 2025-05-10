import { useEffect, useState } from 'react';
import gsap from 'gsap';

/**
 * Componente de tela de carregamento com animação inspirada em olho de tigre
 * @param {Function} onComplete - Callback executado quando a animação estiver completa
 */
const LoadingScreen = ({ onComplete }) => {
  // Estado para controlar a visibilidade do componente
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Timeline principal para sequenciar animações
    const tl = gsap.timeline({
      onComplete: () => {
        // Após completar todas as animações, inicia animação de saída
        const exitTl = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
            if (onComplete) onComplete();
          }
        });
        
        // Animação de saída com fade out
        exitTl.to(".loading-container", {
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut"
        });
      }
    });

    // Seleciona elementos para animar
    const letterElements = document.querySelectorAll(".tiger-letter");
    const eyeElement = document.querySelector(".tiger-eye-overlay");
    
    // Configuração inicial - todas as letras invisíveis e posições aleatórias
    gsap.set(letterElements, {
      opacity: 0,
      x: () => gsap.utils.random(-300, 300),
      y: () => gsap.utils.random(-200, 200),
      rotation: () => gsap.utils.random(-90, 90),
      scale: 0
    });
    
    gsap.set(eyeElement, {
      opacity: 0,
      scale: 0.5
    });

    // Anima as letras para posição final com stagger (uma após a outra)
    tl.to(letterElements, {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.08,
      ease: "back.out(1.7)"
    });
    
    // Revela o olho do tigre com efeito de pulso
    tl.to(eyeElement, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.5");
    
    // Efeito de piscada do olho
    tl.to(".eyelid", {
      height: "100%",
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power1.in"
    }, "+=0.5");
    
    // Pausa antes da animação final
    tl.to({}, { duration: 0.7 });
    
    // Efeito de "scanning" com linha passando pelo olho
    tl.fromTo(".scan-line", 
      { x: "-100%", opacity: 0.7 },
      { x: "100%", duration: 1.5, ease: "power1.inOut" }
    );

    // Limpa as timelines quando o componente for desmontado
    return () => {
      tl.kill();
    };
  }, [onComplete]);

  // Se o carregamento foi concluído, não renderiza mais o componente
  if (!isLoading) return null;

  return (
    <div className="loading-container fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        {/* Título "EYE OF THE TIGER" */}
        <div className="tiger-title mb-12 relative">
          {/* Letras individuais para animar cada uma separadamente */}
          <span className="tiger-letter inline-block mx-1 text-5xl font-bold text-[#b97836]">E</span>
          <span className="tiger-letter inline-block mx-1 text-5xl font-bold text-[#b97836]">Y</span>
          <span className="tiger-letter inline-block mx-1 text-5xl font-bold text-[#b97836]">E</span>
          <span className="tiger-letter inline-block mx-1 text-5xl font-bold text-white">O</span>
          <span className="tiger-letter inline-block mx-1 text-5xl font-bold text-white">F</span>
          <span className="tiger-letter inline-block mx-1 text-5xl font-bold text-white">T</span>
          <span className="tiger-letter inline-block mx-1 text-5xl font-bold text-white">H</span>
          <span className="tiger-letter inline-block mx-1 text-5xl font-bold text-white">E</span>
          <span className="tiger-letter inline-block mx-1 text-5xl font-bold text-[#b97836]">T</span>
          <span className="tiger-letter inline-block mx-1 text-5xl font-bold text-[#b97836]">I</span>
          <span className="tiger-letter inline-block mx-1 text-5xl font-bold text-[#b97836]">G</span>
          <span className="tiger-letter inline-block mx-1 text-5xl font-bold text-[#b97836]">E</span>
          <span className="tiger-letter inline-block mx-1 text-5xl font-bold text-[#b97836]">R</span>
        </div>
        
        {/* Olho de tigre estilizado */}
        <div className="tiger-eye-container relative w-64 h-64 overflow-hidden rounded-full">
          {/* Imagem do olho de tigre */}
          <div className="tiger-eye-overlay absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full bg-black rounded-full overflow-hidden">
              {/* Olho */}
              <div className="absolute inset-0 bg-[#b97836] rounded-full" style={{ clipPath: "ellipse(30% 45% at 50% 50%)" }}>
                {/* Pupila */}
                <div className="absolute inset-0 bg-black" style={{ clipPath: "ellipse(10% 30% at 50% 50%)" }}></div>
                
                {/* Reflexos */}
                <div className="absolute w-8 h-8 bg-white rounded-full opacity-70 top-[40%] left-[35%]"></div>
                <div className="absolute w-4 h-4 bg-white rounded-full opacity-50 top-[30%] right-[35%]"></div>
              </div>
              
              {/* Pálpebra para efeito de piscar */}
              <div className="eyelid absolute inset-0 bg-black w-full h-0"></div>
              
              {/* Linha de scan para efeito de escaneamento */}
              <div className="scan-line absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
            </div>
          </div>
        </div>
        
        {/* Texto carregando */}
        <div className="mt-8 text-sm text-[#b97836] tracking-widest">CARREGANDO...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;