'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/providers/language-provider';

export interface LoadingSpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

export function LoadingSpinner({
  size = 'md',
  className,
  ...props
}: LoadingSpinnerProps) {
  return (
    <Loader2
      className={cn('animate-spin text-primary shrink-0', sizeClasses[size], className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export interface LoadingStateProps {
  message?: string;
  className?: string;
  fullPage?: boolean;
}

export function LoadingState({
  message,
  className,
  fullPage = false,
}: LoadingStateProps) {
  const { t } = useLanguage();
  const displayMessage = message || t('loading.pleaseWait');

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center space-y-3',
        fullPage && 'min-h-[60vh]',
        className
      )}
    >
      <LoadingSpinner size="lg" />
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        {displayMessage}
      </p>
      <span className="sr-only">{displayMessage}</span>
    </div>
  );
}
