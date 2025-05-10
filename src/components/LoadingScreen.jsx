import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Simula o carregamento de recursos
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Anima a barra de progresso
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    // Quando atingir 100%
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // Anima texto de conclusão
      tl.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
      })
        // Expande a barra de progresso
        .to(progressRef.current, {
          height: "100vh",
          duration: 0.8,
          ease: "power4.inOut",
        })
        // Fade out do container
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
        });
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black loading-screen"
    >
      {/* Container de progresso */}
      <div className="w-full max-w-md px-8">
        {/* Texto de carregamento */}
        <div ref={textRef} className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-[#b97836] mb-2">TIGER</h2>
          <p className="text-white/70">Carregando experiência...</p>
        </div>

        {/* Barra de progresso */}
        <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#b97836] to-[#e8a653] rounded-full"
            style={{ width: "0%" }}
          />
        </div>

        {/* Porcentagem */}
        <div className="mt-4 text-center">
          <span className="font-mono text-xl text-white">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
