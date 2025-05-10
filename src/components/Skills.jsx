import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAnimation } from '../context/AnimationContext';

/**
 * Componente de Habilidades
 * Apresenta as habilidades técnicas em um layout visualmente impactante
 */
const Skills = () => {
  // Referências para elementos DOM
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const skillsContainerRef = useRef(null);
  
  // Context para animações
  const { isSectionAnimated, markSectionAsAnimated, isElementInView } = useAnimation();
  
  // Dados das habilidades
  const skillCategories = [
    {
      name: "Front-end",
      icon: "🖥️",
      skills: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 95 },
        { name: "HTML/CSS", level: 90 },
        { name: "TailwindCSS", level: 85 },
        { name: "TypeScript", level: 80 },
      ]
    },
    {
      name: "Back-end",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "SQL", level: 70 },
        { name: "Firebase", level: 75 },
      ]
    },
    {
      name: "Ferramentas",
      icon: "🔧",
      skills: [
        { name: "Git", level: 90 },
        { name: "Webpack", level: 75 },
        { name: "Docker", level: 65 },
        { name: "AWS", level: 60 },
        { name: "Figma", level: 80 },
      ]
    },
    {
      name: "Soft Skills",
      icon: "🧠",
      skills: [
        { name: "Comunicação", level: 95 },
        { name: "Resolução de Problemas", level: 90 },
        { name: "Trabalho em Equipe", level: 95 },
        { name: "Adaptabilidade", level: 85 },
        { name: "Foco", level: 95 },
      ]
    }
  ];
  
  useEffect(() => {
    // Não anima novamente se já foi animado
    if (isSectionAnimated('skills')) return;
    
    const section = sectionRef.current;
    
    // Configuração da animação baseada em scroll
    const animateOnScroll = () => {
      if (isElementInView(section, -100) && !isSectionAnimated('skills')) {
        // Marca a seção como animada
        markSectionAsAnimated('skills');
        
        // Timeline para as animações
        const tl = gsap.timeline();
        
        // Animação do título
        tl.fromTo(titleRef.current, 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
        );
        
        // Animação do texto introdutório
        tl.fromTo(introRef.current, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 
          "-=0.4"
        );
        
        // Animação das categorias de habilidades
        tl.fromTo(".skill-category", 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            stagger: 0.1, 
            ease: "back.out(1.2)" 
          }, 
          "-=0.4"
        );
        
        // Animação das barras de progresso
        tl.fromTo(".skill-progress-bar span", 
          { width: "0%" }, 
          { 
            width: "var(--progress)", 
            duration: 1.2, 
            stagger: 0.05, 
            ease: "power3.out" 
          }, 
          "-=0.2"
        );
      }
    };
    
    // Adiciona event listener para o scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Verifica se a seção já está visível ao carregar
    animateOnScroll();
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, [isSectionAnimated, markSectionAsAnimated, isElementInView]);

  return (
    <section 
      id="skills"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Elementos decorativos - padrão de garras */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-32 h-32"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)` 
            }}
          >
            <div className="relative w-full h-full">
              {Array.from({ length: 3 }).map((_, j) => (
                <div 
                  key={j}
                  className="absolute bg-[#b97836] rounded-full w-4 h-20"
                  style={{ 
                    left: `${j * 12}px`,
                    transform: 'rotate(45deg)',
                    transformOrigin: 'bottom center'
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 
          ref={titleRef} 
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
        >
          Minhas <span className="text-[#b97836]">Habilidades</span>
        </h2>
        
        <p 
          ref={introRef}
          className="text-white/80 max-w-3xl mx-auto text-center mb-16"
        >
          Como um predador que aprimora constantemente suas habilidades para a caça,
          busco dominar cada ferramenta e tecnologia para desenvolver
          soluções digitais eficientes e impactantes.
        </p>
        
        <div 
          ref={skillsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-y-16"
        >
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="skill-category backdrop-blur-sm bg-black/40 p-6 rounded-lg border border-[#b97836]/20 
                        transition-all duration-300 hover:border-[#b97836]/50 hover:shadow-tiger"
            >
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h3 className="text-xl font-bold text-[#b97836]">{category.name}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="flex justify-between mb-1">
                      <span className="text-white/90">{skill.name}</span>
                      <span className="text-[#b97836]">{skill.level}%</span>
                    </div>
                    
                    <div className="skill-progress-bar h-2 w-full bg-[#333] rounded-full overflow-hidden">
                      <span 
                        className="block h-full bg-gradient-to-r from-[#b97836] to-[#e8a653] rounded-full"
                        style={{ "--progress": `${skill.level}%` }}
                      ></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Estatísticas/conquistas */}
        <div className="stats-container mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "5+", label: "Anos de Experiência" },
            { number: "30+", label: "Projetos Concluídos" },
            { number: "15+", label: "Clientes Satisfeitos" },
            { number: "99%", label: "Código de Qualidade" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="stat-item text-center p-6 bg-black/40 backdrop-blur-sm border border-[#b97836]/20 rounded-lg
                        transform transition-all duration-300 hover:scale-105 hover:border-[#b97836]/50"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#b97836] mb-2">{stat.number}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;