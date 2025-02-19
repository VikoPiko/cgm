// /app/api/users/route.ts
import prisma from "@/lib/prisma"; // Ensure you have a Prisma client instance
import { NextResponse } from "next/server";

export async function UPDATE(request: Request) {
  try {
    const data = await request.json();
    const updatedUser = await prisma.user.update({
        where: {
          userId: data.userId
        },
        data: {
          firstName: data.firstName,
          email: data.email
        },
      })
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
