import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Componente Hero principal do portfólio
 * Apresenta uma animação do olho de tigre com efeitos interativos
 */
const Hero = () => {
  // Referências para elementos DOM que serão animados
  const heroRef = useRef(null);
  const eyeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scanLineRef = useRef(null);

  useEffect(() => {
    // Timeline para animação de entrada
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animação de entrada dos elementos
    tl.fromTo(titleRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(eyeRef.current, 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.2 }, 
      "-=0.7" // Sobrepõe um pouco a animação anterior
    )
    .fromTo(subtitleRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }, 
      "-=0.5"
    );
    
    // Efeito contínuo de pulsação sutil no olho
    gsap.to(eyeRef.current, {
      scale: 1.03,
      duration: 1.5,
      repeat: -1, // Repetir infinitamente
      yoyo: true, // Vai e volta
      ease: "sine.inOut"
    });
    
    // Animação da linha de scan repetindo continuamente
    gsap.fromTo(scanLineRef.current,
      { x: '-100%', opacity: 0.3 },
      { 
        x: '100%', 
        opacity: 0.4, 
        duration: 2.5, 
        ease: "power1.inOut",
        repeat: -1,
        repeatDelay: 1
      }
    );

    // Configuração do efeito de movimento do olho baseado na posição do mouse
    const heroElement = heroRef.current;
    
    const handleMouseMove = (e) => {
      // Calcula a posição relativa do mouse dentro do contêiner
      const rect = heroElement.getBoundingClientRect();
      const mouseX = e.clientX - rect.left; 
      const mouseY = e.clientY - rect.top;
      
      // Calcula o valor de deslocamento em porcentagem (limitado para movimento sutil)
      const moveX = (mouseX / rect.width - 0.5) * 10; // Ajuste a sensibilidade
      const moveY = (mouseY / rect.height - 0.5) * 10;
      
      // Aplica a transformação na pupila e na íris
      gsap.to(".pupil", {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(".iris", {
        x: moveX * 0.6, // Movimento mais sutil para a íris
        y: moveY * 0.6,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    // Adiciona o event listener para movimento do mouse
    heroElement.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup: remove event listeners quando o componente for desmontado
    return () => {
      heroElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="hero-section relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background com gradiente sutil */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a]"
        style={{ backgroundImage: 'radial-gradient(circle at center, #0a0a0a 0%, black 70%)' }}
      ></div>
      
      {/* Container principal com conteúdo */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Seção de texto */}
        <div className="text-content lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
          <h1 
            ref={titleRef} 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            <span className="text-[#b97836]">FORÇA</span> E <span className="text-[#b97836]">DETERMINAÇÃO</span>
          </h1>
          
          <p 
            ref={subtitleRef} 
            className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-xl"
          >
            Desenvolvendo soluções digitais com o espírito e a precisão de um caçador.
          </p>
          
          {/* CTA Button com animação hover */}
          <button 
            className="mt-8 px-8 py-3 bg-[#b97836] text-black font-bold text-lg rounded-sm 
                      transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            EXPLORAR PROJETOS
          </button>
        </div>
        
        {/* Olho de tigre animado */}
        <div 
          ref={eyeRef} 
          className="eye-container relative w-64 h-64 md:w-96 md:h-96 overflow-hidden rounded-full 
                    border-4 border-[#b97836]/30 shadow-[0_0_40px_rgba(185,120,54,0.3)]"
        >
          {/* Estrutura do olho de tigre */}
          <div className="eye-structure relative w-full h-full flex items-center justify-center overflow-hidden bg-black">
            
            {/* Máscara de pelos/textura */}
            <div className="absolute inset-0 opacity-50 mix-blend-overlay">
              {/* Textura com gradiente radial para simular pelos */}
              <div className="w-full h-full bg-gradient-to-br from-[#222] to-black"></div>
            </div>
            
            {/* Íris */}
            <div 
              className="iris absolute rounded-full w-3/4 h-3/4 bg-[#b97836] overflow-hidden"
              style={{ backgroundImage: 'radial-gradient(circle, #e8a653 10%, #b97836 40%, #7d5023 80%)' }}
            >
              {/* Textura dentro da íris */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Padrões radiais sutis */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-1 bg-[#7d5023]/30"
                    style={{ transform: `rotate(${i * 15}deg)` }}
                  ></div>
                ))}
              </div>
              
              {/* Pupila */}
              <div className="pupil absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-3/5 bg-black rounded-full"></div>
              
              {/* Reflexos */}
              <div className="absolute w-8 h-8 bg-white rounded-full opacity-60 top-[35%] left-[30%]"></div>
              <div className="absolute w-4 h-4 bg-white rounded-full opacity-40 top-[25%] left-[45%]"></div>
            </div>
            
            {/* Linha de scan para efeito de escaneamento */}
            <div 
              ref={scanLineRef} 
              className="scan-line absolute top-0 bottom-0 w-32 
                        bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            ></div>
          </div>
        </div>
      </div>
      
      {/* Elemento decorativo - linha horizontal */}
      <div className="absolute bottom-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b97836] to-transparent opacity-50"></div>
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-[#b97836] text-sm mb-2">SCROLL</span>
        <div className="w-6 h-10 border-2 border-[#b97836] rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-[#b97836] rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;