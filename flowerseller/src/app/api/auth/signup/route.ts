import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        organization_name: body.organization_name,
        password: body.password,
      }),
    });
    const text = await res.text();
    const data = (() => {
      try {
        return JSON.parse(text) as { error?: string; token?: string };
      } catch {
        return {};
      }
    })();
    if (!res.ok) {
      const errMsg =
        data.error || text.replace(/\n$/, "") || "アカウントの作成に失敗しました";
      return NextResponse.json({ error: errMsg }, { status: res.status });
    }
    const token = data.token;
    if (!token) {
      return NextResponse.json({ ok: true });
    }
    const response = NextResponse.json({ ok: true });
    response.cookies.set("auth", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    return response;
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Server error" },
      { status: 500 }
    );
  }
}
