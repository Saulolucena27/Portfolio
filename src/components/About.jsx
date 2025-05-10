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
    { value: "5+", label: "Anos de Experiência" },
    { value: "50+", label: "Projetos Concluídos" },
    { value: "30+", label: "Clientes Satisfeitos" },
    { value: "10+", label: "Tecnologias Dominadas" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-96 h-96 bg-[#b97836] rounded-full blur-[128px] -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-[#e8a653] rounded-full blur-[128px] -bottom-48 -right-48" />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image Section */}
          <div ref={imageRef} className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
                alt="About Me"
                className="w-full h-[600px] object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-black/90 backdrop-blur-sm p-6 rounded-xl border border-[#b97836]/30">
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
                  <p className="font-bold text-white">
                    Disponível para projetos
                  </p>
                  <p className="text-[#b97836] text-sm">
                    Vamos trabalhar juntos!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:pl-12">
            <h2 ref={titleRef} className="mb-6 text-4xl font-bold md:text-5xl">
              Sobre <span className="text-[#b97836]">Mim</span>
            </h2>

            <div ref={textRef} className="mb-8 space-y-4 text-white/80">
              <p className="text-lg">
                Sou um desenvolvedor apaixonado por criar experiências digitais
                que não apenas funcionam perfeitamente, mas também inspiram e
                engajam.
              </p>

              <p>
                Com mais de 5 anos de experiência em desenvolvimento web,
                especializo-me em{" "}
                <AnimatedText className="text-[#b97836]">React</AnimatedText>,
                <AnimatedText className="text-[#b97836]">
                  {" "}
                  Three.js
                </AnimatedText>{" "}
                e
                <AnimatedText className="text-[#b97836]">
                  {" "}
                  animações criativas
                </AnimatedText>
                .
              </p>

              <p>
                Minha abordagem combina código limpo, design intuitivo e
                performance otimizada para entregar projetos que superam
                expectativas.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
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
                       hover:scale-105 hover:shadow-[0_0_30px_rgba(185,120,54,0.5)]"
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
