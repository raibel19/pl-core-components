import { cva } from 'class-variance-authority';

import styles from './primitives.module.css';

export const messageVariants = cva('list-inside list-none space-y-1', {
  variants: {
    type: {
      default: 'text-foreground',
      error: 'text-destructive',
      warning: styles.warning,
      info: styles.info,
      success: styles.success,
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    type: 'info',
    size: 'md',
  },
});
