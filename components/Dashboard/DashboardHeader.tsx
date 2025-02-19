"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ModeToggle } from "../ThemeSwitcher";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";

const DashboardHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown toggle state
  const { t } = useTranslation();

  // Language options
  const languages = [
    { code: "en", label: "English" },
    { code: "tr", label: "Türkçe" },
    { code: "bg", label: "Български" },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang); // Change global language
    setDropdownOpen(false); // Close dropdown
  };

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300 flex shadow-md items-center justify-between dark:bg-[#242424] dark:shadow-stone-700 dark:shadow-lg">
      {/* Left Side */}
      <div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Left
        </button>
      </div>

      {/* Centered Logo */}
      <div className="flex-1 flex justify-center hover:scale-105 hover:-translate-y-[2px] transition-all duration-200 ease-in-out">
        <Link href="/">
          <Image src="/logo2.svg" width={75} height={40} alt="logo" priority />
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4 relative">
        {" "}
        {/* Make sure to include 'relative' to position the dropdown */}
        {/* Language Selector */}
        <div className="relative">
          {/* Button to Toggle Dropdown */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center text-black font-medium px-4 py-2 w-32 rounded-lg transition"
          >
            <span>{t("language")}</span>
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
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-10 w-32">
              {languages.map((lang) => (
                <li key={lang.code}>
                  <button
                    onClick={() => changeLanguage(lang.code)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    {lang.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Mode Toggle */}
        <ModeToggle />
      </div>
    </div>
  );
};

export default DashboardHeader;
