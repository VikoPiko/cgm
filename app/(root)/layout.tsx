import { cookies } from "next/headers"; // Import the getUser function
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Fetch user data on the server side
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar /> {/* Pass the user data to AppSidebar */}
            <SidebarInset>
              <main>
                <SidebarTrigger />
                <div className="mb-3 p-3 -mt-2">
                  <DashboardHeader />
                </div>
                {/* Pass the user data as a prop to children */}
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
