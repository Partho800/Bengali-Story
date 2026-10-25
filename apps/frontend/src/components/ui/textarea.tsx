'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[100px] w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive',
          error && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        ref={ref}
        aria-invalid={error ? 'true' : props['aria-invalid']}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
