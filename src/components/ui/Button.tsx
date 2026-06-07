import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'donate';
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-body font-bold uppercase tracking-widest transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-pink';
  const variants = {
    primary: 'rounded-pill bg-pink text-white px-7 py-4 text-sm hover:bg-raspberry',
    ghost: 'rounded-pill border-2 border-pink text-pink px-7 py-4 text-sm hover:bg-pink hover:text-white',
    donate: 'rounded-pill bg-ink text-white px-7 py-4 text-sm hover:bg-ash',
  };
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
