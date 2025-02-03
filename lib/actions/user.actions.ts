import prisma from "../prisma";

import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";

import { plaidClient } from "@/lib/plaid";

interface User {
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    ssn: string;
    dateOfBirth: string;
    firstName: string;
    lastName: string;
}

export async function createUser(data: User) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
  
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

export async function getAllUsers(){
    try {
        const users = await prisma.user.findMany()
        return users;
    } catch (error) {
        console.log(error, "Error fetching users")
        throw error;
    }
}

export async function getUserByEmail(email: string){
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    } catch (error) {
        console.log(error, "Error fetching users")
        throw error;
    }
}

export async function updateUser(email: string, data: User){}

export async function deleteUser(userId: string) {
    try {
      const user = await prisma.user.delete({ where: { userId } });
      return user;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  export async function createLinkToken() {
    try {
      const response = await fetch("/api/plaid/link-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to create link token");
      }
  
      const data = await response.json();
      return data; // This returns { link_token: "your-link-token" }
    } catch (error) {
      console.error("Error creating link token:", error);
      throw error;
    }
  }

  export async function exchangePublicToken(publicToken: string) {
    try {
      const response = await fetch("/api/plaid/exchange-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_token: publicToken }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to exchange public token");
      }
  
      return await response.json(); // Returns access_token and item_id
    } catch (error) {
      console.error("Error exchanging public token:", error);
      throw error;
    }
  }
  