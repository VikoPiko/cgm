import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/sessions";

const protectedRoutes = ["/"]
const publicRoutes = ["/sign-in", "sign-up"]

export default async function middleware(req: NextRequest){
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if(isProtectedRoute && !session?.userId){
        return NextResponse.redirect(new URL("/sign-in", req.nextUrl))
    }

    if(isPublicRoute && session?.userId){
        return NextResponse.redirect(new URL("/", req.nextUrl))
    }
    return NextResponse.next()
}