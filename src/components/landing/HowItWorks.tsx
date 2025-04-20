import React from 'react';
import { motion } from "framer-motion";
import { Rocket, Code, ShieldCheck, LayoutDashboard } from 'lucide-react';

const HowItWorks = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section id="como-funciona" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-[#1E2D3D] mb-4">Como Funciona</h2>
          <p className="text-gray-600">
            Descubra como nossa plataforma simplifica a conexão entre você e os melhores fotógrafos.
          </p>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
        >
          <motion.li className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" variants={item}>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#FF6B6B] text-white mb-4">
              <Rocket className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-[#1E2D3D] mb-2">Crie sua conta</h3>
            <p className="text-gray-600">
              Comece criando sua conta de forma rápida e fácil.
            </p>
          </motion.li>

          <motion.li className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" variants={item}>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#FF6B6B] text-white mb-4">
              <Code className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-[#1E2D3D] mb-2">Explore os perfis</h3>
            <p className="text-gray-600">
              Navegue por uma variedade de perfis de fotógrafos talentosos.
            </p>
          </motion.li>

          <motion.li className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" variants={item}>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#FF6B6B] text-white mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-[#1E2D3D] mb-2">Conecte-se</h3>
            <p className="text-gray-600">
              Entre em contato diretamente com os fotógrafos que mais te interessam.
            </p>
          </motion.li>

          <motion.li className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" variants={item}>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#FF6B6B] text-white mb-4">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-[#1E2D3D] mb-2">Agende sua sessão</h3>
            <p className="text-gray-600">
              Agende sessões de fotos incríveis com facilidade e segurança.
            </p>
          </motion.li>
        </motion.ul>
      </div>
    </section>
  );
};

export default HowItWorks;
