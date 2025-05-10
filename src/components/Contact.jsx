import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAnimation } from '../context/AnimationContext';

/**
 * Componente de Contato
 * Formulário de contato com validação e animações
 */
const Contact = () => {
  // Referências para elementos DOM
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef(null);
  
  // Context para animações
  const { isSectionAnimated, markSectionAsAnimated, isElementInView } = useAnimation();
  
  // Estados para o formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Lista de redes sociais
  const socialLinks = [
    { name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com" },
    { name: "GitHub", icon: "github", url: "https://github.com" },
    { name: "Twitter", icon: "twitter", url: "https://twitter.com" },
    { name: "Instagram", icon: "instagram", url: "https://instagram.com" }
  ];
  
  // Efeito para animação no scroll
  useEffect(() => {
    // Não anima novamente se já foi animado
    if (isSectionAnimated('contact')) return;
    
    const section = sectionRef.current;
    
    // Configuração da animação baseada em scroll
    const animateOnScroll = () => {
      if (isElementInView(section, -100) && !isSectionAnimated('contact')) {
        // Marca a seção como animada
        markSectionAsAnimated('contact');
        
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
        
        // Animação do formulário
        tl.fromTo(formRef.current, 
          { x: -30, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 
          "-=0.4"
        );
        
        // Animação dos links sociais
        tl.fromTo(socialRef.current, 
          { x: 30, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 
          "-=0.7"
        );
        
        // Animação dos campos do formulário
        tl.fromTo(".form-control", 
          { y: 20, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            stagger: 0.1, 
            ease: "power2.out" 
          }, 
          "-=0.5"
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
  
  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpa o erro quando o usuário digita
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Validação do formulário
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'E-mail inválido';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Mensagem muito curta (mínimo 10 caracteres)';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulação de envio (substituir por chamada real à API)
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Limpa o formulário após o envio
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Resetar o sucesso após alguns segundos
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };
  
  // Função para renderizar ícones sociais
  const renderSocialIcon = (icon) => {
    // Renderiza o ícone correto baseado no nome
    // Em um projeto real, você usaria um pacote de ícones como react-icons
    
    const iconMap = {
      linkedin: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
        </svg>
      ),
      github: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
        </svg>
      ),
      twitter: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
        </svg>
      ),
      instagram: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
        </svg>
      )
    };
    
    return iconMap[icon] || null;
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-black relative overflow-hidden"
    >
      {/* Elementos decorativos - padrão de patas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-24 h-24"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.6})` 
            }}
          >
            {/* Forma simplificada de pata de tigre */}
            <div className="relative w-full h-full">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#b97836] rounded-full"></div>
              {Array.from({ length: 4 }).map((_, j) => (
                <div 
                  key={j}
                  className="absolute w-5 h-7 bg-[#b97836] rounded-full"
                  style={{ 
                    top: j === 0 ? '8px' : '5px',
                    left: `${j * 7 + (j < 2 ? 2 : 10)}px`,
                    transform: `rotate(${(j - 1.5) * 15}deg)`,
                    transformOrigin: 'bottom center'
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef} 
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
        >
          Entre em <span className="text-[#b97836]">Contato</span>
        </h2>
        
        <p 
          ref={introRef}
          className="text-white/80 max-w-3xl mx-auto text-center mb-16"
        >
          Estou sempre em busca de novos desafios e oportunidades para demonstrar minhas habilidades.
          Se você tem um projeto em mente ou quer conversar sobre possíveis colaborações, não hesite em entrar em contato.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Formulário de contato */}
          <div 
            ref={formRef}
            className="lg:pr-8"
          >
            <form onSubmit={handleSubmit}>
              {/* Mensagem de sucesso */}
              {submitSuccess && (
                <div className="mb-6 p-4 bg-[#b97836]/10 border border-[#b97836] rounded-md">
                  <p className="text-[#b97836] font-medium">
                    Mensagem enviada com sucesso! Entrarei em contato em breve.
                  </p>
                </div>
              )}
              
              <div className="form-control mb-5">
                <label 
                  htmlFor="name" 
                  className="block text-white/90 mb-2 font-medium"
                >
                  Nome
                </label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  className={`w-full px-4 py-3 bg-black/40 border ${
                    formErrors.name ? 'border-red-500' : 'border-[#b97836]/30'
                  } rounded-md focus:outline-none focus:border-[#b97836] transition-colors`}
                  disabled={isSubmitting}
                />
                {formErrors.name && (
                  <p className="mt-1 text-red-500 text-sm">{formErrors.name}</p>
                )}
              </div>
              
              <div className="form-control mb-5">
                <label 
                  htmlFor="email" 
                  className="block text-white/90 mb-2 font-medium"
                >
                  E-mail
                </label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu.email@exemplo.com"
                  className={`w-full px-4 py-3 bg-black/40 border ${
                    formErrors.email ? 'border-red-500' : 'border-[#b97836]/30'
                  } rounded-md focus:outline-none focus:border-[#b97836] transition-colors`}
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <p className="mt-1 text-red-500 text-sm">{formErrors.email}</p>
                )}
              </div>
              
              <div className="form-control mb-5">
                <label 
                  htmlFor="subject" 
                  className="block text-white/90 mb-2 font-medium"
                >
                  Assunto (opcional)
                </label>
                <input 
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Assunto da mensagem"
                  className="w-full px-4 py-3 bg-black/40 border border-[#b97836]/30 rounded-md focus:outline-none focus:border-[#b97836] transition-colors"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-control mb-6">
                <label 
                  htmlFor="message" 
                  className="block text-white/90 mb-2 font-medium"
                >
                  Mensagem
                </label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Sua mensagem"
                  rows={5}
                  className={`w-full px-4 py-3 bg-black/40 border ${
                    formErrors.message ? 'border-red-500' : 'border-[#b97836]/30'
                  } rounded-md focus:outline-none focus:border-[#b97836] transition-colors`}
                  disabled={isSubmitting}
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-red-500 text-sm">{formErrors.message}</p>
                )}
              </div>
              
              <button 
                type="submit"
                className="w-full py-3 px-6 bg-[#b97836] text-black font-bold rounded-md transform transition-all 
                           duration-300 hover:bg-[#e8a653] hover:shadow-tiger focus:outline-none focus:ring-2
                           focus:ring-[#b97836] focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : 'Enviar Mensagem'}
              </button>
            </form>
          </div>
          
          {/* Informações de contato e redes sociais */}
          <div 
            ref={socialRef}
            className="lg:border-l lg:border-[#b97836]/20 lg:pl-8"
          >
            <div className="mb-8 bg-black/40 p-6 border border-[#b97836]/20 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-[#b97836]">Informações de Contato</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#b97836]/10 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-[#b97836]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">E-mail</p>
                    <a href="mailto:contato@exemplo.com" className="text-white hover:text-[#b97836] transition-colors">
                      contato@exemplo.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#b97836]/10 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-[#b97836]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Telefone</p>
                    <a href="tel:+5511999999999" className="text-white hover:text-[#b97836] transition-colors">
                      +55 (11) 99999-9999
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#b97836]/10 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-[#b97836]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Localização</p>
                    <p className="text-white">
                      São Paulo, SP - Brasil
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Redes sociais */}
            <div className="mb-8 bg-black/40 p-6 border border-[#b97836]/20 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-[#b97836]">Redes Sociais</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-black/60 border border-[#b97836]/20 rounded-md
                              transition-all duration-300 hover:border-[#b97836] hover:bg-[#b97836]/10 
                              group"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#b97836]/10 flex items-center justify-center mr-3 
                                  group-hover:bg-[#b97836]/20 transition-colors">
                      <span className="text-[#b97836] group-hover:text-[#e8a653] transition-colors">
                        {renderSocialIcon(link.icon)}
                      </span>
                    </div>
                    <span className="text-white group-hover:text-[#b97836] transition-colors">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Disponibilidade */}
            <div className="bg-black/40 p-6 border border-[#b97836]/20 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-[#b97836]">Disponibilidade</h3>
              
              <p className="text-white/80 mb-4">
                Estou disponível para novos projetos e oportunidades de trabalho. Entre em contato
                para discutirmos como posso ajudar a transformar suas ideias em realidade.
              </p>
              
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <p className="text-green-400 text-sm">Disponível para novos projetos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;