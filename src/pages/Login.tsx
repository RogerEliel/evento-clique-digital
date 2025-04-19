
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
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
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
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
      navigate('/dashboard');
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
            <h1 className="text-2xl font-bold text-seuclique-darkslate">Entrar no SeuClique</h1>
            <p className="mt-2 text-seuclique-silver">
              Acesse sua conta
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="/forgot-password" className="text-sm text-seuclique-turquoise hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
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
              
              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <Checkbox 
                    id="rememberMe" 
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => {
                      setFormData({
                        ...formData,
                        rememberMe: checked === true,
                      });
                    }}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="rememberMe" className="text-seuclique-silver cursor-pointer">
                    Lembrar de mim
                  </label>
                </div>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-white text-gray-950 border border-gray-200 hover:bg-gray-100 py-6"
              disabled={submitting}
            >
              {submitting ? 'Entrando...' : 'Entrar'}
            </Button>
            
            <p className="text-center text-sm text-seuclique-silver">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-seuclique-turquoise hover:underline">
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
