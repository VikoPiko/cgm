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
    <div className="w-full">
      <CountUp
        duration={1.5}
        decimals={2}
        decimal=","
        suffix={currencySymbol} // Display the dynamic currency symbol
        end={amount}
      />
    </div>
  );
};

export default AnimatedCounter;
