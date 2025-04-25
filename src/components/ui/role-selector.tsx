
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="space-y-4"
    >
      <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
        <RadioGroupItem value="client" id="client" />
        <div className="flex flex-col">
          <Label htmlFor="client" className="font-medium">Cliente</Label>
          <p className="text-sm text-gray-500">Encontre fotógrafos e visualize suas fotos.</p>
        </div>
      </div>

      <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
        <RadioGroupItem value="photographer" id="photographer" />
        <div className="flex flex-col">
          <Label htmlFor="photographer" className="font-medium">Fotógrafo</Label>
          <p className="text-sm text-gray-500">Gerencie seus serviços, fotos e vendas.</p>
        </div>
      </div>
    </RadioGroup>
  );
}
