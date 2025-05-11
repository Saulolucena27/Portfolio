import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GlobalScrollEffects = () => {
  useEffect(() => {
    // Cursor com efeito de trail
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      let cursorTrail = [];
      for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
          position: fixed;
          width: ${20 - i * 3}px;
          height: ${20 - i * 3}px;
          background: #b97836;
          border-radius: 50%;
          pointer-events: none;
          opacity: ${0.3 - i * 0.05};
          z-index: 999;
          transform: translate(-50%, -50%);
        `;
        document.body.appendChild(trail);
        cursorTrail.push(trail);
      }

      window.addEventListener('mousemove', (e) => {
        cursorTrail.forEach((trail, index) => {
          gsap.to(trail, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1 + index * 0.05,
            ease: "power2.out"
          });
        });
      });
    }

    // Efeito de parallax suave em todas as seções
    const sections = gsap.utils.toArray('section');
    sections.forEach((section) => {
      const isHorizontal = section.classList.contains('horizontal-scroll');
      if (!isHorizontal) {
        // Background parallax
        const bg = section.querySelector('.parallax-bg');
        if (bg) {
          gsap.to(bg, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          });
        }

        // Fade in elements
        const fadeInElements = section.querySelectorAll('.fade-in');
        fadeInElements.forEach((el) => {
          gsap.fromTo(el, 
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
              }
            }
          );
        });

        // Reveal text animation
        const revealTexts = section.querySelectorAll('.reveal-text');
        revealTexts.forEach((text) => {
          const chars = text.innerText.split('');
          text.innerHTML = chars
            .map(char => `<span class="char">${char}</span>`)
            .join('');
          
          gsap.fromTo(text.querySelectorAll('.char'),
            { 
              opacity: 0,
              y: 50,
              rotateX: -90
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              stagger: 0.02,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: text,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        // Floating elements
        const floatingElements = section.querySelectorAll('.float-element');
        floatingElements.forEach((el, index) => {
          gsap.to(el, {
            y: "random(-20, 20)",
            x: "random(-20, 20)",
            rotation: "random(-5, 5)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1
          });
        });

        // Scale on scroll
        const scaleElements = section.querySelectorAll('.scale-on-scroll');
        scaleElements.forEach((el) => {
          gsap.fromTo(el,
            { scale: 0.8 },
            {
              scale: 1.1,
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              }
            }
          );
        });
      }
    });

    // Smooth scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #b97836, #e8a653);
      z-index: 1000;
      transform-origin: left;
      transform: scaleX(0);
    `;
    document.body.appendChild(progressBar);

    gsap.to(progressBar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        scrub: 0.3
      }
    });

    // Smooth scroll para navegação
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: target,
            ease: "power3.inOut"
          });
        }
      });
    });

    // Magnetic effect nos botões
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(elem => {
      elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(elem, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      elem.addEventListener('mouseleave', () => {
        gsap.to(elem, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.querySelector('.scroll-progress')?.remove();
      document.querySelectorAll('.cursor-trail').forEach(trail => trail.remove());
    };
  }, []);

  return null; // Este componente não renderiza nada
};

export default GlobalScrollEffects;