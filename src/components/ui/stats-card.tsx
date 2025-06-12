import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface StatsCardProps {
  className?: string;
  children: ReactNode;
}

export function StatsCard({ className, children }: StatsCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      {children}
    </div>
  );
} 