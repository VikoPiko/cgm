"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/components/UserContext";
import { useTranslation } from "react-i18next";
import { sidebarLinks } from "@/index";
import { cn } from "@/lib/utils";
import { NavUser } from "@/components/nav-user";

export function AppSidebar() {
  const pathname = usePathname();
  const user = useUser();
  const { t } = useTranslation();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="p-4 pb-6 font-medium text-lg items-center justify-center text-stone-800 dark:text-white">
            CGM Bank
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarLinks.map((item) => {
                const isActive =
                  pathname === item.route ||
                  pathname.startsWith(`${item.route}/`);

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.route}
                        className={cn(
                          "flex items-center gap-3 p-2 rounded-lg",
                          { "bg-stone-200 dark:bg-[#484848]": isActive }
                        )}
                      >
                        <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        <span
                          className={cn({
                            "!text-black dark:!text-white": isActive,
                          })}
                        >
                          {hasMounted ? t(item.label, item.label) : ""}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {user ? <NavUser user={user} /> : <div>Loading user...</div>}
      </SidebarFooter>
    </Sidebar>
  );
}
