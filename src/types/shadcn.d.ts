import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';
import { badgeVariants } from '@/components/ui/badge';

declare module '@/components/ui/button' {
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
  }
}

declare module '@/components/ui/badge' {
  export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
}

declare module '@/lib/utils' {
  export function cn(...inputs: ClassValue[]): string;
} 