import { useState, useEffect } from "react";
import gsap from "gsap";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Habilidades", href: "#skills" },
    { name: "Contato", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Detect active section
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        ".mobile-menu",
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        ".mobile-menu-item",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-10 h-10">
              <div
                className="absolute inset-0 bg-[#b97836] rounded-lg transform rotate-6 
                            group-hover:rotate-12 transition-transform duration-300"
              ></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black rounded-lg">
                <span className="text-[#b97836] font-bold text-xl">T</span>
              </div>
            </div>
            <span className="text-xl font-bold text-white">TIGER</span>
          </a>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.href.substring(1)
                    ? "text-[#b97836]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#b97836] 
                                 rounded-full transform origin-center scale-x-100"
                  ></span>
                )}
              </a>
            ))}

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-6 py-2.5 bg-[#b97836] text-black font-bold rounded-full
                       transform transition-all duration-300 hover:scale-105 
                       hover:shadow-[0_0_20px_rgba(185,120,54,0.5)]"
            >
              Contato
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="relative w-10 h-10 md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <span
                className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed inset-y-0 right-0 w-full md:hidden bg-black/95 backdrop-blur-lg
                   transform transition-transform duration-500 ${
                     mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                   }`}
      >
        <div className="flex flex-col items-center justify-center h-full px-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`mobile-menu-item text-2xl font-bold py-4 transition-colors ${
                activeSection === link.href.substring(1)
                  ? "text-[#b97836]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="mobile-menu-item mt-8 px-8 py-3 bg-[#b97836] text-black font-bold rounded-full
                     transform transition-all duration-300 hover:scale-105"
          >
            Contato
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
