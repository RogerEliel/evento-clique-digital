import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Image, Users, ShieldCheck, Eye, Upload, Check, Clock, Star } from 'lucide-react';

// Observer for scroll animations
const useIntersectionObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => observer.observe(element));
    return () => {
      animatedElements.forEach(element => observer.unobserve(element));
    };
  }, []);
};
const Features = () => {
  useIntersectionObserver();
  return <div className="min-h-screen flex flex-col bg-modern-ice">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-modern-petrol to-modern-petrol/90 text-white section-padding">
          <div className="responsive-container flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6 animate-fade-in">
              <h1 className="leading-tight">
                Recursos exclusivos para <span className="text-modern-coral">revolucionar</span> o compartilhamento de fotos
              </h1>
              <p className="text-lg opacity-90">
                Descubra como o Seu Clique está transformando a maneira como fotógrafos e clientes interagem com as memórias de eventos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="bg-modern-coral hover:bg-modern-coral/90 text-white py-6 px-8 rounded-lg text-lg">
                  Experimente Grátis
                </Button>
                <Button variant="outline" className="border-2 border-white py-6 px-8 rounded-lg text-lg bg-slate-50 text-gray-950">
                  Ver Demo
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center animate-fade-in">
              <img src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Fotógrafo em evento" className="rounded-xl shadow-2xl object-cover max-h-[500px] w-full" />
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="section-padding bg-white">
          <div className="responsive-container">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-modern-petrol mb-4">Benefícios que fazem a diferença</h2>
              <p className="text-modern-gray max-w-3xl mx-auto">
                Nossa plataforma foi projetada pensando tanto nos fotógrafos quanto nos clientes, oferecendo soluções que agregam valor real para ambos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[{
              icon: ShieldCheck,
              title: "Privacidade Garantida",
              description: "Cada convidado acessa apenas as fotos em que aparece, garantindo privacidade e controle total sobre sua imagem."
            }, {
              icon: Clock,
              title: "Economia de Tempo",
              description: "Automatização inteligente que separa e organiza centenas de fotos em minutos, não em horas ou dias."
            }, {
              icon: Star,
              title: "Experiência Premium",
              description: "Interface intuitiva e elegante que valoriza as fotos e proporciona uma experiência memorável aos usuários."
            }].map((benefit, index) => <Card key={index} className="animate-on-scroll card-hover border-none shadow-md">
                  <CardContent className="p-8">
                    <div className="h-14 w-14 rounded-full bg-modern-coral/10 flex items-center justify-center mb-6">
                      <benefit.icon size={28} className="text-modern-coral" />
                    </div>
                    <h3 className="text-xl font-semibold text-modern-petrol mb-3">{benefit.title}</h3>
                    <p className="text-modern-gray">{benefit.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>
        
        {/* For Photographers */}
        <section className="section-padding bg-modern-ice">
          <div className="responsive-container">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 order-2 lg:order-1 space-y-6 animate-on-scroll">
                <h2 className="text-modern-petrol">Para Fotógrafos</h2>
                <div className="space-y-6">
                  {[{
                  icon: Camera,
                  title: "Crie sua conta",
                  description: "Cadastre-se facilmente e configure seu perfil profissional em minutos."
                }, {
                  icon: Upload,
                  title: "Upload de fotos",
                  description: "Faça upload das fotos do evento de forma rápida e organizada."
                }, {
                  icon: Users,
                  title: "IA organiza tudo",
                  description: "Nossa inteligência artificial reconhece e separa as fotos por convidado automaticamente."
                }, {
                  icon: Check,
                  title: "Clientes acessam apenas suas fotos",
                  description: "Cada convidado vê somente as fotos em que aparece, garantindo privacidade."
                }].map((step, index) => <div key={index} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-modern-petrol flex items-center justify-center">
                        <step.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-modern-petrol mb-2">{step.title}</h4>
                        <p className="text-modern-gray">{step.description}</p>
                      </div>
                    </div>)}
                </div>
                <div className="pt-6">
                  <Button className="bg-modern-coral hover:bg-modern-coral/90 text-white">
                    Comece como Fotógrafo
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2 animate-on-scroll">
                <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Fotógrafo profissional" className="rounded-xl shadow-lg object-cover w-full" />
              </div>
            </div>
          </div>
        </section>
        
        {/* For Guests */}
        <section className="section-padding bg-white">
          <div className="responsive-container">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 animate-on-scroll">
                <img src="https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Convidados em evento" className="rounded-xl shadow-lg object-cover w-full" />
              </div>
              <div className="lg:w-1/2 space-y-6 animate-on-scroll">
                <h2 className="text-modern-petrol">Para Convidados</h2>
                <div className="space-y-6">
                  {[{
                  icon: Users,
                  title: "Cadastre-se e envie uma foto sua",
                  description: "Faça um cadastro simples e envie uma selfie para referência."
                }, {
                  icon: Eye,
                  title: "Acesse o evento",
                  description: "Entre no evento através do link compartilhado pelo fotógrafo."
                }, {
                  icon: Image,
                  title: "Veja e compre as fotos onde você aparece",
                  description: "Tenha acesso a todas as fotos em que você foi identificado e escolha suas favoritas para comprar."
                }].map((step, index) => <div key={index} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-modern-coral flex items-center justify-center">
                        <step.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-modern-petrol mb-2">{step.title}</h4>
                        <p className="text-modern-gray">{step.description}</p>
                      </div>
                    </div>)}
                </div>
                <div className="pt-6">
                  <Button className="bg-modern-petrol hover:bg-modern-petrol/90 text-white">
                    Acessar como Convidado
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Gallery */}
        <section className="section-padding bg-modern-petrol text-white">
          <div className="responsive-container">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="mb-4">Galeria em Destaque</h2>
              <p className="text-white/80 max-w-3xl mx-auto">
                Confira algumas das melhores fotos compartilhadas através da nossa plataforma, sempre com autorização dos fotógrafos e convidados.
              </p>
            </div>
            
            <div className="grid-gallery animate-on-scroll">
              {Array(8).fill(null).map((_, index) => <div key={index} className="overflow-hidden rounded-lg hover-scale">
                  <img src={`https://source.unsplash.com/random/600x400?wedding,event&sig=${index}`} alt={`Foto de evento ${index + 1}`} className="w-full h-64 object-cover" />
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
            
            <div className="text-center mt-12">
              <Button variant="outline" className="border-2 border-white hover:bg-white/10 text-gray-950">
                Ver Mais Fotos
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-modern-coral to-modern-coral/80 text-white">
          <div className="responsive-container text-center">
            <div className="max-w-3xl mx-auto animate-on-scroll">
              <h2 className="mb-6 leading-tight">Pronto para transformar a maneira como você trabalha com fotos?</h2>
              <p className="text-white/90 mb-8">
                Junte-se a centenas de fotógrafos profissionais que já estão usando o Seu Clique para gerenciar suas fotos com segurança, eficiência e privacidade.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-white text-modern-coral hover:bg-white/90 font-semibold py-6 px-8 text-lg">
                  Começar Agora
                </Button>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 py-6 px-8 text-lg">
                  Agendar Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
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
      </footer>
    </div>;
};
export default Features;