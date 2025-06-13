/* eslint-disable react/no-unescaped-entities */
"use client";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { useContext } from "react";
import { Calendar } from "../../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useToast } from "../../../components/ui/use-toast";
import { ToastAction } from "../../../components/ui/toast";
import { StateContext } from "../../../components/Provider";
import { ethers } from "ethers";
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
import CardRegistrationForm from "../../../components/card_registration"


const formSchema = z.object({
  country: z.string({
    required_error: "Please select a country.",
  }),
  firstname: z.string().min(2, {
    message: "Firstname must be at least 3 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Lastname must be at least 3 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 3 characters.",
  }),

  profession: z.string().min(2, {
    message: "Profession must be at least 3 characters.",
  }),
  gender: z.string({
    required_error: "Please select a gender.",
  }),
  image: z.string({
    required_error: "Please select a image.",
  }),
});

export default function CardRegistrationPage() {
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
                  <BreadcrumbPage>Enregistrement de carte</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center p-4">
          <CardRegistrationForm />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
