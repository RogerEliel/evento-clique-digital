
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="responsive-container h-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-modern-petrol">Seu</span>
              <span className="text-modern-coral">Clique</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/features" className="text-modern-petrol hover:text-modern-coral transition-colors font-medium">
            Funcionalidades
          </Link>
          <Link to="/pricing" className="text-modern-petrol hover:text-modern-coral transition-colors font-medium">
            Preços
          </Link>
          <Link to="/photographer" className="text-modern-petrol hover:text-modern-coral transition-colors font-medium">
            Fotógrafos
          </Link>
          <Link to="/help" className="text-modern-petrol hover:text-modern-coral transition-colors font-medium">
            Ajuda
          </Link>
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline" className="border-modern-coral text-modern-coral hover:bg-modern-coral/5">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-modern-coral hover:bg-modern-coral/90 text-white">
                Cadastrar
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="pt-2 pb-4 px-4 space-y-3">
            <Link 
              to="/features" 
              className="block py-2 text-modern-petrol hover:text-modern-coral"
              onClick={() => setIsMenuOpen(false)}
            >
              Funcionalidades
            </Link>
            <Link 
              to="/pricing" 
              className="block py-2 text-modern-petrol hover:text-modern-coral"
              onClick={() => setIsMenuOpen(false)}
            >
              Preços
            </Link>
            <Link 
              to="/photographer" 
              className="block py-2 text-modern-petrol hover:text-modern-coral"
              onClick={() => setIsMenuOpen(false)}
            >
              Fotógrafos
            </Link>
            <Link 
              to="/help" 
              className="block py-2 text-modern-petrol hover:text-modern-coral"
              onClick={() => setIsMenuOpen(false)}
            >
              Ajuda
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-modern-coral text-modern-coral hover:bg-modern-coral/5">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-modern-coral hover:bg-modern-coral/90 text-white">
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
