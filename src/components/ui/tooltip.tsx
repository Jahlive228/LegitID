"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

interface TooltipProviderProps {
  children: React.ReactNode
  delayDuration?: number
}

export function TooltipProvider({ children }: TooltipProviderProps) {
  return <>{children}</>
}

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  className?: string
}

export function Tooltip({ children, content, side = 'top', align = 'center', className }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-2 py-1 text-sm text-white bg-black rounded shadow-lg",
            side === 'top' && 'bottom-full mb-2',
            side === 'right' && 'left-full ml-2',
            side === 'bottom' && 'top-full mt-2',
            side === 'left' && 'right-full mr-2',
            align === 'start' && 'origin-top-left',
            align === 'center' && 'origin-top',
            align === 'end' && 'origin-top-right',
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export function TooltipTrigger({ children, asChild, ...props }: { children: React.ReactNode, asChild?: boolean }) {
  const Comp = asChild ? 'span' : 'button'
  return <Comp {...props}>{children}</Comp>
}

export function TooltipContent({ children, className, ...props }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("z-50 overflow-hidden rounded-md bg-black px-3 py-1.5 text-xs text-white", className)} {...props}>
      {children}
    </div>
  )
}
