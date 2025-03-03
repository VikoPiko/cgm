"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ModeToggle } from "@/components/ThemeSwitcher";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  // Language options
  const languages = [
    { code: "en", label: "English" },
    { code: "tr", label: "Türkçe" },
    { code: "bg", label: "Български" },
  ];

  const changeLanguage = (lang: string) => {
    setDropdownOpen(false);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="col-span-12 p-[10px] rounded-md border border-stone-600 flex shadow-md items-center justify-between dark:bg-[#242424] dark:shadow-stone-700 dark:shadow-md bg-white">
      {/* Left Side */}
      <div className="relative ml-2 space-x-5 items-center hidden md:flex">
        <Link
          href="/new-home"
          className="text-lg font-medium dark:hover:text-blue-300 hover:-translate-y-[3px] transition-all duration-200 ease-in-out rounded-sm p-1
          text-black dark:text-stone-200 hover:text-blue-600 hover:scale-110 underline-offset-[3px] underline hover:underline-offset-[5px]"
        >
          {t("personal")}
        </Link>
        <Link
          href="/business"
          className="text-lg font-medium dark:hover:text-blue-300 hover:-translate-y-[3px] transition-all duration-200 ease-in-out text-black dark:text-stone-200 hover:text-blue-600 hover:scale-110 underline-offset-[3px] underline hover:underline-offset-[5px]"
        >
          {t("business")}
        </Link>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="flex md:hidden items-center space-x-3">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-black dark:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Centered Logo */}
      <div className="flex-1 flex justify-center hover:scale-105 hover:-translate-y-[2px] transition-all duration-200 ease-in-out max-w-20 md:flex-none">
        <Link href="/">
          <Image src="/logo2.svg" width={75} height={40} alt="logo" priority />
        </Link>
      </div>

      {/* Right Side */}
      <div className="items-center space-x-4 relative mr-[10px] hidden md:flex">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-black dark:text-white font-medium px-4 py-2 w-32 rounded-lg transition bg-stone-100 hover:bg-blue-600/20
            hover:-translate-y-[2px] ease-in-out duration-150 dark:bg-[#242424] dark:hover:bg-blue-400/40 border dark:border-stone-400"
            >
              <span className="flex items-center justify-center w-full min-w-[70px] text-center my-1">
                {t("language")}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 111.04 1.08l-4 3.75a.75.75 0 01-1.04 0l-4-3.75a.75.75 0 01-.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="block w-full text-left px-4 py-2 hover:bg-blue-600/20 "
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mode Toggle */}
        <ModeToggle />
        <Link
          href="/support"
          className="text-stone-600 dark:text-stone-300 hover:-translate-y-[3px] transition-all duration-200 ease-in-out "
        >
          Support
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden w-full bg-white dark:bg-[#242424] absolute top-[60px] left-0 right-0 shadow-md rounded-md transition-all ease-in-out duration-300 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <Link
            href="/new-home"
            className="text-lg font-medium dark:text-stone-200 hover:text-blue-600 py-2"
          >
            {t("personal")}
          </Link>
          <Link
            href="/business"
            className="text-lg font-medium dark:text-stone-200 hover:text-blue-600 py-2"
          >
            {t("business")}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full text-left py-2"
              >
                {t("language")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="block w-full text-left px-4 py-2 hover:bg-blue-600/20 transition"
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
          <Link
            href="/support"
            className="text-stone-600 dark:text-stone-300 hover:text-blue-600 py-2"
          >
            Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
