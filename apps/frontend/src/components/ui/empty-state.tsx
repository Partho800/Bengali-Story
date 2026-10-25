'use client';

import * as React from 'react';
import { LucideIcon, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = FileText,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-8 sm:p-12 text-center space-y-4 shadow-sm',
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground shadow-inner">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-lg font-bold text-foreground tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
