
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Você deve concordar com os termos';
    }
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      navigate('/onboarding');
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col bg-seuclique-lightcloud">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-seuclique-darkslate">Cadastre-se no SeuClique</h1>
            <p className="mt-2 text-seuclique-silver">
              Crie sua conta para começar a gerenciar seus eventos
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input 
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'border-seuclique-coral' : ''}
                />
                {errors.name && <p className="mt-1 text-sm text-seuclique-coral">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'border-seuclique-coral' : ''}
                />
                {errors.email && <p className="mt-1 text-sm text-seuclique-coral">{errors.email}</p>}
              </div>
              
              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'border-seuclique-coral pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-seuclique-silver hover:text-seuclique-darkslate"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-seuclique-coral">{errors.password}</p>}
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'border-seuclique-coral' : ''}
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-seuclique-coral">{errors.confirmPassword}</p>}
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox 
                    id="agreeTerms" 
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => {
                      setFormData({
                        ...formData,
                        agreeTerms: checked === true,
                      });
                      if (errors.agreeTerms) {
                        setErrors({
                          ...errors,
                          agreeTerms: '',
                        });
                      }
                    }}
                    className={errors.agreeTerms ? 'border-seuclique-coral' : ''}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeTerms" className="text-seuclique-silver cursor-pointer">
                    Li e concordo com os {' '}
                    <Link to="/terms" className="text-seuclique-turquoise hover:underline">
                      Termos de Uso
                    </Link>
                    {' '}e a{' '}
                    <Link to="/privacy" className="text-seuclique-turquoise hover:underline">
                      Política de Privacidade
                    </Link>
                  </label>
                  {errors.agreeTerms && <p className="mt-1 text-sm text-seuclique-coral">{errors.agreeTerms}</p>}
                </div>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-seuclique-turquoise hover:bg-seuclique-turquoise/90 text-white py-6"
              disabled={submitting}
            >
              {submitting ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
            
            <p className="text-center text-sm text-seuclique-silver">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-seuclique-turquoise hover:underline">
                Faça login
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
