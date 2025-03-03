"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import CountUp from "react-countup";
import axios from "axios"; // Make sure to import axios for the API call

export const StatCards = () => {
  const { t } = useTranslation();

  const [balanceData, setBalanceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        // Assuming you have a userId available from context or props
        const userId = "7308e232-5b61-451d-910c-c7b3c0dc7bf0"; // Replace with actual userId logic

        // Fetch the user's banks and get the accessToken
        const response = await axios.get(`/api/get-balances?userId=${userId}`);
        const bank = response.data.banks[0]; // Assuming you're dealing with a single bank

        if (bank && bank.accessToken) {
          // Now call your getBalances API
          const balanceResponse = await axios.post("/api/get-balances", {
            accessToken: bank.accessToken,
          });

          setBalanceData(balanceResponse.data);
        }
      } catch (error) {
        console.error("Error fetching balance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, []);

  const data = [
    {
      title: t("totalBalanceTitle"),
      value: balanceData?.balances?.total || 0,
      currencySymbol: "$",
      pillText: "2.75%",
      period: "From Jan 1st - Jan 31st",
    },
    {
      title: t("incomeThisMonth"),
      value: balanceData?.balances?.income || 0,
      currencySymbol: "$",
      pillText: "1.28%",
      period: "From Jan 1st - Jan 31st",
    },
    {
      title: t("spentThisMonth"),
      value: balanceData?.balances?.spent || 0,
      currencySymbol: "$",
      pillText: "60.75%",
      period: "From Jan 1st - Jan 31st",
    },
  ];

  function determineTrend(value: string) {
    let numericValue = parseFloat(value.replace("%", "")); // Convert percentage string to number
    return numericValue > 1.5 ? "up" : "down";
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            value={item.value}
            currencySymbol={item.currencySymbol}
            pillText={item.pillText}
            trend={determineTrend(item.pillText)}
            period={item.period}
          />
        ))
      )}
    </>
  );
};

const Card = ({
  title,
  value,
  currencySymbol,
  pillText,
  trend,
  period,
}: {
  title: string;
  value: number;
  currencySymbol: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
}) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300 dark:bg-[#242424] dark:text-white">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-md dark:text-stone-100">
            {title}
          </h3>
          <div className="text-3xl font-semibold">
            <AnimatedCounter amount={value} currencySymbol={currencySymbol} />
          </div>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500 dark:text-stone-300">{period}</p>
    </div>
  );
};

const AnimatedCounter = ({
  amount,
  currencySymbol,
}: {
  amount: number;
  currencySymbol: string;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure CountUp runs only on the client
  }, []);

  return (
    <span className="w-full transition-all ease-in-out duration-500">
      {isClient ? (
        <CountUp
          duration={1.5}
          decimals={2}
          decimal=","
          suffix={currencySymbol}
          end={amount}
        />
      ) : (
        `${amount.toFixed(2)}${currencySymbol}`
      )}
    </span>
  );
};
