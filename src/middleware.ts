import { NextRequest, NextResponse } from "next/server";

const rateLimit = new Map<string, { count: number; reset: number }>();

const RATE_LIMIT = 10; // max requests per window
const RATE_WINDOW = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only apply to API routes
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Block direct access to private files
  if (pathname.includes("private") || pathname.includes("..")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // CSRF: reject POST requests from foreign origins
  if (req.method === "POST") {
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // Rate limiting on payment endpoints
  if (pathname.startsWith("/api/paypal/")) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
