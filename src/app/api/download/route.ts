import { NextRequest, NextResponse } from "next/server";
import { validateDownloadToken } from "@/lib/tokens";
import { trackDownload } from "@/lib/supabase";
import { readFile } from "fs/promises";
import { join } from "path";

const MAX_DOWNLOADS = 3;

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

  // Limit downloads per order
  if (result.sessionId) {
    const count = await trackDownload(result.sessionId);
    if (count > MAX_DOWNLOADS) {
      return NextResponse.json(
        { error: "Download limit reached. Contact support." },
        { status: 403 }
      );
    }
  }

  // Proxy from Vercel Blob (production)
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

  // Serve from local (development)
  try {
    const zipPath = join(process.cwd(), "public", "superskills.zip");
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
