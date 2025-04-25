
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, User, CheckCircle, Upload, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-[#1E2D3D] mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Capture momentos únicos com o fotógrafo ideal
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Conecte-se com fotógrafos talentosos e transforme seus eventos em 
              memórias inesquecíveis que durarão para sempre.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Button size="lg" className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white" asChild>
                <Link to="/buscar-fotografos">
                  Encontrar fotógrafos <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-[#1E2D3D] border-[#1E2D3D] hover:bg-gray-100" asChild>
                <Link to="/para-fotografos">
                  Seja um fotógrafo <Camera className="ml-2" />
                </Link>
              </Button>
            </motion.div>
            <motion.div 
              className="mt-8 flex items-center gap-2 text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Mais de 500 fotógrafos disponíveis</span>
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
            <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5 avaliações</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
