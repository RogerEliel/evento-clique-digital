
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [showMFA, setShowMFA] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error?.message.includes("leaked password")) {
          toast({
            title: "Senha vulnerável",
            description: "Esta senha foi encontrada em vazamentos de dados. Por favor, escolha outra senha.",
            variant: "destructive",
          });
          return;
        }

        if (error?.message.includes("mfa-required")) {
          setShowMFA(true);
          return;
        }

        if (error) throw error;

        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error?.message.includes("leaked password")) {
          toast({
            title: "Senha vulnerável",
            description: "Esta senha foi encontrada em vazamentos de dados. Por favor, escolha outra senha.",
            variant: "destructive",
          });
          return;
        }

        if (error) throw error;

        toast({
          title: "Conta criada",
          description: "Verifique seu email para confirmar o cadastro.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro na autenticação",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMFASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: mfaCode,
        type: "totp"
      });

      if (error) throw error;

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erro na verificação",
        description: "Código inválido. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showMFA) {
    return (
      <form onSubmit={handleMFASubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mfa-code">Código de Verificação</Label>
          <Input
            id="mfa-code"
            type="text"
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
            placeholder="Digite o código de verificação"
            required
          />
        </div>
        <Button type="submit" className="w-full" loading={loading}>
          Verificar
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          required
        />
      </div>
      <Button type="submit" className="w-full" loading={loading}>
        {type === "login" ? "Entrar" : "Cadastrar"}
      </Button>
    </form>
  );
}
