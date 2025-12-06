import { NextResponse } from "next/server";

export function middleware(req) {
    // Access cookie in middleware
    const token = req.cookies.get?.("access_token")?.value;

    // Redirect to login if token not found
    if (!token && req.nextUrl.pathname.startsWith("/app")) {
        // return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/app/:path*"],
};
