"use client";

import { useEffect } from "react";

interface PlaidTokenProps {
  publicToken: string;
  userId: string;
}

const PlaidToken: React.FC<PlaidTokenProps> = ({ publicToken, userId }) => {
  useEffect(() => {
    async function fetchAccessToken() {
      try {
        if (!publicToken || !userId) {
          console.error("Missing publicToken or userId", {
            publicToken,
            userId,
          });
          return;
        }

        const payload = { public_token: publicToken, userId };
        console.log("Sending payload:", payload); // Debugging

        const res = await fetch("/api/plaid/exchange-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to exchange public token");

        const data = await res.json();
        console.log("Bank added:", data.bank);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (publicToken && userId) fetchAccessToken();
  }, [publicToken, userId]);

  return <p>Bank is being linked...</p>;
};

export default PlaidToken;
