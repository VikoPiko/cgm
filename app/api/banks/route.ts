// /app/api/users/route.ts
import prisma from "@/lib/prisma"; // Ensure you have a Prisma client instance
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const bank = await prisma.banks.create({
      data: {
        ...data
      },
    });
    return NextResponse.json(bank, { status: 201 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Failed to create bank" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get("userId");
  
      if (!userId) {
        return NextResponse.json({ error: "UserId is required" }, { status: 400 });
      }
  
      // Fetch all banks linked to the user
      const banks = await prisma.banks.findMany({
        where: {
          userId: userId,
        },
      });
  
      return NextResponse.json({ banks });
    } catch (error) {
      console.error("Error fetching banks:", error);
      return NextResponse.json({ error: "Failed to fetch banks" }, { status: 500 });
    }
  }