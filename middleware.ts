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

        // if(!session) {
        //     return NextResponse.redirect(new URL("/", req.nextUrl));
        // }

        // if(session?.userId) 
        //     {
        //         const req = await fetch("/api/auth", 
        //             {
        //                 method: "GET"
        //             })
        //     }
    }
    
    if (isProtectedRoute && !session?.userId) {3
        return NextResponse.redirect(new URL("/home", req.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}
