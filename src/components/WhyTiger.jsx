import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAnimation } from "../context/AnimationContext";
import AnimatedText from "./AnimatedText";
import { GiMuscleUp, GiHourglass, GiTerror, GiFireBowl } from "react-icons/gi";
import { FaTree } from "react-icons/fa";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";

gsap.registerPlugin(ScrollTrigger);

const WhyTiger = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const quotesRef = useRef(null);

  const { isSectionAnimated, markSectionAsAnimated, isElementInView } =
    useAnimation();

  useEffect(() => {
    if (isSectionAnimated("whytiger")) return;

    const section = sectionRef.current;

    const animateOnScroll = () => {
      if (isElementInView(section, -100) && !isSectionAnimated("whytiger")) {
        markSectionAsAnimated("whytiger");

        const tl = gsap.timeline();

        tl.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        );

        tl.fromTo(
          ".motivation-card",
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: "power3.out" },
          "-=0.4"
        );

        tl.fromTo(
          ".quote-item",
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );
      }
    };

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();

    return () => {
      window.removeEventListener("scroll", animateOnScroll);
    };
  }, [isSectionAnimated, markSectionAsAnimated, isElementInView]);

  const motivations = [
    {
      icon: GiMuscleUp,
      text: "Fiz cansado",
      description: "Mesmo exausto após dias trabalhando no jurídico",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: FaTree,
      text: "Fiz sozinho",
      description: "Sem mentoria, apenas com determinação",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: GiHourglass,
      text: "Fiz sem dinheiro",
      description: "Investindo cada centavo em conhecimento",
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      icon: GiTerror,
      text: "Fiz com medo",
      description: "Enfrentando a incerteza da mudança",
      gradient: "from-orange-600 to-red-700",
    },
    {
      icon: GiFireBowl,
      text: "Continuo fazendo",
      description: "Porque a transformação não para",
      gradient: "from-red-500 to-red-700",
    },
  ];

  return (
    <section
      id="whytiger"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-black lg:py-32"
    >
      {/* Background com a imagem do olho de tigre */}
      <div className="absolute inset-0 parallax-bg">
        <img
          src="/img/tiger-hero.png"
          alt="Tiger Eye"
          className="object-cover w-full h-full opacity-20 scale-on-scroll"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />

      {/* Efeito de parallax no olho do tigre */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-1/4 top-1/2 transform -translate-y-1/2 w-[60%] h-[60%] opacity-30 float-element"
          style={{
            backgroundImage: "url(/img/tiger-hero.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(1.2) contrast(1.1)",
          }}
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2
            ref={titleRef}
            className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl reveal-text"
          >
            Por que <span className="text-[#b97836]">Eye of the Tiger</span>?
          </h2>

          <p className="max-w-3xl mx-auto mb-8 text-xl text-white/80 fade-in">
            Como a música que inspirou milhões, minha jornada é sobre
            <AnimatedText className="text-[#b97836] font-semibold">
              {" "}
              resistência
            </AnimatedText>
            ,
            <AnimatedText className="text-[#b97836] font-semibold">
              {" "}
              superação
            </AnimatedText>{" "}
            e
            <AnimatedText className="text-[#b97836] font-semibold">
              {" "}
              determinação inabalável
            </AnimatedText>
            .
          </p>

          {/* Central Quote */}
          <div className="relative mb-16 fade-in">
            <BiSolidQuoteLeft className="absolute -top-4 -left-8 text-4xl text-[#b97836]/30 float-element" />
            <blockquote className="text-2xl italic font-bold md:text-3xl text-white/90">
              It's the eye of the tiger, it's the thrill of the fight
              <br />
              Rising up to the challenge of our rival
            </blockquote>
            <BiSolidQuoteRight className="absolute -bottom-4 -right-8 text-4xl text-[#b97836]/30 float-element" />
            <cite className="text-[#b97836] text-lg mt-4 block">
              — Survivor
            </cite>
          </div>
        </div>

        {/* Motivation Cards */}
        <div
          ref={contentRef}
          className="grid gap-6 mb-16 md:grid-cols-2 lg:grid-cols-5"
        >
          {motivations.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="motivation-card fade-in relative p-6 bg-[#0a0a0a]/90 backdrop-blur-sm rounded-xl 
                         border border-[#b97836]/30 hover:border-[#b97836] transition-all duration-300
                         hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(185,120,54,0.3)]
                         group overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 
                              group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Icon container */}
                <div className="relative mb-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.gradient} 
                                 flex items-center justify-center mb-4 mx-auto
                                 group-hover:scale-110 transition-transform duration-300 float-element`}
                  >
                    <Icon className="text-3xl text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#b97836] mb-2 text-center">
                  {item.text}
                </h3>
                <p className="text-sm text-center text-white/70">
                  {item.description}
                </p>

                {/* Decorative element */}
                <div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b97836] to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            );
          })}
        </div>

        {/* Personal Story */}
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="fade-in">
            <h3 className="mb-6 text-3xl font-bold reveal-text">
              A Transição é o <span className="text-[#b97836]">Desafio</span>
            </h3>
            <div className="space-y-4 text-white/80">
              <p>
                Assim como Rocky Balboa subindo as escadas da Filadélfia, cada
                linha de código que escrevo é um degrau na minha transformação.
              </p>
              <p>
                De advogado para desenvolvedor: uma jornada que exige a mesma
                <AnimatedText className="text-[#b97836]">
                  {" "}
                  ferocidade do tigre
                </AnimatedText>{" "}
                e a
                <AnimatedText className="text-[#b97836]">
                  {" "}
                  resiliência do lutador
                </AnimatedText>
                .
              </p>
              <p>
                Quando as noites são longas estudando algoritmos após um dia
                inteiro no fórum, quando o código não compila pela milésima vez,
                quando dizem que é tarde demais para mudar... é aí que o olho do
                tigre brilha mais forte.
              </p>
            </div>
          </div>

          <div ref={quotesRef} className="space-y-6">
            {[
              { text: "Disciplina", desc: "Estudar após 10h de trabalho" },
              { text: "Persistência", desc: "600+ horas de código" },
              { text: "Coragem", desc: "Abandonar a zona de conforto" },
              { text: "Visão", desc: "Ver além do horizonte atual" },
            ].map((quote, index) => (
              <div
                key={index}
                className="quote-item fade-in relative flex items-center gap-4 p-4 bg-black/50 rounded-lg
                           border-l-4 border-[#b97836] hover:bg-black/70 transition-all
                           overflow-hidden group"
              >
                {/* Background number */}
                <span
                  className="absolute -right-4 top-0 text-8xl font-bold text-[#b97836]/10
                              group-hover:text-[#b97836]/20 transition-all duration-300"
                >
                  {index + 1}
                </span>

                <div className="relative z-10 flex items-center gap-4">
                  <span className="text-3xl font-bold text-[#b97836] w-10">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-[#b97836]">{quote.text}</h4>
                    <p className="text-sm text-white/70">{quote.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center fade-in">
          <p className="mb-8 text-2xl font-bold text-white">
            Este portfolio não é apenas código.
            <br />É a prova de que{" "}
            <span className="text-[#b97836]">a transformação é possível</span>.
          </p>

          <a
            href="#projects"
            className="inline-flex items-center gap-3 px-8 py-4 
                     bg-[#b97836] text-black font-bold rounded-full 
                     transform transition-all duration-300 text-lg
                     hover:scale-105 hover:shadow-[0_0_40px_rgba(185,120,54,0.5)] magnetic"
          >
            Veja Minha Evolução
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyTiger;
