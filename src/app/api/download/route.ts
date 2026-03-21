import { NextRequest, NextResponse } from "next/server";
import { validateDownloadToken } from "@/lib/tokens";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const result = validateDownloadToken(token);

  if (!result.valid) {
    return NextResponse.json(
      { error: "Invalid or expired download link" },
      { status: 403 }
    );
  }

  // Proxy the file from Vercel Blob (production) — never redirect to keep URL private
  const blobUrl = process.env.BLOB_ZIP_URL;
  if (blobUrl) {
    try {
      const blobRes = await fetch(blobUrl);
      if (!blobRes.ok) {
        return NextResponse.json(
          { error: "Download temporarily unavailable" },
          { status: 502 }
        );
      }
      return new NextResponse(blobRes.body, {
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": "attachment; filename=superskills.zip",
          "Cache-Control": "no-store",
        },
      });
    } catch {
      return NextResponse.json(
        { error: "Download temporarily unavailable" },
        { status: 502 }
      );
    }
  }

  // Otherwise serve from public directory (development)
  try {
    const zipPath = join(process.cwd(), "private", "superskills.zip");
    const file = await readFile(zipPath);
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=superskills.zip",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "File not found" },
      { status: 404 }
    );
  }
}
