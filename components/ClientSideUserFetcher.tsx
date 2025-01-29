"use client";

import { useEffect, useState } from "react";
import RightSidebar from "@/components/RightSidebar";
import { User } from "@prisma/client";

const ClientSideUserFetcher = () => {
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

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>Error: Unable to fetch user data</div>;

  return <RightSidebar user={user} />;
};

export default ClientSideUserFetcher;
