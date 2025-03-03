import { cookies } from "next/headers";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { decrypt } from "@/lib/sessions";
import prisma from "@/lib/prisma";
import React from "react";
import I18nProvider from "@/components/I18nextProvider";

// Function to fetch user data and decrypt session
async function getUserDataFromSession() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("session")?.value;

  if (!cookie) {
    return null; // User is not authenticated
  }

  const session = await decrypt(cookie);
  if (!session?.userId) {
    return null; // Invalid session
  }

  const user = await prisma.user.findUnique({
    where: { userId: String(session.userId) },
    select: {
      userId: true,
      email: true,
      password: true,
      address: true,
      firstName: true,
      lastName: true,
      city: true,
      postalCode: true,
      dateOfBirth: true,
      ssn: true,
      state: true,
      createdAt: true,
      avatar: true,
    },
  });

  return user;
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  // Get user data from session
  const user = await getUserDataFromSession();
  const userId = user?.userId || ""; // Set userId

  return (
    <html suppressHydrationWarning>
      <body>
        <I18nProvider>
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
                    {/* Pass userId to DashboardHeader */}
                    <DashboardHeader userId={userId} />
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
