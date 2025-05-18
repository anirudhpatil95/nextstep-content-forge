import { VariantProps } from 'class-variance-authority';

declare module '@/components/ui/button' {
  export interface ButtonProps {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
  }
}

declare module '@/components/ui/badge' {
  export interface BadgeProps {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }
} 