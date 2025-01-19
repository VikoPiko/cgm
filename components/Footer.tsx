import React from "react";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Footer = ({ user }: { user: User }) => {
  const { t } = useTranslation(); // Initialize translation function

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "DELETE",
      });
      if (response.ok) {
        console.log(t("logoutSuccess")); // Translation for successful logout
        window.location.reload();
      } else {
        console.error(t("logoutFailure")); // Translation for logout failure
      }
    } catch (error) {
      console.error(t("logoutError"), error); // Translation for logout error
    }
  };

  return (
    <footer className="flex cursor-pointer items-center justify-between gap-2 py-6">
      <div className="">
        <p className="text-xl font-bold text-gray-700">{}</p>
      </div>
      <div className="flex flex-1 flex-col justify-center max-xl:hidden">
        <h1 className="text-14 truncate text-gray-700 font-semibold">
          {user.firstName}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600 max-w-[130px]">
          {user.email}
        </p>
      </div>
      <button
        className="bg-blue-700 text-white px-6 py-2 rounded-xl hover:bg-blue-900 transition-all ease-in-out transform hover:scale-105 shadow-lg inline-block"
        onClick={handleLogout}
      >
        {t("logoutButton")} {/* Translation for the logout button */}
      </button>
    </footer>
  );
};

export default Footer;
