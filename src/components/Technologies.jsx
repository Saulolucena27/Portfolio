import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAnimation } from "../context/AnimationContext";
import { 
  FaJava, FaPython, FaReact, FaAngular, FaGitAlt, FaDatabase 
} from "react-icons/fa";
import { 
  SiJavascript, SiSpringboot, SiMysql, SiPostgresql, SiSap
} from "react-icons/si";
import { MdSecurity } from "react-icons/md";
import { BiCodeAlt } from "react-icons/bi";

gsap.registerPlugin(ScrollTrigger);

const Technologies = () => {
  const sectionRef = useRef(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  
  const { isSectionAnimated, markSectionAsAnimated, isElementInView } = useAnimation();

  const technologies = [
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Angular", icon: FaAngular, color: "#DD0031" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "Cybersecurity", icon: MdSecurity, color: "#00D1B2" },
    { name: "Full Stack", icon: BiCodeAlt, color: "#764ABC" },
    { name: "SAP (em breve)", icon: SiSap, color: "#0FAAFF" },
  ];

  useEffect(() => {
    if (isSectionAnimated("technologies")) return;

    const section = sectionRef.current;

    const animateOnScroll = () => {
      if (isElementInView(section, -100) && !isSectionAnimated("technologies")) {
        markSectionAsAnimated("technologies");

        gsap.fromTo(
          ".tech-card",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          }
        );
      }
    };

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();

    return () => {
      window.removeEventListener("scroll", animateOnScroll);
    };
  }, [isSectionAnimated, markSectionAsAnimated, isElementInView]);

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-black lg:py-32"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-96 h-96 bg-[#b97836] rounded-full blur-[128px] top-0 right-0" />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <h2 className="mb-12 text-4xl font-bold text-center md:text-5xl">
          Tecnologias & <span className="text-[#b97836]">Ferramentas</span>
        </h2>

        <div className="grid max-w-5xl grid-cols-2 gap-6 mx-auto md:grid-cols-3 lg:grid-cols-4">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={index}
                className="relative tech-card group"
                onMouseEnter={() => setHoveredTech(index)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div className="relative p-6 bg-[#0a0a0a] rounded-xl border border-[#b97836]/30 
                              hover:border-[#b97836] transition-all duration-300 
                              hover:shadow-[0_0_30px_rgba(185,120,54,0.3)]"
                >
                  {/* Texto */}
                  <div className={`text-center transition-all duration-300 ${
                    hoveredTech === index ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                  }`}>
                    <p className="font-semibold text-white">{tech.name}</p>
                  </div>

                  {/* Ícone */}
                  <div className={`absolute inset-0 flex items-center justify-center 
                                  transition-all duration-300 ${
                    hoveredTech === index ? 'opacity-100 scale-100' : 'opacity-0 scale-125'
                  }`}>
                    <Icon 
                      size={48} 
                      color={tech.color}
                      className="drop-shadow-[0_0_15px_rgba(185,120,54,0.5)]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Technologies;