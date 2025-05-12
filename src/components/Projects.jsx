import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAnimation } from "../context/AnimationContext";

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef(null);

  const { isSectionAnimated, markSectionAsAnimated, isElementInView } =
    useAnimation();

  // Projetos com imagens profissionais
  const projects = [
    {
      id: 1,
      title: "Tech Startup",
      category: "Web Development",
      description:
        "Uma plataforma completa para startups tecnológicas com dashboard analytics.",
      tags: ["React", "Node.js", "MongoDB", "D3.js"],
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
      color: "#b97836",
      link: "#",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      category: "Full Stack",
      description:
        "Plataforma de e-commerce com sistema de pagamento integrado e AI para recomendações.",
      tags: ["Next.js", "Stripe", "TensorFlow", "PostgreSQL"],
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
      color: "#e8a653",
      link: "#",
    },
    {
      id: 3,
      title: "Finance Dashboard",
      category: "Data Visualization",
      description:
        "Dashboard interativo para análise financeira em tempo real.",
      tags: ["React", "D3.js", "WebSocket", "Redux"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      color: "#b97836",
      link: "#",
    },
    {
      id: 4,
      title: "Social Media App",
      category: "Mobile Development",
      description:
        "Aplicativo social com funcionalidades de AR e compartilhamento em tempo real.",
      tags: ["React Native", "Firebase", "AR Kit", "GraphQL"],
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2070&auto=format&fit=crop",
      color: "#e8a653",
      link: "#",
    },
  ];

  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (isSectionAnimated("projects")) return;

    const section = sectionRef.current;

    const animateOnScroll = () => {
      if (isElementInView(section, -100) && !isSectionAnimated("projects")) {
        markSectionAsAnimated("projects");

        const tl = gsap.timeline();

        tl.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        );

        tl.fromTo(
          ".project-card",
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4"
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
      id="projects"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-black lg:py-32"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 parallax-bg">
        <div
          className="absolute inset-0 float-element"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b97836' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2
            ref={titleRef}
            className="mb-4 text-4xl font-bold md:text-6xl reveal-text"
          >
            Projetos <span className="text-[#b97836]">Destacados</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/70 fade-in">
            Uma seleção de projetos que demonstram minha habilidade em criar
            experiências digitais excepcionais.
          </p>
        </div>

        <div
          ref={projectsRef}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-card fade-in group relative cursor-pointer overflow-hidden rounded-2xl`}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
              style={{ height: "500px" }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 transform group-hover:scale-110 scale-on-scroll"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                {/* Category Tag */}
                <div className="mb-4 transition-transform duration-500 transform translate-y-10 group-hover:translate-y-0">
                  <span
                    className="inline-block px-4 py-2 text-sm font-medium rounded-full magnetic"
                    style={{
                      backgroundColor: project.color + "20",
                      color: project.color,
                      border: `1px solid ${project.color}40`,
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-3xl font-bold text-white">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mb-6 transition-all duration-500 transform translate-y-10 opacity-0 text-white/80 group-hover:opacity-100 group-hover:translate-y-0">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 transition-all duration-500 transform translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm border rounded-full bg-white/10 backdrop-blur-sm text-white/80 border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}

                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 font-medium text-white transition-all duration-500 transform translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 magnetic"
                  style={{ color: project.color }}
                >
                  Ver Projeto
                  <svg
                    className="w-5 h-5 transition-transform transform group-hover:translate-x-2"
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

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 border-2 border-transparent transition-all duration-500
                            ${
                              activeProject === project.id
                                ? "border-[#b97836]"
                                : ""
                            }`}
                style={{
                  borderColor:
                    activeProject === project.id
                      ? project.color
                      : "transparent",
                }}
              />
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 
                     bg-transparent border-2 border-[#b97836] text-[#b97836] 
                     font-bold rounded-full transform transition-all duration-300 
                     hover:bg-[#b97836] hover:text-black hover:scale-105 magnetic"
          >
            Ver Todos os Projetos
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
