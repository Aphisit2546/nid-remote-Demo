'use client';

import { cn } from '@/utils/cn';
import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-text-secondary mb-2"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'w-full px-4 py-3 rounded-xl',
                        'bg-bg-card border border-border',
                        'text-text-primary placeholder:text-text-muted',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                        'transition-all duration-200',
                        error && 'border-danger focus:ring-danger',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-2 text-sm text-danger">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
