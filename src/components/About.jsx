import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAnimation } from "../context/AnimationContext";
import AnimatedText from "./AnimatedText";

// Registramos o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Componente da seção Sobre
 * Descreve o desenvolvedor com analogias ao tema do tigre
 */
const About = () => {
  // Referências para os elementos que serão animados
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const quoteRef = useRef(null);
  const imageContainerRef = useRef(null);

  // Hook de contexto para animações
  const { isSectionAnimated, markSectionAsAnimated, isElementInView } =
    useAnimation();

  useEffect(() => {
    // Não anima novamente se já foi animado
    if (isSectionAnimated("about")) return;

    const section = sectionRef.current;

    // Configuração da animação baseada em scroll
    const animateOnScroll = () => {
      if (isElementInView(section, -100) && !isSectionAnimated("about")) {
        // Marca a seção como animada
        markSectionAsAnimated("about");

        // Timeline para as animações
        const tl = gsap.timeline();

        // Animação do título
        tl.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
        );

        // Animação do conteúdo
        tl.fromTo(
          contentRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );

        // Animação da citação
        tl.fromTo(
          quoteRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );

        // Animação da imagem/decoração
        tl.fromTo(
          imageContainerRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "back.out(1.2)" },
          "-=0.5"
        );
      }
    };

    // Adiciona event listener para o scroll
    window.addEventListener("scroll", animateOnScroll);

    // Verifica se a seção já está visível ao carregar
    animateOnScroll();

    return () => {
      window.removeEventListener("scroll", animateOnScroll);
    };
  }, [isSectionAnimated, markSectionAsAnimated, isElementInView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-black relative overflow-hidden"
    >
      {/* Elemento decorativo - listras diagonais */}
      <div className="absolute -right-20 -top-20 w-64 h-64 opacity-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-64 w-2 bg-[#b97836] transform rotate-45"
            style={{ left: `${i * 12}px` }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Conteúdo de texto */}
          <div className="lg:w-1/2 lg:pr-12">
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold mb-8 text-white"
            >
              Sobre <span className="text-[#b97836]">Mim</span>
            </h2>

            <div ref={contentRef} className="text-white/80 space-y-4">
              <p>
                Assim como o tigre, sou um desenvolvedor que combina{" "}
                <AnimatedText className="text-[#b97836]">
                  força técnica
                </AnimatedText>{" "}
                com
                <AnimatedText className="text-[#b97836]">
                  {" "}
                  precisão meticulosa
                </AnimatedText>
                . Minha jornada no desenvolvimento web começou há mais de 5
                anos, e desde então tenho me especializado em criar experiências
                digitais impactantes e memoráveis.
              </p>

              <p>
                Cada projeto é uma oportunidade de demonstrar{" "}
                <AnimatedText className="text-[#b97836]">
                  agilidade
                </AnimatedText>
                , <AnimatedText className="text-[#b97836]">foco</AnimatedText> e{" "}
                <AnimatedText className="text-[#b97836]">
                  determinação
                </AnimatedText>
                . Trabalho com React, JavaScript e tecnologias modernas para
                construir interfaces que não apenas funcionam perfeitamente, mas
                também cativam os usuários com animações fluidas e design
                responsivo.
              </p>

              <p>
                Assim como o tigre usa sua visão aguçada para detectar
                oportunidades, estou constantemente analisando tendências e
                aprimorando minhas habilidades para entregar as melhores
                soluções digitais.
              </p>
            </div>

            <blockquote
              ref={quoteRef}
              className="border-l-4 border-[#b97836] pl-4 mt-8 italic text-white/70"
            >
              "Na selva digital, apenas os mais adaptáveis e persistentes
              sobrevivem e prosperam."
            </blockquote>
          </div>

          {/* Elemento decorativo - emblema/símbolo */}
          <div ref={imageContainerRef} className="mt-12 lg:mt-0 lg:w-5/12">
            <div className="relative">
              {/* Círculo principal */}
              <div className="w-64 h-64 mx-auto rounded-full border-4 border-[#b97836] flex items-center justify-center">
                {/* Símbolo estilizado de tigre */}
                <div className="relative w-3/4 h-3/4">
                  {/* Olhos */}
                  <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-[#b97836] rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-black rounded-full"></div>
                  </div>
                  <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-[#b97836] rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-black rounded-full"></div>
                  </div>

                  {/* Listras estilizadas */}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 transform -translate-x-1/2 h-2 bg-[#b97836]"
                      style={{
                        top: `calc(60% + ${i * 15}px)`,
                        width: `${80 - i * 15}%`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Detalhes ao redor */}
              <div className="absolute -top-6 -right-6 w-20 h-20 border-t-4 border-r-4 border-[#b97836]/30"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 border-b-4 border-l-4 border-[#b97836]/30"></div>
            </div>

            {/* Estatísticas/anos de experiência */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-[#b97836] text-3xl font-bold">5+</div>
                <div className="text-white/60 text-sm">Anos de experiência</div>
              </div>
              <div>
                <div className="text-[#b97836] text-3xl font-bold">30+</div>
                <div className="text-white/60 text-sm">Projetos concluídos</div>
              </div>
              <div>
                <div className="text-[#b97836] text-3xl font-bold">100%</div>
                <div className="text-white/60 text-sm">Foco e dedicação</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
