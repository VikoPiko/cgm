"use client";

import { usePlaidLink } from "react-plaid-link";
import { useEffect, useState } from "react";

interface PlaidButtonProps {
  userId: string;
  setPublicToken: (token: string) => void;
  handleLinking: () => void;
}

const PlaidButton: React.FC<PlaidButtonProps> = ({
  userId,
  setPublicToken,
  handleLinking,
}) => {
  const [linkToken, setLinkToken] = useState("");

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await fetch("/api/plaid/link-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch link token");
        }

        const data = await response.json();
        setLinkToken(data.link_token);
      } catch (err) {
        console.error("Error fetching link token:", err);
      }
    };

    fetchLinkToken();
  }, [userId]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token) => {
      setPublicToken(public_token);
      console.log("public_token:", public_token);
    },
  });

  return (
    <button
      onClick={() => {
        handleLinking(); // Trigger the linking process
        open(); // Open the Plaid link flow
      }}
      disabled={!ready}
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
    >
      Connect a bank account
    </button>
  );
};

export default PlaidButton;
