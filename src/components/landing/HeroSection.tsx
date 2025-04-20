import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, User, CheckCircle, Upload, Star } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-[#1E2D3D] mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Encontre o fotógrafo perfeito para o seu momento
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Conecte-se com talentosos fotógrafos e transforme seus momentos em
              memórias inesquecíveis.
            </motion.p>
            <motion.div
              className="space-x-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Button className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white">
                Encontrar um fotógrafo <ArrowRight className="ml-2" />
              </Button>
              <Button variant="outline" className="text-[#1E2D3D] hover:bg-gray-100">
                Seja um fotógrafo
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img
              src="/hero-image.webp"
              alt="Fotógrafo profissional"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
