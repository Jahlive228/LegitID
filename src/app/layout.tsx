import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/globals.css";
import { Toaster } from "../components/ui/toaster";
import Provider from "../components/Provider";
import { ThemeProvider } from "../components/themes-provider";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LegitID",
  description: "Application d'authentification de pièces d'identité",
};
//importer provider et appeler dans le body
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
