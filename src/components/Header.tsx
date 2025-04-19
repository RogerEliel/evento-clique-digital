
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="responsive-container h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-seuclique-darkslate">Seu<span className="text-seuclique-turquoise">Clique</span></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/features" className="text-seuclique-darkslate hover:text-seuclique-turquoise transition-colors">
            Funcionalidades
          </Link>
          <Link to="/pricing" className="text-seuclique-darkslate hover:text-seuclique-turquoise transition-colors">
            Preços
          </Link>
          <Link to="/help" className="text-seuclique-darkslate hover:text-seuclique-turquoise transition-colors">
            Ajuda
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-seuclique-turquoise text-seuclique-turquoise hover:bg-seuclique-turquoise hover:text-white">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-seuclique-turquoise text-white hover:bg-seuclique-turquoise/90">
              Cadastrar
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="pt-2 pb-4 px-4 space-y-3">
            <Link to="/features" className="block py-2 text-seuclique-darkslate hover:text-seuclique-turquoise">
              Funcionalidades
            </Link>
            <Link to="/pricing" className="block py-2 text-seuclique-darkslate hover:text-seuclique-turquoise">
              Preços
            </Link>
            <Link to="/help" className="block py-2 text-seuclique-darkslate hover:text-seuclique-turquoise">
              Ajuda
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login">
                <Button variant="outline" className="w-full border-seuclique-turquoise text-seuclique-turquoise hover:bg-seuclique-turquoise hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-seuclique-turquoise text-white hover:bg-seuclique-turquoise/90">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
