
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Lock, User, Shield, ArrowLeft, LogIn } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
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
  
      // 🔐 Define o tipo de usuário no localStorage (ex: "photographer" ou "client")
      // Essa parte deve ser substituída futuramente por uma verificação real no Supabase
      localStorage.setItem("userType", "photographer");
  
      toast({
        title: "Login realizado com sucesso!",
        description: "Você será redirecionado para o painel.",
      });
  
      // 🔁 Redireciona para o index do dashboard (que agora decide o destino final)
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: error.message,
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
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-[#FF6B6B] mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para página inicial
        </Link>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Entre na sua conta para acessar o painel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            type="email" 
                            placeholder="seu-email@exemplo.com" 
                            className="pl-10" 
                            {...field} 
                          />
                        </div>
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
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            type="password" 
                            placeholder="********" 
                            className="pl-10" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Link to="/esqueci-senha" className="text-sm text-[#FF6B6B] hover:underline">
                    Esqueci minha senha
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90" 
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" /> Entrar
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Ou continue com
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" type="button" className="w-full">
                <img src="/google-icon.svg" alt="Google" className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>

            <div className="mt-4 flex justify-center items-center text-xs text-gray-500">
              <Shield className="h-3 w-3 mr-1" />
              <span>Conexão segura via SSL</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link to="/cadastro" className="text-[#FF6B6B] hover:underline">
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
