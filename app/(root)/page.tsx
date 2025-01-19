"use client";

import TotalBalanceBox from "@/components/TotalBalanceBox";
import React, { useEffect, useState } from "react";
import RightSidebar from "@/components/RightSidebar";
import { User } from "@prisma/client";
import { useTranslation } from "react-i18next";

const Main = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        Error: Unable to load user data
      </div>
    );

  return (
    <main className="flex h-screen w-full">
      <div className="flex-1 flex flex-col bg-gray-50">
        <section className="p-6 md:p-8">
          <div className="mb-8 flex justify-between items-center">
            {" "}
            {/* Use flex with justify-between */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {t("welcomeUser")}{" "}
                <span className="text-cerulian">{user.firstName}</span>!
              </h1>
              <p className="text-gray-600 mt-2">{t("overviewSubtitle")}</p>
            </div>
            {/* Button on the right side */}
            <button
              onClick={() => alert("Button clicked")} // Example button functionality
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              {t("addBankButton")} {/* Replace with the actual button text */}
            </button>
          </div>

          <div className="w-full">
            <TotalBalanceBox
              totalBanks={3} // Example prop
              totalCurrentBalance={1789.99} // Example prop
              accounts={[]} // Example prop
            />
          </div>
        </section>
      </div>

      <RightSidebar user={user} />
    </main>
  );
};

export default Main;
