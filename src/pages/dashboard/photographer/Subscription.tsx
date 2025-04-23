
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/format";

interface Subscription {
  id: string;
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
  current_period_end: string;
  price_id: string;
  stripe_subscription_id: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  priceId: string;
}

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Parse URL query parameters to check for Stripe checkout result
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('success');
  const canceled = queryParams.get('canceled');
  const sessionId = queryParams.get('session_id');

  // Define available subscription plans
  const plans: Plan[] = [
    { 
      id: "basic", 
      name: "Básico", 
      price: 4990, 
      features: [
        "Até 3 eventos ativos",
        "100 fotos por evento",
        "Suporte por email"
      ],
      priceId: "price_basic" // Replace with actual Stripe Price ID
    },
    { 
      id: "pro", 
      name: "Profissional", 
      price: 9990, 
      features: [
        "Eventos ilimitados",
        "500 fotos por evento",
        "Análise de vendas",
        "Suporte prioritário"
      ],
      priceId: "price_pro" // Replace with actual Stripe Price ID
    },
    { 
      id: "premium", 
      name: "Premium", 
      price: 19990, 
      features: [
        "Eventos ilimitados",
        "Fotos ilimitadas",
        "Análise avançada de vendas",
        "Suporte VIP 24/7",
        "Ferramentas de marketing"
      ],
      priceId: "price_premium" // Replace with actual Stripe Price ID
    }
  ];

  // Fetch the current subscription using our edge function
  const { data: subscriptionData, isLoading: isLoadingSubscription, refetch } = useQuery({
    queryKey: ["photographer-subscription"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return { hasSubscription: false, subscription: null };
      }
      
      const { data, error } = await supabase.functions.invoke('check-subscription-status');
      
      if (error) throw error;
      return data;
    },
  });

  // Show toast messages based on Stripe checkout result
  useEffect(() => {
    if (success && sessionId) {
      toast({
        title: "Assinatura realizada com sucesso!",
        description: "Sua assinatura está sendo processada.",
      });
      
      // Remove query params from URL
      navigate('/dashboard/photographer/subscription', { replace: true });
      
      // Refetch subscription data
      refetch();
    } else if (canceled) {
      toast({
        title: "Assinatura cancelada",
        description: "Você cancelou o processo de assinatura.",
        variant: "destructive",
      });
      
      // Remove query params from URL
      navigate('/dashboard/photographer/subscription', { replace: true });
    }
  }, [success, canceled, sessionId, navigate, toast, refetch]);

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }
      
      const { data, error } = await supabase.functions.invoke('create-subscription-session', {
        body: { price_id: priceId },
      });
      
      if (error) throw error;
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Failed to create subscription:", error);
      toast({
        title: "Erro ao processar assinatura",
        description: "Não foi possível iniciar o processo de assinatura. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    // This would typically redirect to a Stripe Customer Portal
    // But for now, we can just create a placeholder
    toast({
      title: "Gerenciar Assinatura",
      description: "Esta funcionalidade será implementada em breve.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" /> Ativo</Badge>;
      case 'trialing':
        return <Badge className="bg-blue-500"><Clock className="w-3 h-3 mr-1" /> Em trial</Badge>;
      case 'past_due':
      case 'incomplete':
        return <Badge className="bg-yellow-500"><AlertCircle className="w-3 h-3 mr-1" /> Pendente</Badge>;
      case 'canceled':
      case 'incomplete_expired':
      case 'unpaid':
      default:
        return <Badge className="bg-gray-500"><AlertCircle className="w-3 h-3 mr-1" /> Inativo</Badge>;
    }
  };

  const getCurrentPlan = () => {
    if (!subscriptionData?.hasSubscription || !subscriptionData?.subscription?.price_id) return null;
    return plans.find(plan => plan.priceId === subscriptionData.subscription.price_id);
  };

  const currentPlan = getCurrentPlan();
  const subscription = subscriptionData?.subscription;

  if (isLoadingSubscription) {
    return (
      <div className="space-y-5 p-6">
        <Skeleton className="h-8 w-[200px]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Minha Assinatura</h1>
        <p className="text-muted-foreground">
          Escolha o plano ideal para o seu negócio e comece a vender suas fotos
        </p>
      </div>

      {subscriptionData?.hasSubscription && subscription?.status === 'active' && (
        <div className="bg-muted p-4 rounded-lg mb-8 border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{currentPlan?.name || 'Plano Atual'}</h2>
              <div className="flex items-center mt-1">
                {getStatusBadge(subscription.status)}
                <span className="ml-2 text-sm text-muted-foreground">
                  Renova em {new Date(subscription.current_period_end).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
            <Button variant="outline" onClick={handleManageSubscription}>
              Gerenciar Assinatura
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isCurrentPlan = subscriptionData?.hasSubscription && 
            subscription?.price_id === plan.priceId;
          
          return (
            <Card key={plan.id} className={`${isCurrentPlan ? 'border-primary' : ''}`}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">{formatCurrency(plan.price)}</span>
                  <span className="text-muted-foreground">/mês</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isCurrentPlan ? (
                  <Button className="w-full" variant="outline" disabled>
                    Plano Atual
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleSubscribe(plan.priceId)}
                    disabled={loading}
                  >
                    {loading ? 'Processando...' : 'Assinar'}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
