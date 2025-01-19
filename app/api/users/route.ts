// /app/api/users/route.ts
import prisma from "@/lib/prisma"; // Ensure you have a Prisma client instance
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 10), // Ensure passwords are hashed
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
