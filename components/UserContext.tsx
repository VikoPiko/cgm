"use client";
import { createContext, useContext, useState, useEffect } from "react";

// UserContext.tsx (or wherever you define the context)
interface User {
  userId: string;
  email: string;
  password: string;
  address: string;
  firstName: string;
  lastName: string;
  city: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  state: string;
  createdAt: Date;
  avatar: string;
}

interface UserContextType {
  user: User | null;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const response = await fetch("/api/me");
    if (response.ok) {
      const data = await response.json();
      setUser(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Example of how your useUser hook should return a full user
export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/me");
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  return user;
}
