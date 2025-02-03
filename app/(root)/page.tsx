"use client";

import TotalBalanceBox from "@/components/TotalBalanceBox";
import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { useTranslation } from "react-i18next";
import PlaidButton from "@/components/PlaidButton";
import PlaidToken from "@/components/PlaidToken";

const Main = () => {
  const { t } = useTranslation();
  const [publicToken, setPublicToken] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState<any[]>([]);
  const [isLinking, setIsLinking] = useState(false); // Track whether a bank is being linked

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user data...");

        const response = await fetch("/api/me");
        console.log("Response status:", response.status);

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        console.log("User data received:", data);

        if (!data?.userId) throw new Error("Invalid user data structure");

        setUser(data);

        const bankResponse = await fetch(`/api/banks?userId=${data.userId}`);
        const bankData = await bankResponse.json();
        setBanks(bankData.banks);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Function to update the banks state and reset the linking state
  const addBankToState = (newBank: any) => {
    setBanks((prevBanks) => [...prevBanks, newBank]);
    setIsLinking(false); // Reset the linking state after the bank is added
  };

  const handleLinking = () => {
    setIsLinking(true); // Set isLinking to true when the user clicks "Link Bank"
  };

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
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {t("welcomeUser")}{" "}
                <span className="text-cerulian">{user.firstName}</span>!
              </h1>
              <p className="text-gray-600 mt-2">{t("overviewSubtitle")}</p>
            </div>

            {user?.userId ? (
              isLinking ? (
                <PlaidToken
                  publicToken={publicToken}
                  userId={user.userId}
                  addBankToState={addBankToState}
                />
              ) : (
                <PlaidButton
                  userId={user.userId}
                  setPublicToken={setPublicToken}
                  handleLinking={handleLinking} // Trigger the linking process
                />
              )
            ) : (
              <p>Loading user...</p>
            )}
          </div>

          <div className="w-full">
            <TotalBalanceBox
              totalBanks={banks.length}
              totalCurrentBalance={1789.99} // Replace with dynamic total balance calculation
              accounts={banks}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Main;
