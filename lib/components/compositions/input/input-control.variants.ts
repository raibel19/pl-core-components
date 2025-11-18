import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  [
    'w-full',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none',
    'focus-visible:ring-inset',
    'focus-visible:ring-1',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-0',
    'focus-visible:ring-offset-background',
    'text-foreground',
    'border-solid',
  ],
  {
    variants: {
      isError: {
        true: ['border-destructive/80', 'focus-visible:border-destructive/80', 'focus-visible:ring-destructive/20'],
      },
    },
    defaultVariants: {
      isError: false,
    },
  },
);
