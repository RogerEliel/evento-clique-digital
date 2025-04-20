
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, User, CheckCircle, Upload, Star, Menu } from "lucide-react";
import { motion } from "framer-motion";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Gallery from "@/components/landing/Gallery";
import Footer from "@/components/landing/Footer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FB]">
      <header className={`sticky top-0 z-50 backdrop-blur-lg border-b border-gray-100 transition-all duration-300 ${scrollY > 50 ? 'py-2 bg-white/95 shadow-sm' : 'py-3 bg-white/80'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-[#FF6B6B]" />
            <span className="font-semibold text-xl text-[#1E2D3D]">Seu Clique</span>
          </div>
          
          <nav className="hidden md:flex gap-6 items-center">
            <Link 
              to="/" 
              className="text-[#1E2D3D] hover:text-[#FF6B6B] transition-colors font-medium"
            >
              Home
            </Link>
            <a 
              href="#como-funciona" 
              className="text-[#1E2D3D] hover:text-[#FF6B6B] transition-colors"
            >
              Como Funciona
            </a>
            <a 
              href="#galeria" 
              className="text-[#1E2D3D] hover:text-[#FF6B6B] transition-colors"
            >
              Galeria
            </a>
            <Button asChild variant="outline" className="bg-transparent border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white">
              <Link to="/cadastro">Cadastrar</Link>
            </Button>
          </nav>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8">
                <Link 
                  to="/" 
                  className="text-[#1E2D3D] hover:text-[#FF6B6B] transition-colors text-lg font-medium"
                >
                  Home
                </Link>
                <a 
                  href="#como-funciona" 
                  className="text-[#1E2D3D] hover:text-[#FF6B6B] transition-colors text-lg"
                >
                  Como Funciona
                </a>
                <a 
                  href="#galeria" 
                  className="text-[#1E2D3D] hover:text-[#FF6B6B] transition-colors text-lg"
                >
                  Galeria
                </a>
                <div className="flex flex-col gap-2 mt-4">
                  <Button asChild variant="outline" className="w-full bg-transparent border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white">
                    <Link to="/login">Entrar</Link>
                  </Button>
                  <Button asChild className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white">
                    <Link to="/cadastro">Cadastrar</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <Gallery />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
