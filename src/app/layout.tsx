import React from 'react';
import { Inter } from 'next/font/google'
import { Metadata } from "next";
import Provider from "../components/Provider";
import { ThemeProvider } from "../components/themes-provider";
import { Toaster } from "../components/ui/toaster";
import "../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LegitID",
  description: "Application d'authentification de pièces d'identité",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black`} suppressHydrationWarning>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
