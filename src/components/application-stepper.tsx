'use client';

import { Check, Circle, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ApplicationStage } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

interface ApplicationStepperProps {
  stages: ApplicationStage[];
}

const statusConfig = {
  Completed: { icon: Check, color: 'bg-primary text-primary-foreground', badge: 'default' },
  'In Progress': { icon: Loader, color: 'bg-blue-500 text-white animate-spin', badge: 'secondary' },
  Pending: { icon: Circle, color: 'bg-muted-foreground/20 text-muted-foreground', badge: 'outline' },
};

export default function ApplicationStepper({ stages }: ApplicationStepperProps) {
  return (
    <div className="space-y-0">
      {stages.map((stage, index) => {
        const config = statusConfig[stage.status];
        const isLast = index === stages.length - 1;

        return (
          <div key={stage.name} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full',
                  config.color
                )}
              >
                <config.icon className="h-4 w-4" />
              </div>
              {!isLast && (
                <div className="w-px flex-1 bg-border" />
              )}
            </div>
            <div className="pb-8 flex-1">
              <div className="flex items-center justify-between">
                <p className={cn(
                  'font-medium',
                  stage.status === 'Pending' ? 'text-muted-foreground' : 'text-foreground'
                )}>
                  {stage.name}
                </p>
                <Badge variant={config.badge as any} className="hidden sm:inline-flex">{stage.status}</Badge>
              </div>
              {stage.date && <p className="text-sm text-muted-foreground">{stage.date}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
