// src/pages/auth/Login.tsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, ArrowLeft, Shield } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.senha,
      });

      if (authError) throw authError;

      // 🔐 Mock para futura verificação de perfil
      localStorage.setItem("userType", "photographer");

      toast({
        title: "Login realizado com sucesso!",
        description: "Você será redirecionado para o painel.",
      });

      const userType = "photographer"; // ou "client"
      navigate(`/dashboard/${userType}`);

    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Verifique suas credenciais.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-[#FF6B6B] mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para a página inicial
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Entrar na sua conta</CardTitle>
            <CardDescription className="text-center">
              Acesse sua conta como cliente ou fotógrafo
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="••••••••" 
                            type={showPassword ? "text" : "password"} 
                            {...field} 
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end text-sm">
                  <Link to="/esqueci-senha" className="text-[#FF6B6B] hover:underline">
                    Esqueci minha senha
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90" disabled={isLoading}>
                  {isLoading ? "Entrando..." : (
                    <span className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" /> Entrar
                    </span>
                  )}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      Ou entre com
                    </span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" type="button">
                  <img src="/google-icon.svg" alt="Google" className="h-4 w-4 mr-2" />
                  Google
                </Button>

                <div className="mt-4 flex justify-center items-center text-xs text-gray-500">
                  <Shield className="h-3 w-3 mr-1" />
                  <span>Conexão segura via SSL</span>
                </div>
              </CardContent>

              <CardFooter className="flex-col">
                <p className="text-center text-sm">
                  Ainda não tem uma conta?{" "}
                  <Link to="/cadastro" className="text-[#FF6B6B] hover:underline">
                    Cadastre-se
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}
