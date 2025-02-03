import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  address: z.string().min(3).max(50),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  city: z.string().min(3).max(50),
  postalCode: z.string().min(3).max(6),
  dateOfBirth: z.string().min(3),
  ssn: z.string().min(3).max(10),
  state: z.string().min(2).max(30),
});

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));