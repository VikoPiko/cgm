"use client";
import { login } from "@/lib/actions/actions";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import HeroImage from "../Test/HeroImage";

const Hero = () => {
  const [formErrors, setFormErrors] = useState<any>({});
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const result = await login({}, formData);

    if (result.errors) {
      setFormErrors(result.errors);
    }
    window.location.reload();
  };

  return (
    <div className="col-span-12 h-auto md:h-[500px] p-4 rounded-lg shadow-md shadow-stone-700 border border-stone-500 dark:bg-[#484848]/40 bg-gray-400/30 dark:text-white mt-4 flex flex-col md:flex-row items-center  space-y-6 md:space-y-0 md:space-x-10 backdrop-blur-lg">
      {/* Image/Banner */}
      {/* <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/card.png"
          alt="Hero"
          className="w-full max-w-sm md:max-w-full h-auto rounded-lg shadow-md shadow-stone-800 object-cover"
        />
      </div> */}
      {/* Text + Buttons */}
      <div className="w-full md:w-full text-center md:text-left px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tighter text-white drop-shadow-black">
          {t("heroTitle")}
        </h1>
        <p className="text-gray-100 text-lg md:text-xl font-bold">
          {t("heroSubtitle")}
        </p>
        <div className="flex justify-center md:justify-start md:translate-x-[140px] space-x-4 mt-6">
          <Link href="/sign-up">
            <span className="border bg-blue-500 dark:bg-blue-700/80 text-white px-6 py-2 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-800/80 transition-all ease-in-out transform hover:scale-105 shadow-lg inline-block">
              {t("signUpButton")}
            </span>
          </Link>
        </div>
      </div>

      {/* Login Box */}
      <div className="md:w-[550px] w-[300px] md:translate-y-0 max-w-md p-6 bg-white rounded-xl shadow-lg dark:bg-[#484848] transform -translate-x-0 md:-translate-x-0">
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-center md:text-left ">
          {t("loginBoxTitle")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-left text-lg font-medium text-gray-700 dark:text-white"
            >
              {t("emailLabel")}
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none"
              placeholder={t("emailPlaceholder")}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{t("emailError")}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-left text-lg font-medium text-gray-700 dark:text-white"
            >
              {t("passwordLabel")}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none"
              placeholder={t("passwordPlaceholder")}
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{t("passwordError")}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 dark:bg-blue-700/80 text-white px-4 py-2 mt-4 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-800/80 transition duration-150 ease-in-out transform hover:scale-105 shadow-lg"
            >
              {t("loginButton")}
            </button>
          </div>
          <div className="mt-2 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          </div>
        </form>
      </div>
      <HeroImage />
    </div>
  );
};

export default Hero;
