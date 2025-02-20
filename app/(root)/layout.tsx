import { cookies } from "next/headers";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import I18nProvider from "@/components/I18nextProvider"; // Import the new provider

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html suppressHydrationWarning>
      <body>
        <I18nProvider> {/* Move i18n to a Client Component */}
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSidebar />
              <SidebarInset>
                <main>
                  <SidebarTrigger />
                  <div className="mb-3 p-3 -mt-2">
                    <DashboardHeader />
                  </div>
                  {children}
                </main>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
