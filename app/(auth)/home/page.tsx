"use client";

import { login } from "@/lib/actions/actions";
import Link from "next/link";
import { useState } from "react";
import "@/lib/i18n/i18n";
import { useTranslation } from "react-i18next";

const home = () => {
  const [formErrors, setFormErrors] = useState<any>({});
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target as HTMLFormElement); // Capture form data
    const result = await login({}, formData); // Call login with the form data

    if (result.errors) {
      setFormErrors(result.errors); // Set errors if validation fails
    }
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-mainPrimary py-16 mt-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center space-y-0 md:space-y-0 md:space-x-10">
          {/* Image/Banner */}
          <div className="w-full md:w-1/1">
            <img
              src="/hero-temp.jpg"
              alt="Hero"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
          {/* Text + Buttons */}
          <div className="w-full md:w-1/2 text-center md:text-center ">
            <h1 className="text-5xl md:text-6xl font-bold mb-2 relative tracking-tighter text-white">
              {t("heroTitle")}
            </h1>
            <p className="text-gray-200 text-xl font-bold">
              {t("heroSubtitle")}
            </p>
            <div className="flex justify-center md:justify-center space-x-4 mt-8">
              <div>
                <Link href="/sign-up">
                  <span className="bg-orange-600 text-white px-6 py-2 rounded-xl hover:bg-orange-700 transition-all ease-in-out transform hover:scale-105 shadow-lg inline-block">
                    {t("signUpButton")}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Login Box */}
          <div className="flex justify-center md:justify-end w-full mt-8 ">
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg dark:bg-gray-700">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                {t("loginBoxTitle")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Field */}
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
                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                    placeholder={t("emailPlaceholder")}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{t("emailError")}</p>
                  )}
                </div>
                {/* Password Field */}
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
                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                    placeholder={t("passwordPlaceholder")}
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-sm">{t("passwordError")}</p>
                  )}
                </div>
                {/* Login Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 mt-4 rounded-xl hover:bg-blue-600 transition duration-150 ease-in-out transform hover:scale-105 shadow-lg"
                  >
                    {t("loginButton")}
                  </button>
                </div>
                {/* Forgot Password */}
                <div className="mt-2 text-center">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    {t("forgotPassword")}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full bg-white dark:bg-gray-800 py-16 text-left">
        <div className="w-full px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-4xl font-bold underline text-center underline-offset-8 group transition-all duration-500 ease-in-out hover:text-mainAccent mb-6 dark:text-white">
            {t("aboutUsTitle")}
          </h2>
          <p className="w-full max-w-3xl mx-auto text-lg text-gray-700 dark:text-white">
            <span className="text-xl font-bold text-black dark:text-white">
              {t("aboutUsGoalTitle")}
            </span>
            <br />
            {t("aboutUsText")}
          </p>
        </div>
      </section>

      {/* Card Section (Template) */}
      <section className="w-full bg-white dark:bg-gray-800 py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">{t("featuresTitle")}</h2>
        </div>
        <div className="w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div
            className="relative p-6 border rounded-lg bg-gradient-to-b from-white
           to-gray-100 shadow-lg shadow-orange-500 drop-shadow-lg ring-2
            ring-orange-400 transition-all duration-300 hover:shadow-xl hover:shadow-orange-600 
            hover:ring-4 hover:ring-orange-500 hover:scale-105
            dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-800"
          >
            <h3 className="font-bold text-lg mb-2">{t("feature1Title")}</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t("feature1Description")}
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="relative p-6 border rounded-lg  bg-gradient-to-b from-white to-gray-100 shadow-lg shadow-orange-500 drop-shadow-lg ring-2 ring-orange-400 transition-all duration-300 hover:shadow-xl hover:shadow-orange-600 hover:ring-3 hover:ring-orange-500 hover:scale-105 dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-800">
            <h3 className="font-bold text-lg mb-2">{t("feature2Title")}</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t("feature2Description")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default home;
