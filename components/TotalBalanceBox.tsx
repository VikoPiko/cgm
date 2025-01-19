"use client";

import React, { useEffect, useState } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";
import DoughnutChart from "@/components/DoughnutChart";
import { useTranslation } from "react-i18next";

// API endpoint or service to fetch exchange rates
const fetchExchangeRates = async (currency: string) => {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/USD` // You can choose USD as base currency
    );
    const data = await response.json();
    return data.rates[currency];
  } catch (error) {
    console.error("Error fetching exchange rates", error);
    return 1; // Return 1 if there's an error in fetching rates (no conversion)
  }
};

type TotalBalanceBoxProps = {
  accounts: any[];
  totalBanks: number;
  totalCurrentBalance: number;
};

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  const { t } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState("BGN");
  const [convertedBalance, setConvertedBalance] = useState(totalCurrentBalance);
  const [currencySymbol, setCurrencySymbol] = useState("лв.");

  useEffect(() => {
    const updateConvertedBalance = async () => {
      const rate = await fetchExchangeRates(selectedCurrency);
      setConvertedBalance(totalCurrentBalance * rate);
    };
    updateConvertedBalance();

    // Set the currency symbol based on the selected currency
    switch (selectedCurrency) {
      case "BGN":
        setCurrencySymbol("лв.");
        break;
      case "USD":
        setCurrencySymbol("$");
        break;
      case "EUR":
        setCurrencySymbol("€");
        break;
      case "GBP":
        setCurrencySymbol("£");
        break;
      case "TRY":
        setCurrencySymbol("₺");
        break;
      default:
        setCurrencySymbol("лв.");
    }
  }, [selectedCurrency, totalCurrentBalance]);

  return (
    <section className="w-full flex flex-col sm:flex-row items-center gap-8 rounded-xl border bg-white p-6">
      <div className="w-1/6 ml-10">
        <DoughnutChart />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold ml-5">
          {t("bankAccounts", {
            count: totalBanks,
          })}
          : {totalBanks}
        </h2>
        <p className="text-gray-700 text-xl ml-5">{t("totalBalanceTitle")}</p>
        <div className="text-5xl font-semibold mt-4">
          <AnimatedCounter
            amount={convertedBalance}
            currencySymbol={currencySymbol}
          />
        </div>

        {/* Currency Dropdown */}
        <div className="mt-4 flex items-center gap-4">
          <label htmlFor="currency" className="text-gray-700">
            {t("selectCurrency")}
          </label>
          <select
            id="currency"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="px-4 py-2 rounded-md border"
          >
            <option value="BGN">BGN - Bulgarian Lev</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="TRY">TRY - Turkish Lira</option>
            {/* Add more currencies as needed */}
          </select>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
