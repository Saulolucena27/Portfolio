import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAnimation } from "../context/AnimationContext";

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const { isSectionAnimated, markSectionAsAnimated, isElementInView } =
    useAnimation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://linkedin.com",
      color: "#0077B5",
    },
    {
      name: "GitHub",
      icon: "github",
      url: "https://github.com",
      color: "#333",
    },
    {
      name: "Instagram",
      icon: "instagram",
      url: "https://instagram.com",
      color: "#E1306C",
    },
    {
      name: "Twitter",
      icon: "twitter",
      url: "https://twitter.com",
      color: "#1DA1F2",
    },
  ];

  useEffect(() => {
    if (isSectionAnimated("contact")) return;

    const section = sectionRef.current;

    const animateOnScroll = () => {
      if (isElementInView(section, -100) && !isSectionAnimated("contact")) {
        markSectionAsAnimated("contact");

        const tl = gsap.timeline();

        tl.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        );

        tl.fromTo(
          formRef.current,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        );

        tl.fromTo(
          infoRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.7"
        );

        tl.fromTo(
          ".form-field",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.5"
        );
      }
    };

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();

    return () => {
      window.removeEventListener("scroll", animateOnScroll);
    };
  }, [isSectionAnimated, markSectionAsAnimated, isElementInView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      errors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "E-mail inválido";
    }

    if (!formData.message.trim()) {
      errors.message = "Mensagem é obrigatória";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulação de envio
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#b97836] rounded-full blur-[128px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#e8a653] rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 ref={titleRef} className="mb-4 text-4xl font-bold md:text-6xl">
            Vamos <span className="text-[#b97836]">Conversar</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/70">
            Tem um projeto em mente? Vamos transformar suas ideias em realidade.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitSuccess && (
                <div className="p-4 border rounded-lg bg-green-500/10 border-green-500/30">
                  <p className="text-green-400">
                    Mensagem enviada com sucesso! Entrarei em contato em breve.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 form-field md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className={`w-full px-6 py-4 bg-white/5 border rounded-lg 
                              text-white placeholder:text-white/40 
                              focus:outline-none focus:border-[#b97836] 
                              transition-colors ${
                                formErrors.name
                                  ? "border-red-500"
                                  : "border-white/10"
                              }`}
                  />
                  {formErrors.name && (
                    <p className="mt-2 text-sm text-red-400">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Seu e-mail"
                    className={`w-full px-6 py-4 bg-white/5 border rounded-lg 
                              text-white placeholder:text-white/40 
                              focus:outline-none focus:border-[#b97836] 
                              transition-colors ${
                                formErrors.email
                                  ? "border-red-500"
                                  : "border-white/10"
                              }`}
                  />
                  {formErrors.email && (
                    <p className="mt-2 text-sm text-red-400">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-field">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Assunto"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg 
                           text-white placeholder:text-white/40 
                           focus:outline-none focus:border-[#b97836] transition-colors"
                />
              </div>

              <div className="form-field">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Sua mensagem"
                  rows={6}
                  className={`w-full px-6 py-4 bg-white/5 border rounded-lg 
                            text-white placeholder:text-white/40 resize-none
                            focus:outline-none focus:border-[#b97836] 
                            transition-colors ${
                              formErrors.message
                                ? "border-red-500"
                                : "border-white/10"
                            }`}
                ></textarea>
                {formErrors.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="form-field w-full py-4 px-8 bg-[#b97836] text-black font-bold rounded-lg
                         transform transition-all duration-300 hover:scale-[1.02] 
                         hover:shadow-[0_0_30px_rgba(185,120,54,0.5)]
                         disabled:opacity-70 disabled:cursor-not-allowed
                         disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-3 -ml-1 text-black animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  "Enviar Mensagem"
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:pl-12">
            {/* Contact Methods */}
            <div className="mb-12">
              <h3 className="mb-6 text-2xl font-bold text-white">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                <a
                  href="mailto:contato@exemplo.com"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10
                            hover:border-[#b97836]/50 transition-colors group"
                >
                  <div
                    className="w-12 h-12 bg-[#b97836]/20 rounded-lg flex items-center justify-center
                                group-hover:bg-[#b97836]/30 transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-[#b97836]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">E-mail</p>
                    <p className="font-medium text-white">
                      contato@exemplo.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+5511999999999"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10
                            hover:border-[#b97836]/50 transition-colors group"
                >
                  <div
                    className="w-12 h-12 bg-[#b97836]/20 rounded-lg flex items-center justify-center
                                group-hover:bg-[#b97836]/30 transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-[#b97836]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Telefone</p>
                    <p className="font-medium text-white">
                      +55 (11) 99999-9999
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 border rounded-lg bg-white/5 border-white/10">
                  <div className="w-12 h-12 bg-[#b97836]/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#b97836]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Localização</p>
                    <p className="font-medium text-white">
                      São Paulo, SP - Brasil
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="mb-6 text-2xl font-bold text-white">
                Redes Sociais
              </h3>

              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 
                             flex items-center justify-center
                             hover:border-[#b97836]/50 hover:bg-white/10 transition-all duration-300
                             group"
                    style={{ "--hover-color": link.color }}
                  >
                    <svg
                      className="w-5 h-5 text-white group-hover:text-[#b97836] transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {link.icon === "linkedin" && (
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      )}
                      {link.icon === "github" && (
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      )}
                      {link.icon === "instagram" && (
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      )}
                      {link.icon === "twitter" && (
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
