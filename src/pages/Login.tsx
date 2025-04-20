
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic will be implemented later
    console.log("Login attempt with:", { email, password });
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-[#1E2D3D]" />
              <span className="font-semibold text-xl text-[#1E2D3D]">Seu Clique</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-[#1E2D3D] text-center mb-6">Entrar na sua conta</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#A0AEC0]/30 focus-visible:ring-[#FF6B6B]"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link to="/esqueci-senha" className="text-sm text-[#FF6B6B] hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#A0AEC0]/30 focus-visible:ring-[#FF6B6B]"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white"
            >
              Entrar
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#A0AEC0]/20 text-center">
            <p className="text-[#A0AEC0]">
              Ainda não tem uma conta?{" "}
              <Link to="/cadastro" className="text-[#FF6B6B] hover:underline inline-flex items-center">
                <span>Cadastre-se</span>
                <ArrowRight className="ml-1 w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
