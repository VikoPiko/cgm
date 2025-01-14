import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/sessions";

const protectedRoutes = ["/"];
const publicRoutes = ["/sign-in", "/sign-up", "/home"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = (await cookies()).get("session")?.value;
    
    // Decrypt session only once and store it in a variable
    let session: any = null;
    if (cookie) {
        session = await decrypt(cookie);
    }

    // Only proceed with route checks if session is available
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/home", req.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}
