
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Image, Users, Shield } from 'lucide-react';

const HeroSection = () => (
  <section className="bg-gradient-to-b from-white to-seuclique-lightcloud section-padding">
    <div className="responsive-container flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-seuclique-darkslate font-bold">
          Compartilhe momentos <span className="text-seuclique-turquoise">preservando a privacidade</span> dos seus convidados
        </h1>
        <p className="text-seuclique-silver text-lg">
          Plataforma completa para fotógrafos de eventos gerenciarem todo o fluxo de fotos com reconhecimento facial e privacidade garantida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register">
            <Button className="bg-seuclique-turquoise hover:bg-seuclique-turquoise/90 text-white w-full sm:w-auto px-8 py-6 text-lg">
              Começar Agora
            </Button>
          </Link>
          <Link to="/features">
            <Button variant="outline" className="border-seuclique-turquoise text-seuclique-turquoise hover:bg-seuclique-turquoise/10 w-full sm:w-auto px-8 py-6 text-lg">
              Saiba Mais
            </Button>
          </Link>
        </div>
      </div>
      <div className="lg:w-1/2">
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
          alt="Fotógrafo em evento" 
          className="rounded-lg shadow-xl"
        />
      </div>
    </div>
  </section>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: Camera,
      title: "Gestão de Eventos",
      description: "Organize seus eventos em um único lugar, desde a criação até a entrega das fotos."
    },
    {
      icon: Upload,
      title: "Upload Fácil",
      description: "Faça upload de suas fotos em lote com nosso sistema de arrastar e soltar."
    },
    {
      icon: Image,
      title: "Reconhecimento Facial",
      description: "Nossa tecnologia de IA separa automaticamente as fotos por convidado."
    },
    {
      icon: Users,
      title: "Privacidade Garantida",
      description: "Cada convidado só tem acesso às fotos em que aparece."
    },
    {
      icon: Shield,
      title: "Conformidade LGPD",
      description: "Sistema completo de consentimento e proteção de dados."
    }
  ];

  return (
    <section className="section-padding bg-white" id="features">
      <div className="responsive-container">
        <div className="text-center mb-16">
          <h2 className="text-seuclique-darkslate font-bold mb-4">Recursos exclusivos para fotógrafos</h2>
          <p className="text-seuclique-silver max-w-xl mx-auto">
            Tudo o que você precisa para gerenciar suas fotos de eventos com eficiência e privacidade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:border-seuclique-turquoise/30 hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-seuclique-turquoise/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-seuclique-turquoise" />
              </div>
              <h3 className="text-xl font-semibold text-seuclique-darkslate mb-2">{feature.title}</h3>
              <p className="text-seuclique-silver">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Cadastre-se e crie seu evento",
      description: "Crie sua conta e configure seu primeiro evento com todos os detalhes."
    },
    {
      number: "02",
      title: "Envie o convite digital",
      description: "Gere um link de convite personalizado para seus convidados."
    },
    {
      number: "03",
      title: "Faça upload das fotos",
      description: "Após o evento, faça upload das fotos para nossa plataforma."
    },
    {
      number: "04",
      title: "IA organiza suas fotos",
      description: "Nossa tecnologia separa as fotos por convidado automaticamente."
    },
    {
      number: "05",
      title: "Convidados acessam suas fotos",
      description: "Cada pessoa vê apenas as fotos em que aparece."
    }
  ];

  return (
    <section className="section-padding bg-seuclique-lightcloud">
      <div className="responsive-container">
        <div className="text-center mb-16">
          <h2 className="text-seuclique-darkslate font-bold mb-4">Como funciona</h2>
          <p className="text-seuclique-silver max-w-xl mx-auto">
            Um processo simples e eficiente para você e seus clientes.
          </p>
        </div>
        
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-seuclique-turquoise text-white flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-seuclique-darkslate mb-2">{step.title}</h3>
                <p className="text-seuclique-silver">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block mt-8 ml-8 h-16 w-0.5 bg-gray-200"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CtaSection = () => (
  <section className="section-padding bg-seuclique-darkslate text-white">
    <div className="responsive-container text-center">
      <h2 className="font-bold mb-6">Pronto para revolucionar a maneira como compartilha fotos de eventos?</h2>
      <p className="text-gray-300 max-w-xl mx-auto mb-8">
        Junte-se a centenas de fotógrafos que já estão usando o SeuClique para gerenciar suas fotos com privacidade e eficiência.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/register">
          <Button className="bg-seuclique-turquoise hover:bg-seuclique-turquoise/90 text-white px-8 py-6 text-lg w-full sm:w-auto">
            Começar Agora
          </Button>
        </Link>
        <Link to="/demo">
          <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg w-full sm:w-auto">
            Solicitar Demo
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 py-12">
    <div className="responsive-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-seuclique-darkslate mb-4">Seu<span className="text-seuclique-turquoise">Clique</span></h3>
          <p className="text-seuclique-silver">
            Plataforma completa para fotógrafos de eventos com reconhecimento facial e privacidade.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-seuclique-darkslate mb-4">Links Rápidos</h4>
          <ul className="space-y-2">
            <li><Link to="/features" className="text-seuclique-silver hover:text-seuclique-turquoise transition-colors">Recursos</Link></li>
            <li><Link to="/pricing" className="text-seuclique-silver hover:text-seuclique-turquoise transition-colors">Preços</Link></li>
            <li><Link to="/help" className="text-seuclique-silver hover:text-seuclique-turquoise transition-colors">Ajuda</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-seuclique-darkslate mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><Link to="/terms" className="text-seuclique-silver hover:text-seuclique-turquoise transition-colors">Termos de Uso</Link></li>
            <li><Link to="/privacy" className="text-seuclique-silver hover:text-seuclique-turquoise transition-colors">Privacidade</Link></li>
            <li><Link to="/lgpd" className="text-seuclique-silver hover:text-seuclique-turquoise transition-colors">LGPD</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-seuclique-darkslate mb-4">Contato</h4>
          <ul className="space-y-2">
            <li><a href="mailto:contato@seuclique.com.br" className="text-seuclique-silver hover:text-seuclique-turquoise transition-colors">contato@seuclique.com.br</a></li>
            <li><a href="tel:+5511999999999" className="text-seuclique-silver hover:text-seuclique-turquoise transition-colors">(11) 99999-9999</a></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-seuclique-silver">
        <p>&copy; {new Date().getFullYear()} SeuClique. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
