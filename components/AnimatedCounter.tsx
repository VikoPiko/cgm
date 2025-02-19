"use client";

import CountUp from "react-countup";

const AnimatedCounter = ({
  amount,
  currencySymbol,
}: {
  amount: number;
  currencySymbol: string;
}) => {
  return (
    <div className="w-full transition-all ease-in-out duration-500">
      <CountUp
        duration={1.5}
        decimals={2}
        decimal=","
        suffix={currencySymbol}
        end={amount}
      />
    </div>
  );
};

export default AnimatedCounter;
