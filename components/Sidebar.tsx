"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/index";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { User } from "@prisma/client";
import { useTranslation } from "react-i18next"; // Import translation hook

const Sidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const { t } = useTranslation(); // Use the translation hook
  const [hasMounted, setHasMounted] = useState(false); // Track hydration

  useEffect(() => {
    setHasMounted(true); // Mark as mounted to avoid hydration mismatch

    const fetchUser = async () => {
      try {
        const response = await fetch("/api/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8 text-black max-md:hidden sm:p-4 xl:p-6 2xl:w-[300px]">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/cgm-logo.svg"
            width={80}
            height={80}
            alt="CGM Logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-black-1 max-xl:hidden">
            CGM
          </h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start",
                {
                  "bg-[#0179FE]": isActive,
                }
              )}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({ "brightness-[3] invert-0": isActive })}
                />
              </div>
              <p
                className={cn(
                  "text-16 font-semibold text-black-2 max-xl:hidden",
                  {
                    "!text-white": isActive,
                  }
                )}
              >
                {hasMounted ? t(item.label) : ""}{" "}
                {/* Prevent hydration mismatch */}
              </p>
            </Link>
          );
        })}
      </nav>
      {user && <Footer user={user} />}
    </section>
  );
};

export default Sidebar;
