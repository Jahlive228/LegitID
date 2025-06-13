"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "../../lib/utils"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

 

  return (
   <div>
      {children}
   </div>
  )
} 