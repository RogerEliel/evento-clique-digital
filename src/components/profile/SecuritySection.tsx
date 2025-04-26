
import { MFASetup } from "@/components/auth/MFASetup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SecuritySection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardDescription>
            Configure as opções de segurança da sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MFASetup />
        </CardContent>
      </Card>
    </div>
  );
}
