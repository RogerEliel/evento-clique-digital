import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [showMFA, setShowMFA] = useState(false);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      toast({
        title: "Erro ao entrar com Google",
        description: "Não foi possível fazer login com o Google. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoadingGoogle(false);
    }
  };

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
          setLoading(false);
          return;
        }

        if (error?.message.includes("mfa") || (data?.session === null && data?.user !== null)) {
          const { data: mfaData, error: mfaError } = await supabase.auth.mfa.challenge({
            factorId: data?.user?.factors?.[0].id || '',
          });

          if (mfaError) throw mfaError;
          
          setFactorId(mfaData?.id || null);
          setChallengeId(mfaData?.id || null);
          setShowMFA(true);
          setLoading(false);
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
      if (!factorId || !challengeId) {
        throw new Error("Dados de verificação inválidos. Por favor, tente novamente.");
      }

      const { data, error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: mfaCode,
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <div className="flex items-center">
              <span className="mr-2">Verificando</span>
              <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
            </div>
          ) : (
            "Verificar"
          )}
        </Button>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <Button 
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 py-5 text-gray-700 hover:text-gray-900"
        disabled={loadingGoogle}
        onClick={handleGoogleLogin}
      >
        {loadingGoogle ? (
          <div className="flex items-center gap-2">
            <span>Conectando...</span>
            <div className="animate-spin h-4 w-4 border-2 border-primary rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <>
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Entrar com Google
          </>
        )}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            ou continue com email
          </span>
        </div>
      </div>

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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-2">
              <span>{type === "login" ? "Entrando" : "Cadastrando"}</span>
              <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
            </div>
          ) : (
            type === "login" ? "Entrar" : "Cadastrar"
          )}
        </Button>
      </form>
    </div>
  );
}
