import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Image, Users, ShieldCheck, Star, Upload } from 'lucide-react';
const HeroSection = () => <section className="bg-gradient-to-br from-modern-petrol to-modern-petrol/90 text-white section-padding min-h-[80vh] flex items-center">
    <div className="responsive-container flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="lg:w-1/2 space-y-8 animate-fade-in">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
          Reviva cada clique do seu <span className="text-modern-coral">evento</span>
        </h1>
        <p className="text-xl opacity-90">
          Uma nova forma de se ver nas memórias dos fotógrafos. Com inteligência artificial e privacidade garantida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link to="/register">
            <Button className="bg-modern-coral hover:bg-modern-coral/80 text-white py-6 px-8 text-lg w-full sm:w-auto">
              Sou Fotógrafo
            </Button>
          </Link>
          <Link to="/gallery">
            <Button variant="outline" className="border-2 border-white hover:bg-white/20 py-6 px-8 text-lg w-full sm:w-auto text-gray-950">
              Sou Convidado
            </Button>
          </Link>
        </div>
      </div>
      <div className="lg:w-1/2 animate-fade-in">
        <img src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Fotógrafo em evento" className="rounded-xl shadow-2xl object-cover max-h-[600px] w-full" />
      </div>
    </div>
  </section>;
const ForGuestsSection = () => <section className="section-padding bg-white">
    <div className="responsive-container">
      <div className="text-center mb-16 animate-on-scroll">
        <h2 className="text-modern-petrol mb-4">Como funciona para convidados</h2>
        <p className="text-modern-gray max-w-3xl mx-auto">
          Processo simples e rápido para encontrar e adquirir suas fotos com total privacidade.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[{
        icon: Users,
        title: "Cadastre-se",
        description: "Faça seu cadastro e envie uma foto de referência."
      }, {
        icon: Image,
        title: "Acesse o evento",
        description: "Entre no evento usando o link compartilhado pelo fotógrafo."
      }, {
        icon: ShieldCheck,
        title: "Veja suas fotos",
        description: "Acesse com segurança apenas as fotos em que você aparece."
      }].map((step, index) => <Card key={index} className="animate-on-scroll card-hover border-none shadow-md">
            <CardContent className="p-8">
              <div className="h-14 w-14 rounded-full bg-modern-coral/10 flex items-center justify-center mb-6">
                <step.icon size={28} className="text-modern-coral" />
              </div>
              <h3 className="text-xl font-semibold text-modern-petrol mb-3">{step.title}</h3>
              <p className="text-modern-gray">{step.description}</p>
            </CardContent>
          </Card>)}
      </div>
    </div>
  </section>;
const ForPhotographersSection = () => <section className="section-padding bg-modern-ice">
    <div className="responsive-container">
      <div className="text-center mb-16 animate-on-scroll">
        <h2 className="text-modern-petrol mb-4">Para Fotógrafos</h2>
        <p className="text-modern-gray max-w-3xl mx-auto">
          Gerencie seus eventos e fotos com eficiência usando inteligência artificial.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[{
        icon: Camera,
        title: "Crie sua conta",
        description: "Cadastre-se e configure seu perfil profissional."
      }, {
        icon: Upload,
        title: "Upload de fotos",
        description: "Faça upload das fotos do evento facilmente."
      }, {
        icon: Image,
        title: "IA organiza tudo",
        description: "Nossa IA separa as fotos por convidado automaticamente."
      }, {
        icon: ShieldCheck,
        title: "Privacidade garantida",
        description: "Cada cliente vê apenas suas próprias fotos."
      }].map((feature, index) => <Card key={index} className="animate-on-scroll card-hover border-none shadow-md">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-modern-petrol/10 flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-modern-petrol" />
              </div>
              <h3 className="text-lg font-semibold text-modern-petrol mb-2">{feature.title}</h3>
              <p className="text-modern-gray text-sm">{feature.description}</p>
            </CardContent>
          </Card>)}
      </div>
    </div>
  </section>;
const GallerySection = () => <section className="section-padding bg-modern-petrol text-white">
    <div className="responsive-container">
      <div className="text-center mb-16 animate-on-scroll">
        <h2 className="mb-4">Galeria em Destaque</h2>
        <p className="text-white/80 max-w-3xl mx-auto">
          Confira algumas das melhores fotos compartilhadas através da nossa plataforma.
        </p>
      </div>
      <div className="grid-gallery animate-on-scroll">
        {Array(6).fill(null).map((_, index) => <div key={index} className="overflow-hidden rounded-lg hover-scale">
            <img src={`https://source.unsplash.com/random/800x600?wedding,event&sig=${index}`} alt={`Foto de evento ${index + 1}`} className="w-full h-64 object-cover" />
            <div className="bg-modern-petrol/90 p-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Fotógrafo {index + 1}</span>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-modern-coral" />
                  <span>{Math.floor(Math.random() * 30) + 20}</span>
                </div>
              </div>
              <p className="text-sm text-white/70">Casamento • São Paulo</p>
            </div>
          </div>)}
      </div>
    </div>
  </section>;
const CtaSection = () => <section className="section-padding bg-gradient-to-br from-modern-coral to-modern-coral/80 text-white">
    <div className="responsive-container text-center">
      <div className="max-w-3xl mx-auto animate-on-scroll">
        <h2 className="mb-6 leading-tight">Pronto para revolucionar a maneira como você compartilha fotos?</h2>
        <p className="text-white/90 mb-8">
          Junte-se a centenas de fotógrafos profissionais que já estão usando o Seu Clique.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <Button className="bg-white text-modern-coral hover:bg-white/90 font-semibold py-6 px-8 text-lg w-full sm:w-auto">
              Começar Agora
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 py-6 px-8 text-lg w-full sm:w-auto">
              Fale Conosco
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>;
const Footer = () => <footer className="bg-white border-t border-gray-200 py-12">
    <div className="responsive-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-modern-petrol mb-4">Seu<span className="text-modern-coral">Clique</span></h3>
          <p className="text-modern-gray">
            Plataforma completa para fotógrafos de eventos com reconhecimento facial e privacidade garantida.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-modern-petrol mb-4">Links Rápidos</h4>
          <ul className="space-y-2">
            <li><Link to="/features" className="text-modern-gray hover:text-modern-coral transition-colors">Recursos</Link></li>
            <li><Link to="/pricing" className="text-modern-gray hover:text-modern-coral transition-colors">Preços</Link></li>
            <li><Link to="/help" className="text-modern-gray hover:text-modern-coral transition-colors">Ajuda</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-modern-petrol mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><Link to="/terms" className="text-modern-gray hover:text-modern-coral transition-colors">Termos de Uso</Link></li>
            <li><Link to="/privacy" className="text-modern-gray hover:text-modern-coral transition-colors">Privacidade</Link></li>
            <li><Link to="/lgpd" className="text-modern-gray hover:text-modern-coral transition-colors">LGPD</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-modern-petrol mb-4">Contato</h4>
          <ul className="space-y-2">
            <li><a href="mailto:contato@seuclique.com.br" className="text-modern-gray hover:text-modern-coral transition-colors">contato@seuclique.com.br</a></li>
            <li><a href="tel:+5511999999999" className="text-modern-gray hover:text-modern-coral transition-colors">(11) 99999-9999</a></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-modern-gray">
        <p>&copy; {new Date().getFullYear()} SeuClique. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>;
const Index = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ForGuestsSection />
        <ForPhotographersSection />
        <GallerySection />
        <CtaSection />
      </main>
      <Footer />
    </div>;
};
export default Index;