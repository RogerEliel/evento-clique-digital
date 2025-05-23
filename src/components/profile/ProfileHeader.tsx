
import React from 'react';

interface ProfileHeaderProps {
  title: string;
  description: string;
}

export function ProfileHeader({ title, description }: ProfileHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
