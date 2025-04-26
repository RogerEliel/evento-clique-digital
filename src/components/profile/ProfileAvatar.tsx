
import { Upload } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ProfileAvatarProps {
  avatarUrl?: string | null;
  name?: string | null;
}

export function ProfileAvatar({ avatarUrl, name }: ProfileAvatarProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl || ''} />
        <AvatarFallback className="text-2xl">{name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <Upload className="h-4 w-4" /> Alterar foto
      </Button>
      <p className="text-xs text-muted-foreground">
        Esta foto é usada para reconhecimento facial
      </p>
    </div>
  );
}
