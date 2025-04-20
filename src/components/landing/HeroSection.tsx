
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, User } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#F7F9FB] to-white">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#FF6B6B]/30 filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-[#52E0A1]/20 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E2D3D] leading-tight">
              Reviva cada clique do seu evento
            </h1>
            <p className="mt-6 text-xl text-[#A0AEC0]">
              Uma nova forma de se ver nas memórias dos fotógrafos.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white px-8 py-6 text-lg flex items-center gap-2">
                <Link to="/cadastro">
                  <Camera className="w-5 h-5" />
                  <span>Sou Fotógrafo</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-[#1E2D3D] bg-transparent text-[#1E2D3D] hover:bg-[#1E2D3D] hover:text-white px-8 py-6 text-lg flex items-center gap-2">
                <Link to="/cadastro-convidado">
                  <User className="w-5 h-5" />
                  <span>Sou Convidado</span>
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute top-0 left-0 w-full h-full bg-[#1E2D3D] rounded-lg transform rotate-3 opacity-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1580061665738-e485eade6cf2?q=80&w=1000&auto=format&fit=crop" 
                    alt="Fotógrafo em ação" 
                    className="rounded-lg shadow-xl z-10 relative object-cover w-full h-full"
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-lg shadow-lg">
                <div className="bg-[#52E0A1]/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-[#1E2D3D]">Reconhecimento por IA</p>
                  <p className="text-xs text-[#A0AEC0] mt-1">Encontre fotos onde você aparece</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "99%", text: "Precisão no reconhecimento" },
            { number: "2k+", text: "Eventos realizados" },
            { number: "150+", text: "Fotógrafos parceiros" },
            { number: "50k+", text: "Clientes satisfeitos" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-[#1E2D3D]">{stat.number}</p>
              <p className="text-sm text-[#A0AEC0] mt-2">{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
