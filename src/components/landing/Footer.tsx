
import { Link } from "react-router-dom";
import { Camera, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1E2D3D] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Camera className="w-6 h-6" />
              <span className="font-semibold text-xl">Seu Clique</span>
            </div>
            <p className="text-[#A0AEC0] mb-6">
              Plataforma inovadora que conecta fotógrafos e clientes de forma inteligente e segura.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B6B] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B6B] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B6B] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Links Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-[#A0AEC0] hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="#como-funciona" className="text-[#A0AEC0] hover:text-white transition-colors">Como Funciona</Link>
              </li>
              <li>
                <Link to="#galeria" className="text-[#A0AEC0] hover:text-white transition-colors">Galeria</Link>
              </li>
              <li>
                <Link to="/cadastro" className="text-[#A0AEC0] hover:text-white transition-colors">Cadastrar</Link>
              </li>
              <li>
                <Link to="/login" className="text-[#A0AEC0] hover:text-white transition-colors">Entrar</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/termos" className="text-[#A0AEC0] hover:text-white transition-colors">Termos de Uso</Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-[#A0AEC0] hover:text-white transition-colors">Política de Privacidade</Link>
              </li>
              <li>
                <Link to="/lgpd" className="text-[#A0AEC0] hover:text-white transition-colors">LGPD</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-[#A0AEC0] hover:text-white transition-colors">Política de Cookies</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FF6B6B]" />
                <span className="text-[#A0AEC0]">contato@seuclique.com.br</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#FF6B6B]" />
                <span className="text-[#A0AEC0]">(11) 99999-8888</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#FF6B6B]" />
                <span className="text-[#A0AEC0]">São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-[#A0AEC0] text-sm">
          <p>© {new Date().getFullYear()} Seu Clique. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
