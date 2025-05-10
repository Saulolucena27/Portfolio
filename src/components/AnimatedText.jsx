import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedText = ({ children, className = "" }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    // Salva o texto original
    const originalText = text.innerText;
    const chars = originalText.split("");

    // Cria spans para cada caractere
    text.innerHTML = chars
      .map((char) =>
        char === " " ? "&nbsp;" : `<span class="char">${char}</span>`
      )
      .join("");

    // Seleciona todos os caracteres
    const charElements = text.querySelectorAll(".char");

    // Configuração inicial
    gsap.set(charElements, {
      transformOrigin: "50% 50%",
      display: "inline-block",
    });

    // Animação de hover
    const handleMouseEnter = () => {
      gsap.to(charElements, {
        duration: 0.4,
        rotationX: () => gsap.utils.random(-45, 45),
        rotationY: () => gsap.utils.random(-45, 45),
        z: () => gsap.utils.random(-20, 20),
        scale: () => gsap.utils.random(0.9, 1.1),
        ease: "power2.out",
        stagger: {
          amount: 0.3,
          from: "random",
        },
      });
    };

    const handleMouseLeave = () => {
      gsap.to(charElements, {
        duration: 0.6,
        rotationX: 0,
        rotationY: 0,
        z: 0,
        scale: 1,
        ease: "elastic.out(1, 0.3)",
        stagger: {
          amount: 0.3,
          from: "random",
        },
      });
    };

    // Event listeners
    text.addEventListener("mouseenter", handleMouseEnter);
    text.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      if (text) {
        text.removeEventListener("mouseenter", handleMouseEnter);
        text.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [children]);

  return (
    <span
      ref={textRef}
      className={`inline-block cursor-pointer ${className}`}
      style={{
        perspective: "400px",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </span>
  );
};

export default AnimatedText;
