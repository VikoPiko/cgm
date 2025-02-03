"use client";

import TotalBalanceBox from "@/components/TotalBalanceBox";
import React, { useEffect, useState } from "react";
import RightSidebar from "@/components/RightSidebar";
import { User } from "@prisma/client";
import { useTranslation } from "react-i18next";
import { usePlaidLink } from "react-plaid-link";

interface Account {
  account: string;
  routing: string;
}

function PlaidToken({ public_token }: { public_token: string }) {
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        // Exchange public token for access token
        const res = await fetch("/api/plaid/exchange-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_token }),
        });

        if (!res.ok) {
          throw new Error("Failed to exchange public token");
        }

        const data = await res.json();
        const accessToken = data.accessToken;
        console.log("accessToken:", accessToken); // Log the actual access token

        // Now pass the accessToken to the auth API route
        const authRes = await fetch("/api/plaid/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken }),
        });

        if (!authRes.ok) {
          throw new Error("Failed to fetch auth data");
        }

        const authData = await authRes.json();
        console.log("Auth Data:", authData); // Log the auth data
        setAccount(authData.numbers.ach[0]);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchAccessToken();
  }, []);

  return (
    account && (
      <>
        <p>Account number: {account.account}</p>
        <p>Rouing number: {account.routing}</p>
      </>
    )
  );
}

const Main = () => {
  const { t } = useTranslation();
  const [linkToken, setLinkToken] = useState("");
  const [publicToken, setPublicToken] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // try {
      //   const response = await fetch("/api/me");
      //   if (response.ok) {
      //     const data = await response.json();
      //     setUser(data);
      //   } else {
      //     console.error("Failed to fetch user data");
      //   }
      // } catch (error) {
      //   console.error("Error fetching user data:", error);
      // } finally {
      //   setLoading(false);
      // }
      try {
        const response = await fetch(
          "http://localhost:3000/api/plaid/link-token",
          {
            method: "POST",
            // headers: {
            //   "Content-Type": "application/json",
            // },
            // body: JSON.stringify({ user }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch link token");
        }

        const data = await response.json();
        setLinkToken(data.link_token);
        console.log("Generated Link Token:", data.link_token); // Log link token
      } catch (err) {
        console.error("Error fetching link token:", err);
      }
    };

    fetchUser();
  }, []);

  // if (loading)
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Loading...
  //     </div>
  //   );

  // if (!user)
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Error: Unable to load user data
  //     </div>
  //   );
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token);
      console.log("public_token:", public_token);
      console.log("metadata:", metadata);
    },
  });

  return publicToken ? (
    <PlaidToken public_token={publicToken} />
  ) : (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
};
//   return (
//     <main className="flex h-screen w-full">
//       <div className="flex-1 flex flex-col bg-gray-50">
//         <section className="p-6 md:p-8">
//           <div className="mb-8 flex justify-between items-center">
//             {" "}
//             {/* Use flex with justify-between */}
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">
//                 {t("welcomeUser")}{" "}
//                 <span className="text-cerulian">{user.firstName}</span>!
//               </h1>
//               <p className="text-gray-600 mt-2">{t("overviewSubtitle")}</p>
//             </div>
//             {/* Button on the right side */}
//             <button
//               onClick={() => alert("Button clicked")} // Example button functionality
//               className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
//             >
//               {t("addBankButton")} {/* Replace with the actual button text */}
//             </button>
//           </div>

//           <div className="w-full">
//             <TotalBalanceBox
//               totalBanks={3} // Example prop
//               totalCurrentBalance={1789.99} // Example prop
//               accounts={[]} // Example prop
//             />
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

export default Main;
