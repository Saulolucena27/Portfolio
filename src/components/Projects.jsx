import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAnimation } from '../context/AnimationContext';

/**
 * Componente de Projetos
 * Exibe os projetos em formato de card com animação no hover
 */
const Projects = () => {
  // Referências para elementos DOM
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const projectsRef = useRef(null);
  
  // Context para animações
  const { isSectionAnimated, markSectionAsAnimated, isElementInView } = useAnimation();
  
  // Estado para rastrear o projeto em hover
  const [activeProject, setActiveProject] = useState(null);
  
  // Dados dos projetos
  const projects = [
    {
      id: 1,
      title: "TigerCommerce",
      description: "Plataforma e-commerce com design moderno e recursos avançados de filtragem e busca.",
      tags: ["React", "Node.js", "MongoDB", "Redux"],
      image: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?q=80&w=2070",
      link: "#",
      color: "#b97836"
    },
    {
      id: 2,
      title: "PredatorDashboard",
      description: "Dashboard administrativo para análise de dados e visualizações interativas.",
      tags: ["React", "TypeScript", "D3.js", "Firebase"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      link: "#",
      color: "#b97836"
    },
    {
      id: 3,
      title: "HuntTracker",
      description: "Aplicativo de rastreamento de projetos e tarefas com foco em produtividade.",
      tags: ["React Native", "GraphQL", "Apollo", "AWS"],
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2070",
      link: "#",
      color: "#b97836"
    },
    {
      id: 4,
      title: "StripeSight",
      description: "Site institucional com animações avançadas e recursos de acessibilidade.",
      tags: ["Next.js", "GSAP", "Tailwind CSS", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1559310278-18a9192d909f?q=80&w=2146",
      link: "#",
      color: "#b97836"
    }
  ];
  
  useEffect(() => {
    // Não anima novamente se já foi animado
    if (isSectionAnimated('projects')) return;
    
    const section = sectionRef.current;
    
    // Configuração da animação baseada em scroll
    const animateOnScroll = () => {
      if (isElementInView(section, -100) && !isSectionAnimated('projects')) {
        // Marca a seção como animada
        markSectionAsAnimated('projects');
        
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
        
        // Animação dos cards de projetos
        tl.fromTo(".project-card", 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.7, 
            stagger: 0.1, 
            ease: "back.out(1.2)" 
          }, 
          "-=0.4"
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
      id="projects"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-black relative overflow-hidden"
    >
      {/* Elemento decorativo - diagonal stripe */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full transform -rotate-45 flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i}
              className="h-full w-4 bg-[#b97836] mx-16"
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef} 
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
        >
          Meus <span className="text-[#b97836]">Projetos</span>
        </h2>
        
        <p 
          ref={introRef}
          className="text-white/80 max-w-3xl mx-auto text-center mb-16"
        >
          Assim como um tigre que persegue sua presa com precisão e foco, cada um desses projetos
          foi desenvolvido com <span className="text-[#b97836] font-semibold">atenção meticulosa aos detalhes</span> e 
          <span className="text-[#b97836] font-semibold"> paixão por excelência</span>.
        </p>
        
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className={`project-card relative overflow-hidden group rounded-lg transition-all duration-500 ${
                activeProject === project.id ? 'scale-[1.02]' : ''
              }`}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Overlay com gradiente */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10 
                           transition-opacity duration-300 group-hover:opacity-80"
              ></div>
              
              {/* Imagem de fundo */}
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-80 object-cover object-center transition-transform duration-700 
                           group-hover:scale-110"
              />
              
              {/* Borda animada no hover */}
              <div className="absolute inset-0 border-2 border-transparent z-20 group-hover:border-[#b97836] 
                              transition-all duration-300"></div>
              
              {/* Linha decorativa superior */}
              <div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-[#b97836] z-20 
                           transition-all duration-500 group-hover:w-full"
              ></div>
              
              {/* Conteúdo do projeto */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform 
                              duration-500 group-hover:translate-y-0 translate-y-4">
                {/* Tags do projeto */}
                <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity 
                                duration-300 delay-100">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-[#b97836]/20 text-[#b97836] py-1 px-2 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  <span className="text-[#b97836] mr-2">▶</span>
                  {project.title}
                </h3>
                
                <p className="text-white/70 text-sm mb-4 transform transition-all duration-500 
                               opacity-0 group-hover:opacity-100">
                  {project.description}
                </p>
                
                <a 
                  href={project.link}
                  className="inline-block py-2 px-4 bg-[#b97836] text-black text-sm font-bold 
                             transform transition-all duration-300 hover:bg-[#e8a653] rounded
                             opacity-0 group-hover:opacity-100"
                >
                  Ver Projeto
                </a>
              </div>
              
              {/* Efeito de scan no hover */}
              <div 
                className={`absolute inset-0 z-0 overflow-hidden ${
                  activeProject === project.id ? 'scan-effect' : ''
                }`}
              ></div>
            </div>
          ))}
        </div>
        
        {/* Botão para mais projetos */}
        <div className="flex justify-center mt-16">
          <a 
            href="#" 
            className="tiger-btn-outline rounded"
          >
            Ver Todos os Projetos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;