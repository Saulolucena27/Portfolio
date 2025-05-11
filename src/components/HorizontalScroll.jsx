import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;

    // Calcula a largura total do scroll horizontal
    const scrollDistance = wrapper.scrollWidth - window.innerWidth;

    // Cria o scroll horizontal
    const horizontalScroll = gsap.to(wrapper, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      horizontalScroll.kill();
    };
  }, []);

  const features = [
    {
      icon: "🚀",
      title: "Performance",
      description: "Aplicações otimizadas para máxima velocidade",
    },
    {
      icon: "🎨",
      title: "Design",
      description: "Interfaces modernas e intuitivas",
    },
    {
      icon: "🔒",
      title: "Segurança",
      description: "Código seguro e boas práticas",
    },
    {
      icon: "📱",
      title: "Responsivo",
      description: "Funciona perfeitamente em todos os dispositivos",
    },
  ];

  return (
    <section ref={sectionRef} className="h-screen overflow-hidden bg-black">
      <div
        ref={wrapperRef}
        className="flex items-center h-full"
        style={{ width: `${features.length * 100}vw` }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-screen h-full px-20"
          >
            <div className="max-w-lg text-center">
              <div className="mb-8 text-8xl">{feature.icon}</div>
              <h3 className="text-4xl font-bold text-[#b97836] mb-4">
                {feature.title}
              </h3>
              <p className="text-xl text-white/80">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;
