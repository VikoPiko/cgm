"use client";

import React from "react";
import DoughnutChart from "../DoughnutChart";
import { FiDollarSign } from "react-icons/fi";

const DoughnutCard = () => {
  return (
    <div className="col-span-4 p-4 rounded border  border-stone-300 dark:bg-[#242424] flex flex-col items-center">
      <h3 className="text-stone-500 mb-4 text-md font-thin dark:text-white flex items-center gap-1">
        <FiDollarSign className="text-lg" />
        Bank Balances
      </h3>
      <div className="w-40 h-40 self-start p-2 ">
        <DoughnutChart />
      </div>
      <p className="text-xs text-stone-500 mt-4 dark:text-white">Distribution of Balances</p>
    </div>
  );
};

export default DoughnutCard;
