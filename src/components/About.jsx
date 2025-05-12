import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAnimation } from "../context/AnimationContext";
import AnimatedText from "./AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  const { isSectionAnimated, markSectionAsAnimated, isElementInView } =
    useAnimation();

  useEffect(() => {
    if (isSectionAnimated("about")) return;

    const section = sectionRef.current;

    const animateOnScroll = () => {
      if (isElementInView(section, -100) && !isSectionAnimated("about")) {
        markSectionAsAnimated("about");

        const tl = gsap.timeline();

        tl.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        );

        tl.fromTo(
          textRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        );

        tl.fromTo(
          imageRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.5"
        );

        tl.fromTo(
          ".stat-item",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
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

  const stats = [
    { value: "2026", label: "Formação em ADS" },
    { value: "3", label: "Certificações Tech" },
    { value: "500+", label: "Horas de Estudo" },
    { value: "∞", label: "Sede de Conhecimento" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 parallax-bg">
        <div className="absolute w-96 h-96 bg-[#b97836] rounded-full blur-[128px] -top-48 -left-48 float-element" />
        <div className="absolute w-96 h-96 bg-[#e8a653] rounded-full blur-[128px] -bottom-48 -right-48 float-element" />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image Section */}
          <div ref={imageRef} className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/img/saulolucena.jpg"
                alt="Saulo de Lucena"
                className="w-full h-[600px] object-cover scale-on-scroll"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-black/90 backdrop-blur-sm p-6 rounded-xl border border-[#b97836]/30 float-element">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#b97836] rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-white">Aberto a Estágios</p>
                  <p className="text-[#b97836] text-sm">
                    Direito + Tech = Inovação!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:pl-12">
            <h2 ref={titleRef} className="mb-6 text-4xl font-bold md:text-5xl reveal-text">
              Sobre <span className="text-[#b97836]">Mim</span>
            </h2>

            <div ref={textRef} className="mb-8 space-y-4 text-white/80">
              <p className="text-lg fade-in">
                Sou um profissional em transição de carreira, com sólida
                formação em Direito e 4 anos de experiência no setor jurídico,
                agora focado em tecnologia e desenvolvimento de software.
              </p>

              <p className="fade-in">
                Atualmente cursando Análise e Desenvolvimento de Sistemas no
                SENAC-PE, combino minha capacidade analítica e atenção aos
                detalhes com paixão por criar soluções tecnológicas inovadoras.
                Possuo competências em{" "}
                <AnimatedText className="text-[#b97836]">Java</AnimatedText>,
                <AnimatedText className="text-[#b97836]"> Python</AnimatedText>{" "}
                e
                <AnimatedText className="text-[#b97836]">
                  {" "}
                  JavaScript
                </AnimatedText>
                , com experiência em frameworks como Spring Boot, React e
                Angular.
              </p>

              <p className="fade-in">
                Certificado em{" "}
                <AnimatedText className="text-[#b97836]">
                  EndPoint Security
                </AnimatedText>{" "}
                pela Cisco e{" "}
                <AnimatedText className="text-[#b97836]">
                  Cyber Intelligence Professional
                </AnimatedText>{" "}
                pelo ADINT.
              </p>

              <p className="fade-in">
                Minha experiência jurídica foi fundamental para o
                desenvolvimento de habilidades interpessoais e profissionais
                altamente valorizadas na área de tecnologia. Ao elaborar mais de
                80 petições por mês, conduzir despachos com magistrados e
                atender mais de 40 clientes mensalmente, refinei minha{" "}
                <AnimatedText className="text-[#b97836] font-semibold">
                  comunicação clara e assertiva
                </AnimatedText>
                ,{" "}
                <AnimatedText className="text-[#b97836] font-semibold">
                  resolução de problemas sob pressão
                </AnimatedText>
                ,{" "}
                <AnimatedText className="text-[#b97836] font-semibold">
                  trabalho em equipe multidisciplinar
                </AnimatedText>{" "}
                e uma forte{" "}
                <AnimatedText className="text-[#b97836] font-semibold">
                  adaptabilidade a contextos complexos e dinâmicos
                </AnimatedText>
                .
              </p>

              <p className="fade-in">
                Essas competências humanas — desenvolvidas no Direito — hoje são
                diferenciais que levo para a tecnologia, permitindo que eu
                colabore com times diversos, compreenda rapidamente novas
                demandas e entregue soluções com empatia, precisão e eficácia.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item fade-in">
                  <div className="text-3xl font-bold text-[#b97836] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-6 py-3 
                       bg-[#b97836] text-black font-bold rounded-full 
                       transform transition-all duration-300 
                       hover:scale-105 hover:shadow-[0_0_30px_rgba(185,120,54,0.5)] magnetic"
            >
              Vamos Conversar
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

