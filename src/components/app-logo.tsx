import { Compass } from 'lucide-react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2 text-primary">
      <Compass className="h-8 w-8" />
      <span className="font-headline text-2xl font-bold">VeniTrack</span>
    </div>
  );
}
