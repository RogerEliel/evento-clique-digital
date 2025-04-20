
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, User, CheckCircle, Upload, Star } from "lucide-react";
import { motion } from "framer-motion"; // Ensure correct import
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Gallery from "@/components/landing/Gallery";
import Footer from "@/components/landing/Footer";

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
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-[#1E2D3D]" />
            <span className="font-semibold text-xl text-[#1E2D3D]">Seu Clique</span>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/" className="text-[#1E2D3D] hover:text-[#FF6B6B] transition-colors">Home</Link>
            <Link to="#como-funciona" className="text-[#1E2D3D] hover:text-[#FF6B6B] transition-colors">Como Funciona</Link>
            <Link to="#galeria" className="text-[#1E2D3D] hover:text-[#FF6B6B] transition-colors">Galeria</Link>
            <Button asChild variant="outline" className="bg-transparent border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white">
              <Link to="/cadastro">Cadastrar</Link>
            </Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </Button>
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
