import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Float, Environment } from "@react-three/drei";
import TigerModel from "./3d/TigerModel";

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Timeline para animação de entrada
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.5,
    });

    // Animação de fade in do canvas 3D
    tl.fromTo(canvasRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });

    // Animação do título
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=1"
    );

    // Animação do subtítulo
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    );

    // Animação do indicador de scroll
    tl.fromTo(
      scrollRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.3"
    );

    // Parallax effect on mouse move
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth - 0.5) * 0.1;
      const y = (clientY / innerHeight - 0.5) * 0.1;

      gsap.to(canvasRef.current, {
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section relative h-screen w-full bg-gradient-to-b from-black via-[#0a0a0a] to-black overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <div ref={canvasRef} className="absolute inset-0 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <TigerModel />
          </Float>
          <Environment preset="city" blur={0.8} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              ref={titleRef}
              className="mb-6 text-5xl font-bold leading-none md:text-7xl lg:text-8xl"
            >
              <span className="text-white">Creative</span>
              <br />
              <span className="text-[#b97836]">Developer</span>
            </h1>

            <p
              ref={subtitleRef}
              className="max-w-2xl mx-auto mb-12 text-xl md:text-2xl text-white/70"
            >
              Transformando ideias em experiências digitais extraordinárias com
              React, Three.js e animações criativas.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#projects"
                className="px-8 py-4 bg-[#b97836] text-black font-bold rounded-full 
                         transform transition-all duration-300 hover:scale-105 
                         hover:shadow-[0_0_30px_rgba(185,120,54,0.5)]"
              >
                Ver Projetos
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border-2 border-[#b97836] text-[#b97836] font-bold 
                         rounded-full transform transition-all duration-300 
                         hover:bg-[#b97836] hover:text-black"
              >
                Entrar em Contato
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute text-center transform -translate-x-1/2 bottom-8 left-1/2"
      >
        <p className="mb-2 text-sm text-white/50">Scroll para explorar</p>
        <div className="flex justify-center w-6 h-10 mx-auto border-2 rounded-full border-white/30">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Hero;
