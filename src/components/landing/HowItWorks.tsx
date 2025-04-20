
import { motion } from "framer-motion";
import { User, Camera, Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const photographerSteps = [
    {
      icon: <User className="w-6 h-6 text-white" />,
      title: "Crie sua conta",
      description: "Faça seu cadastro completo como fotógrafo profissional."
    },
    {
      icon: <Upload className="w-6 h-6 text-white" />,
      title: "Faça o upload das fotos",
      description: "Envie as fotos do evento para nossa plataforma segura."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      title: "A IA faz a mágica",
      description: "Nossa inteligência artificial reconhece rostos automaticamente."
    },
    {
      icon: <Camera className="w-6 h-6 text-white" />,
      title: "Compartilhe com segurança",
      description: "Seus clientes acessam suas memórias com privacidade."
    }
  ];

  const guestSteps = [
    {
      icon: <User className="w-6 h-6 text-white" />,
      title: "Cadastre-se",
      description: "Crie sua conta e envie uma foto sua para referência."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      title: "Acesse seu evento",
      description: "Encontre o evento que participou através do código."
    },
    {
      icon: <Camera className="w-6 h-6 text-white" />,
      title: "Veja suas fotos",
      description: "Visualize e compre as fotos onde você aparece."
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-[#1E2D3D]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Como funciona
          </motion.h2>
          <motion.p 
            className="mt-4 text-[#A0AEC0] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Uma plataforma completa que conecta fotógrafos e seus clientes de forma inteligente e segura
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <motion.div 
              className="mb-8 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Camera className="w-6 h-6 text-[#FF6B6B]" />
              <h3 className="text-2xl font-bold text-[#1E2D3D]">Para Fotógrafos</h3>
            </motion.div>

            <div className="space-y-10">
              {photographerSteps.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-[#1E2D3D] flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#1E2D3D]">{step.title}</h4>
                    <p className="mt-1 text-[#A0AEC0]">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white">
                <Link to="/cadastro">Começar como Fotógrafo</Link>
              </Button>
            </motion.div>
          </div>

          <div>
            <motion.div 
              className="mb-8 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <User className="w-6 h-6 text-[#52E0A1]" />
              <h3 className="text-2xl font-bold text-[#1E2D3D]">Para Convidados</h3>
            </motion.div>

            <div className="space-y-10">
              {guestSteps.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-[#52E0A1] flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[#1E2D3D]">{step.title}</h4>
                    <p className="mt-1 text-[#A0AEC0]">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild variant="outline" className="border-[#52E0A1] text-[#52E0A1] hover:bg-[#52E0A1] hover:text-white">
                <Link to="/cadastro-convidado">Encontrar minhas fotos</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
