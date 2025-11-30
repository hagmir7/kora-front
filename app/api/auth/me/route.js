// app/api/auth/me/route.js
import { NextResponse } from "next/server";
import cookie from "cookie";

const DJANGO_URL = process.env.DJANGO_URL || "http://localhost:8000";

export async function GET(request) {
    try {
        // Read cookie header (works in all runtimes)
        const cookieHeader = request.headers.get("cookie") || "";
        const cookies = cookie.parse(cookieHeader || "");
        const refresh = cookies.refresh_token;

        if (!refresh) {
            return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
        }

        // Refresh access token using Django
        const refreshRes = await fetch(`${DJANGO_URL}/api/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
        });

        if (!refreshRes.ok) {
            const txt = await refreshRes.text().catch(() => null);
            console.error("Django refresh failed", refreshRes.status, txt);
            return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
        }

        const refreshData = await refreshRes.json();
        const access = refreshData.access;
        if (!access) {
            console.error("No access after refresh", refreshData);
            return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
        }

        // Get user info
        const userRes = await fetch(`${DJANGO_URL}/api/me/`, {
            headers: { Authorization: `Bearer ${access}` },
        });

        if (!userRes.ok) {
            const txt = await userRes.text().catch(() => null);
            console.error("Django /api/me failed", userRes.status, txt);
            return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
        }

        const user = await userRes.json();
        return NextResponse.json({ authenticated: true, user }, { status: 200 });
    } catch (err) {
        console.error("/api/auth/me error:", err);
        return NextResponse.json({ authenticated: false, user: null, error: "server_error" }, { status: 500 });
    }
}
