"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";
import Image from "next/image";
import { ModeToggle } from "./ThemeSwitcher";

const Header = () => {
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
    <header className="w-full bg-mainBackground text-mainText py-3 shadow-md over dark:bg-[#1c1f22] dark:shadow-lg dark:shadow-gray-700">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Left Side Links */}
        <div className="flex space-x-6 text-lg font-medium">
          <Link href="/" className="hover:underline dark:text-white">
            {t("personal")}
          </Link>
          <Link href="#" className="hover:underline dark:text-white">
            {t("business")}
          </Link>
        </div>

        {/* Center Brand */}
        <Link href="/" className="text-3xl font-extrabold">
          <Image src="/logo.svg" width={100} height={35} alt="CGM Bank" />
        </Link>

        {/* Right Side Links + Language Dropdown */}
        <div className="flex items-center space-x-6 text-sm text-black">
          <Link
            href="/"
            className="hover:underline hover:text-mainAccent transition-colors dark:text-white"
          >
            {t("support")}
          </Link>
          <Link
            href="/"
            className="hover:underline hover:text-mainAccent transition-colors dark:text-white"
          >
            {t("aboutUs")}
          </Link>

          {/* Language Selector */}
          <div className="relative">
            {/* Button to Toggle Dropdown */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center bg-mainAccent hover:bg-orange-600 text-black font-medium px-4 py-2 rounded-lg transition"
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
              <ul className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-10">
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
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
