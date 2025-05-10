import { useState, useEffect } from "react";
import gsap from "gsap";

/**
 * Componente de barra de navegação
 * Implementa navegação responsiva com animações e efeitos
 */
const NavBar = () => {
  // Estado para controlar a visibilidade do menu mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estado para controlar o estilo da navbar ao scroll
  const [scrolled, setScrolled] = useState(false);

  // Lista de links da navegação
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Habilidades", href: "#skills" },
    { name: "Contato", href: "#contact" },
  ];

  // Efeito para detectar o scroll e mudar o estilo da navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Adiciona event listener para o scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Efeito para animar a abertura/fechamento do menu mobile
  useEffect(() => {
    if (mobileMenuOpen) {
      // Anima a abertura do menu
      gsap.fromTo(
        ".mobile-menu",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );

      // Anima os itens do menu com stagger
      gsap.fromTo(
        ".mobile-menu-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [mobileMenuOpen]);

  // Alterna o estado do menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Fecha o menu mobile e faz scroll suave para a seção
  const handleNavClick = (href) => {
    setMobileMenuOpen(false);

    // Scroll suave para a seção
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-sm py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="logo text-2xl font-bold">
          <a href="#home" className="text-[#b97836] flex items-center">
            {/* Ícone estilizado de olho */}
            <div className="w-8 h-8 mr-2 rounded-full bg-[#b97836] flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
            <span>TIGER</span>
          </a>
        </div>

        {/* Links de navegação - visíveis apenas em telas maiores */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-white hover:text-[#b97836] transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b97836] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Botão de menu mobile - visível apenas em telas menores */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <div className={`hamburger-icon ${mobileMenuOpen ? "open" : ""}`}>
            <span
              className={`block w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${
                mobileMenuOpen ? "transform rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                mobileMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Menu mobile - visível apenas quando aberto */}
      {mobileMenuOpen && (
        <div className="mobile-menu md:hidden bg-black/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-5">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="mobile-menu-item block py-3 text-white hover:text-[#b97836] transition-colors duration-300 border-b border-white/10"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
