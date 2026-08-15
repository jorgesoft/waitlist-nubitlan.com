import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const thumbValues = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min],
    [value, defaultValue, min]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute h-full bg-primary"
        />
      </SliderPrimitive.Track>
      {thumbValues.map((_, i) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={i}
          className="block size-5 shrink-0 rounded-none border-2 border-sky-800 bg-card shadow-[2px_2px_0_0_var(--sky-800)] transition-[box-shadow,transform] hover:-translate-y-px hover:shadow-[3px_3px_0_0_var(--sky-800)] focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none disabled:pointer-events-none dark:border-sky-300 dark:shadow-[2px_2px_0_0_var(--sky-300)] dark:hover:shadow-[3px_3px_0_0_var(--sky-300)]"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
