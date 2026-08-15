import { cva } from 'class-variance-authority'

/* Kept out of button.tsx so that file only exports a component, which is what
   react-refresh needs to hot-reload it reliably. */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground rounded-lg shadow-sm hover:bg-sky-700 dark:hover:bg-sky-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
        /* The signature 8-bit button: hard edges, offset shadow that
           collapses as the button is pressed down into the page. */
        pixel:
          'rounded-none bg-primary text-primary-foreground border-2 border-sky-800 dark:border-sky-200 shadow-[4px_4px_0_0_var(--sky-800)] dark:shadow-[4px_4px_0_0_var(--sky-200)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--sky-800)] dark:hover:shadow-[6px_6px_0_0_var(--sky-200)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--sky-800)] dark:active:shadow-[2px_2px_0_0_var(--sky-200)]',
        pixelOutline:
          'rounded-none bg-card text-foreground border-2 border-foreground shadow-[4px_4px_0_0_var(--sky-400)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--sky-400)] hover:bg-sky-50 dark:hover:bg-sky-950/50 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--sky-400)]',
        destructive:
          'bg-destructive text-destructive-foreground rounded-lg shadow-sm hover:brightness-110',
        outline:
          'border border-border bg-card text-foreground rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-sky-300',
        secondary:
          'bg-secondary text-secondary-foreground rounded-lg hover:bg-sky-200 dark:hover:bg-sky-900',
        ghost:
          'rounded-lg hover:bg-accent hover:text-accent-foreground text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 text-sm',
        sm: 'h-8 px-3 text-xs gap-1.5',
        lg: 'h-12 px-7 text-base',
        xl: 'h-14 px-9 text-lg',
        icon: 'size-10',
        iconSm: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
