"use server"

import { z } from "zod"
import prisma from "../prisma"
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSession } from "../sessions";

const loginSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .trim()
      .nonempty({ message: "Email is required" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters" })
      .nonempty({ message: "Password is required" }),
  });

export async function login(prevState: any, formData: FormData){
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if(!result.success){
        return{
            errors: result.error.flatten().fieldErrors,
        }
    }
    const {email, password} = result.data
    
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(!user || !(await bcrypt.compare(password, user.password))){
        return {
            errors: {
                email: "Invalid email or password"
            }
        }
    }
    await createSession(user.userId)

    redirect('/')
}

export async function logout(){
    (await  cookies()).delete("session")
}