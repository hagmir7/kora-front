// import { api } from "@/lib/clientApi";
import { api } from "@/lib/clientApi";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();

    try {
        const response = await api.post("auth/token", body);
        const { access_token } = response.data;

        if (!access_token) {
            return NextResponse.json({ error: "Login failed" }, { status: 401 });
        }

        const res = NextResponse.json({ access_token });

        // Set the cookie from the server so middleware can read it
        res.cookies.set({
            name: "access_token",
            value: access_token,
            httpOnly: false, // false so client JS can also read it
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
            sameSite: "lax",
        });

        return res;
    } catch (error) {
        return NextResponse.json({ error: "Login failed" }, { status: 401 });
    }
}
