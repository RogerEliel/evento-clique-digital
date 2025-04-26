
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function MFASetup() {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [totpSecret, setTotpSecret] = useState<{ qr: string; secret: string } | null>(null);
  const [loadingTotp, setLoadingTotp] = useState(false);
  const [loadingSMS, setLoadingSMS] = useState(false);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [challengeId, setChallengeId] = useState<string | null>(null);

  const setupTOTP = async () => {
    try {
      setLoadingTotp(true);
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp'
      });

      if (error) throw error;
      if (data && 'totp' in data) {
        setTotpSecret({
          qr: data.totp.qr_code,
          secret: data.totp.secret
        });
        setFactorId(data.id);
      }
    } catch (error) {
      toast({
        title: "Erro na configuração do TOTP",
        description: "Não foi possível configurar o autenticador.",
        variant: "destructive"
      });
    } finally {
      setLoadingTotp(false);
    }
  };

  const verifyTOTP = async () => {
    try {
      setLoadingTotp(true);
      
      if (!factorId) {
        throw new Error("Fator de autenticação não encontrado");
      }

      // First challenge the factor
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId
      });

      if (challengeError) throw challengeError;
      
      // Corrected to use challengeData.id instead of challengeData.challenge_id
      setChallengeId(challengeData?.id || null);
      
      // Then verify with the code
      const { error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData?.id || '',
        code: verificationCode
      });

      if (error) throw error;

      toast({
        title: "Autenticador configurado",
        description: "O autenticador foi configurado com sucesso.",
      });
      setTotpSecret(null);
      setVerificationCode('');
      setFactorId(null);
    } catch (error) {
      toast({
        title: "Erro na verificação",
        description: "Código inválido. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoadingTotp(false);
    }
  };

  const setupSMS = async () => {
    try {
      setLoadingSMS(true);
      // Corrected: Phone factor type in Supabase is 'phone', and parameter is 'phone'
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'phone',
        phone: phoneNumber // Corrected from phoneNumber to phone
      });

      if (error) throw error;
      
      // Access data.id only after checking the type safety
      if (data) {
        setFactorId(data.id || null);
      }
      
      toast({
        title: "Código SMS enviado",
        description: "Digite o código recebido por SMS para confirmar.",
      });
    } catch (error) {
      toast({
        title: "Erro no envio do SMS",
        description: "Não foi possível enviar o código SMS.",
        variant: "destructive"
      });
    } finally {
      setLoadingSMS(false);
    }
  };

  const verifySMS = async () => {
    try {
      setLoadingSMS(true);
      
      if (!factorId) {
        throw new Error("Fator de autenticação não encontrado");
      }

      // First challenge the factor
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId
      });

      if (challengeError) throw challengeError;
      
      // Corrected to use challengeData.id instead of challengeData.challenge_id
      setChallengeId(challengeData?.id || null);
      
      // Then verify with the code
      const { error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData?.id || '',
        code: verificationCode
      });

      if (error) throw error;

      toast({
        title: "SMS configurado",
        description: "A verificação por SMS foi configurada com sucesso.",
      });
      setPhoneNumber('');
      setVerificationCode('');
      setFactorId(null);
    } catch (error) {
      toast({
        title: "Erro na verificação",
        description: "Código inválido. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoadingSMS(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Configurar Autenticação de Dois Fatores</CardTitle>
        <CardDescription>
          Adicione uma camada extra de segurança à sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="authenticator">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="authenticator" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Aplicativo Autenticador
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex items-center gap-2">
              <KeyRound className="h-4 w-4" />
              SMS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="authenticator" className="space-y-4">
            {!totpSecret ? (
              <Button onClick={setupTOTP} disabled={loadingTotp}>
                {loadingTotp ? (
                  <div className="flex items-center">
                    <span className="mr-2">Configurando...</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                  </div>
                ) : (
                  "Configurar Autenticador"
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-4">
                  <img src={totpSecret.qr} alt="QR Code" className="w-48 h-48" />
                  <p className="text-sm text-muted-foreground">
                    Código secreto: {totpSecret.secret}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totp-code">Código de Verificação</Label>
                  <Input
                    id="totp-code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Digite o código do autenticador"
                  />
                </div>
                <Button onClick={verifyTOTP} disabled={loadingTotp}>
                  {loadingTotp ? (
                    <div className="flex items-center">
                      <span className="mr-2">Verificando...</span>
                      <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                    </div>
                  ) : (
                    "Verificar"
                  )}
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sms" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Número de Telefone</Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+55 (11) 99999-9999"
              />
            </div>
            <Button onClick={setupSMS} disabled={loadingSMS}>
              {loadingSMS ? (
                <div className="flex items-center">
                  <span className="mr-2">Enviando código...</span>
                  <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                </div>
              ) : (
                "Enviar Código"
              )}
            </Button>

            {phoneNumber && factorId && (
              <div className="space-y-2">
                <Label htmlFor="sms-code">Código de Verificação</Label>
                <Input
                  id="sms-code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Digite o código recebido por SMS"
                />
                <Button onClick={verifySMS} disabled={loadingSMS}>
                  {loadingSMS ? (
                    <div className="flex items-center">
                      <span className="mr-2">Verificando...</span>
                      <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                    </div>
                  ) : (
                    "Verificar"
                  )}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
