import { cva } from 'class-variance-authority'

/* Kept out of badge.tsx so that file only exports a component, which is what
   react-refresh needs to hot-reload it reliably. */
export const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1.5 border font-medium w-fit whitespace-nowrap shrink-0 transition-colors [&>svg]:size-3',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground rounded-full',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground rounded-full',
        outline: 'border-border text-foreground rounded-full',
        success:
          'border-transparent bg-success/12 text-success rounded-full dark:bg-success/20',
        warning:
          'border-transparent bg-warning/15 text-warning-foreground rounded-full dark:bg-warning/25 dark:text-warning',
        destructive:
          'border-transparent bg-destructive/12 text-destructive rounded-full dark:bg-destructive/20',
        /* Pixel chip — square corners, hairline brand border, pixel type */
        pixel:
          'rounded-none border-2 border-sky-500 bg-sky-50 text-sky-800 font-mono text-[0.7rem] font-semibold tracking-[0.1em] uppercase dark:bg-sky-950 dark:text-sky-200',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-[0.68rem]',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
