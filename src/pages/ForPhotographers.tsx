
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Camera, Image, UserRound, BarChart, CreditCard } from "lucide-react";

const ForPhotographers = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-100 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Seu Clique: A plataforma completa para fotógrafos profissionais
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Gerencie seus eventos, armazene fotos com categorização inteligente e venda suas obras diretamente aos clientes, tudo em um só lugar.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button size="lg" className="text-lg px-8 py-6">
                Crie seu perfil gratuito
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher o Seu Clique?</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-4">
              <div className="mt-1 bg-purple-100 p-3 rounded-full h-12 w-12 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Gestão completa de eventos e clientes</h3>
                <p className="text-gray-600">
                  Organize todos os seus eventos e gerencia seus clientes em uma interface intuitiva. 
                  Mantenha tudo organizado e acompanhe o status de cada projeto.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 bg-blue-100 p-3 rounded-full h-12 w-12 flex items-center justify-center">
                <Image className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Armazenamento com categorização por IA</h3>
                <p className="text-gray-600">
                  Nossa tecnologia de inteligência artificial categoriza automaticamente suas fotos por rostos, 
                  facilitando a organização e economizando horas do seu tempo.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 bg-green-100 p-3 rounded-full h-12 w-12 flex items-center justify-center">
                <UserRound className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Divulgação em plataforma especializada</h3>
                <p className="text-gray-600">
                  Apareça para clientes que já estão buscando serviços de fotografia. 
                  Aumente sua visibilidade e conquiste novos clientes sem esforço adicional.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 bg-amber-100 p-3 rounded-full h-12 w-12 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Venda direta de fotos pelo site</h3>
                <p className="text-gray-600">
                  Disponibilize suas fotos para venda diretamente pelo site, com processamento de pagamentos 
                  integrado e entrega digital automática. Aumente sua receita sem complicações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Como funciona</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Crie seu perfil</h3>
              <p className="text-gray-600">
                Cadastre-se gratuitamente e complete seu perfil com sua especialidade, portfólio 
                e informações de contato.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gerencie seus eventos</h3>
              <p className="text-gray-600">
                Crie eventos, faça upload das fotos e organize automaticamente por pessoa com nossa IA.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Venda suas fotos</h3>
              <p className="text-gray-600">
                Compartilhe galerias com seus clientes e receba pagamentos diretamente pela plataforma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">O que nossos fotógrafos dizem</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" 
                    alt="Mariana Fotografia"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Mariana Lopes</h4>
                  <p className="text-sm text-gray-500">Fotógrafa de Eventos</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "A categorização automática de fotos por IA economizou horas do meu trabalho. 
                Agora consigo entregar as galerias para meus clientes muito mais rápido."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6" 
                    alt="Ricardo Fotografia"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Ricardo Mendes</h4>
                  <p className="text-sm text-gray-500">Fotógrafo de Casamentos</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Desde que comecei a usar o Seu Clique, minhas vendas de fotos aumentaram em 40%. 
                A plataforma facilita para os clientes escolherem e comprarem as fotos."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
                    alt="Paulo Fotografia"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Paulo Santos</h4>
                  <p className="text-sm text-gray-500">Fotógrafo Corporativo</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "A gestão de eventos e clientes é incrivelmente simples. A interface é intuitiva e 
                me ajuda a manter tudo organizado sem precisar de planilhas extras."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Planos acessíveis para todos os fotógrafos</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio e comece a aproveitar todos os benefícios do Seu Clique
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold mb-2">Básico</h3>
              <p className="text-gray-500 mb-4">Para fotógrafos iniciantes</p>
              <div className="text-3xl font-bold mb-4">Grátis</div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Até 3 eventos</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>100 fotos por evento</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Categorização básica de fotos</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Perfil básico</span>
                </li>
              </ul>
              <Button className="w-full">Começar Grátis</Button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 border-2 border-purple-500 relative">
              <div className="absolute top-0 right-0 bg-purple-500 text-white py-1 px-4 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                Mais Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Profissional</h3>
              <p className="text-gray-500 mb-4">Para fotógrafos em crescimento</p>
              <div className="text-3xl font-bold mb-4">R$49<span className="text-base font-normal text-gray-500">/mês</span></div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Eventos ilimitados</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>500 fotos por evento</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Categorização avançada com IA</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Perfil destacado nas buscas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Taxa reduzida nas vendas (10%)</span>
                </li>
              </ul>
              <Button className="w-full">Assinar Agora</Button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-gray-500 mb-4">Para fotógrafos estabelecidos</p>
              <div className="text-3xl font-bold mb-4">R$99<span className="text-base font-normal text-gray-500">/mês</span></div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Tudo do plano Profissional</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Fotos ilimitadas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Área de cliente personalizada</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Menor taxa nas vendas (5%)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              <Button className="w-full">Assinar Premium</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para transformar seu negócio de fotografia?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de fotógrafos que estão simplificando seu trabalho e aumentando suas vendas com o Seu Clique.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-gray-100 border-white">
            Quero fazer parte
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ForPhotographers;
