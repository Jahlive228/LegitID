'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  className?: string
}

export function Sheet({ open, onOpenChange, children, className }: SheetProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange?.(false)}
      />
      <div className={cn("fixed inset-y-0 right-0 bg-white shadow-xl", className)}>
        {children}
      </div>
    </div>
  )
}

interface SheetContentProps {
  children?: React.ReactNode
  className?: string
  side?: 'left' | 'right'
  style?: React.CSSProperties
}

export function SheetContent({ children, className, side = 'right', style }: SheetContentProps) {
  return (
    <div
      className={cn(
        "fixed inset-y-0 bg-white p-6 shadow-lg transition-transform",
        side === 'right' ? 'right-0' : 'left-0',
        className
      )}
      style={style}
    >
      {children}
    </div>
  )
}

interface SheetHeaderProps {
  className?: string
  children?: React.ReactNode
}

export function SheetHeader({ className, children }: SheetHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {children}
    </div>
  )
}

interface SheetTitleProps {
  className?: string
  children?: React.ReactNode
}

export function SheetTitle({ className, children }: SheetTitleProps) {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  )
}

interface SheetDescriptionProps {
  className?: string
  children?: React.ReactNode
}

export function SheetDescription({ className, children }: SheetDescriptionProps) {
  return (
    <p className={cn("text-sm text-gray-500", className)}>
      {children}
    </p>
  )
} 