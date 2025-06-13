"use client"
import * as React from "react"
import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import { useContext } from "react";



import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { useToast } from "../../../components/ui/use-toast"
import { ToastAction } from "../../../components/ui/toast"
import { StateContext } from "../../../components/Provider"
import { Loader } from "lucide-react";
import { AppSidebar } from "../../../components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb"
import { Separator } from "../../../components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../../components/ui/sidebar2"
import VerifierForm from "../../../components/verifier_role"


const formSchema = z.object({
    address: z.string().min(42, {
        message: "Address must be at least 43 characters.",
    }),

    typeOp: z.string({
        required_error: "Please select a type.",
    }),



})

export default function VerifierRolePage() {
  return (
    <SidebarProvider className="flex min-h-screen">
      <AppSidebar />
      <SidebarInset className="flex-1">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard2">
                    Tableau de bord
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Rôle Vérificateur</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-4">
          <h1 className="text-2xl font-bold mb-4">Gestion du rôle de vérificateur</h1>
          <div className="grid gap-4">
            {/* Contenu de la gestion du rôle de vérificateur à implémenter */}
            <VerifierForm />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
