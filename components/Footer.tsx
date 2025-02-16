import React from "react";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import { useTranslation } from "react-i18next";

const Footer = ({ user }: { user: User }) => {
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "DELETE",
      });
      if (response.ok) {
        console.log(t("logoutSuccess"));
        window.location.reload();
      } else {
        console.error(t("logoutFailure"));
      }
    } catch (error) {
      console.error(t("logoutError"), error);
    }
  };

  return (
    <footer className="flex cursor-pointer items-center justify-between gap-2 py-6">
      <div className="">
        <p className="text-xl font-bold text-gray-700 dark:text-white">{}</p>
      </div>
      <div className="flex flex-1 flex-col justify-center max-xl:hidden -mr-1">
        <h1 className="text-14 truncate text-gray-700 font-semibold dark:text-white">
          {user.firstName} {user.lastName[0]}.
        </h1>
        <p className="text-14 truncate font-normal text-gray-600 dark:text-white max-w-[125px]">
          {user.email}
        </p>
      </div>
      <button
        className="bg-mainPrimary text-white px-6 py-2 rounded-xl hover:bg-mainSecondary transition-all ease-in-out transform hover:translate-y-[-2px] shadow-lg inline-block -mr-2"
        onClick={handleLogout}
      >
        {t("logoutButton")}
      </button>
    </footer>
  );
};

export default Footer;
