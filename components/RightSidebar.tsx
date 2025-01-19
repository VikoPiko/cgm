"use client";

import i18n from "@/lib/i18n/i18n";
import { User } from "@prisma/client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const RightSidebar = ({ user }: { user: User }) => {
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
    <aside className="sticky right-0 top-0 h-screen w-fit flex flex-col justify-between border-l border-gray-200 bg-gray-100 pt-8 text-black sm:p-4 xl:p-6 2xl:w-[250px] shadow-lg">
      <div className="flex flex-col items-center justify-between px-6">
        <div>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg transition"
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
              <ul className="absolute right-0 mt-1 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-10 w-32">
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
        </div>
        <section className="flex flex-col pb-8 mt-14">
          {/* Background */}
          <div className="h-[120px] w-full bg-gradient-to-r from-blue-500 to-indigo-600 bg-cover bg-no-repeat rounded-md" />

          {/* Profile Section */}
          <div className="relative flex justify-center px-6 -mt-16">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-md">
              <span className="flex items-center justify-center text-5xl font-bold text-blue-500 w-full h-full">
                {user.firstName[0]}
              </span>
            </div>

            <div className="flex flex-col pt-16 text-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-md font-normal text-gray-600">{user.email}</p>
            </div>
          </div>
        </section>
      </div>
      {/* Additional Links or Information */}
      <nav className="flex flex-col gap-6 px-6 mt-4">
        {" "}
        {/* Reduced margin top */}
        <a
          href="#"
          className="text-gray-600 hover:text-blue-500 text-lg transition"
        >
          {t("accountSettings")}
        </a>
        <a
          href="#"
          className="text-gray-600 hover:text-blue-500 text-lg transition"
        >
          {t("privacyPolicy")}
        </a>
        <a
          href="#"
          className="text-gray-600 hover:text-blue-500 text-lg transition"
        >
          {t("helpCenter")}
        </a>
      </nav>
    </aside>
  );
};

export default RightSidebar;
