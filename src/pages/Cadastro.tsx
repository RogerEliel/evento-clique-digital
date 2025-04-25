import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, User, Shield, Mail, Building, ArrowLeft, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RoleSelector } from "@/components/ui/role-selector";

const registerSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  empresa: z.string().optional(),
  role: z.enum(["client", "photographer"], {
    required_error: "Selecione um tipo de conta"
  }),
  consentimento_lgpd: z.boolean().refine(val => val === true, {
    message: "Você precisa aceitar os termos de uso e política de privacidade"
  })
});

type RegisterForm = z.infer<typeof registerSchema>;

const Cadastro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const navigate = useNavigate();
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      empresa: "",
      role: "client",
      consentimento_lgpd: false
    },
    mode: "onChange"
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);

      // Create auth user
      const { error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.senha,
        options: {
          data: {
            role: data.role
          }
        }
      });
      if (authError) throw authError;

      // Get client IP
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const { ip } = await ipResponse.json();

      // Register user role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{ 
          user_id: (await supabase.auth.getUser()).data.user?.id,
          role: data.role 
        }]);
      
      if (roleError) throw roleError;

      // Register photographer if applicable
      if (data.role === 'photographer') {
        const response = await supabase.functions.invoke("send-confirmation", {
          body: {
            nome: data.nome,
            email: data.email,
            empresa: data.empresa,
            consentimento_lgpd: data.consentimento_lgpd,
            ip_consentimento: ip
          }
        });
        
        if (response.error) throw response.error;
      }

      toast({
        title: "Cadastro realizado com sucesso!",
        description: data.role === 'photographer' 
          ? "Verifique seu email para confirmar sua conta."
          : "Você já pode fazer login na plataforma."
      });

      navigate("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextFormStep = async () => {
    const fieldsToValidate = formStep === 0 ? ['nome', 'email'] : ['senha', 'consentimento_lgpd'];
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) setFormStep(formStep + 1);
  };

  const prevFormStep = () => {
    setFormStep(formStep - 1);
  };

  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <motion.div className="w-full max-w-md" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-[#FF6B6B] mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para página inicial
        </Link>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Cadastro de Convidado</CardTitle>
            <CardDescription className="text-center">
              Crie sua conta no Seu Clique e comece a mostrar seu trabalho
            </CardDescription>
            
            <div className="flex justify-between mt-6 mb-2">
              <div className="flex-1 mr-2">
                <div className={`h-2 rounded-full ${formStep >= 0 ? 'bg-[#FF6B6B]' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex-1 ml-2">
                <div className={`h-2 rounded-full ${formStep >= 1 ? 'bg-[#FF6B6B]' : 'bg-gray-200'}`}></div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {formStep === 0 && <motion.div initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} exit={{
                opacity: 0,
                x: -20
              }} transition={{
                duration: 0.3
              }}>
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Nome completo <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input placeholder="Seu nome completo" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>
                            Email <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input type="email" placeholder="seu-email@exemplo.com" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="empresa"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>
                            Empresa (opcional)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input placeholder="Nome da sua empresa (se aplicável)" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>
                            Tipo de conta <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <RoleSelector
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="button" onClick={nextFormStep} className="w-full mt-6 bg-[#FF6B6B] hover:bg-[#FF6B6B]/90">
                      Próximo <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>}

                {formStep === 1 && <motion.div initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} exit={{
                opacity: 0,
                x: -20
              }} transition={{
                duration: 0.3
              }}>
                    <FormField
                      control={form.control}
                      name="senha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Senha <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input type="password" placeholder="********" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>
                            A senha deve ter pelo menos 8 caracteres
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consentimento_lgpd"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              <span className="text-red-500">*</span> Aceito os termos de uso e política de privacidade
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-2 mt-6">
                      <Button type="button" variant="outline" onClick={prevFormStep} className="flex-1">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                      </Button>
                      
                      <Button type="submit" className="flex-1 bg-[#FF6B6B] hover:bg-[#FF6B6B]/90" disabled={isLoading}>
                        {isLoading ? "Cadastrando..." : "Concluir cadastro"}
                      </Button>
                    </div>
                  </motion.div>}
              </form>
            </Form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Ou cadastre-se com
                </span>
              </div>
            </div>

            <Button variant="outline" type="button" className="w-full">
              <img src="/google-icon.svg" alt="Google" className="mr-2 h-4 w-4" />
              Google
            </Button>

            <div className="mt-4 flex justify-center items-center text-xs text-gray-500">
              <Shield className="h-3 w-3 mr-1" />
              <span>Seus dados estão protegidos</span>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-[#FF6B6B] hover:underline">
                Fazer login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>;
};

export default Cadastro;
