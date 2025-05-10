import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Componente de rodapé
 * Exibe informações de direitos autorais e links de navegação
 */
const Footer = () => {
  // Referências para elementos DOM
  const footerRef = useRef(null);
  
  // Data atual para o copyright
  const currentYear = new Date().getFullYear();
  
  // Lista de links do rodapé
  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Habilidades", href: "#skills" },
    { name: "Contato", href: "#contact" }
  ];
  
  // Animação ao carregar
  useEffect(() => {
    const footer = footerRef.current;
    
    if (footer) {
      gsap.fromTo(
        footer,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "top bottom",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);
  
  // Função para scroll suave
  const handleScrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Função para scroll para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-[#0a0a0a] py-12 border-t border-[#b97836]/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo e Copyright */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              {/* Logo */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#b97836] flex items-center justify-center">
                  <div className="w-5 h-5 bg-black rounded-full"></div>
                </div>
                <span className="text-[#b97836] font-bold text-xl ml-2">TIGER</span>
              </div>
            </div>
            <p className="text-white/60 text-sm text-center md:text-left">
              &copy; {currentYear} Tiger Portfolio. Todos os direitos reservados.
            </p>
          </div>
          
          {/* Links de navegação */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className="text-white/70 hover:text-[#b97836] transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Botão de volta ao topo */}
          <button
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="w-10 h-10 bg-[#b97836]/10 border border-[#b97836]/30 rounded-full flex items-center justify-center
                     hover:bg-[#b97836]/20 hover:border-[#b97836] transition-all duration-300"
          >
            <svg className="w-5 h-5 text-[#b97836]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        
        {/* Informações adicionais */}
        <div className="mt-8 pt-8 border-t border-[#b97836]/10 text-center">
          <p className="text-white/40 text-xs">
            Desenvolvido com 
            <span className="mx-1 text-[#b97836]">♥</span> 
            Inspirado na música "Eye of the Tiger" - Sobrevivência, Determinação, Vitória.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;