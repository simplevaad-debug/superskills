import crypto from "crypto";

let _secret: string | null = null;

function getSecret(): string {
  if (!_secret) {
    const secret = process.env.DOWNLOAD_SECRET;
    if (!secret || secret.length < 32) {
      throw new Error("DOWNLOAD_SECRET must be at least 32 characters");
    }
    _secret = secret;
  }
  return _secret;
}

export function generateDownloadToken(sessionId: string): string {
  const expiry = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
  const data = `${sessionId}:${expiry}`;
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(data)
    .digest("hex");
  const token = Buffer.from(`${data}:${signature}`).toString("base64url");
  return token;
}

export function validateDownloadToken(token: string): {
  valid: boolean;
  sessionId?: string;
} {
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const lastColon = decoded.lastIndexOf(":");
    if (lastColon === -1) return { valid: false };
    const signature = decoded.slice(lastColon + 1);
    const rest = decoded.slice(0, lastColon);
    const secondLastColon = rest.lastIndexOf(":");
    if (secondLastColon === -1) return { valid: false };
    const expiryStr = rest.slice(secondLastColon + 1);
    const sessionId = rest.slice(0, secondLastColon);
    const expiry = parseInt(expiryStr, 10);

    if (Date.now() > expiry) {
      return { valid: false };
    }

    const expectedSignature = crypto
      .createHmac("sha256", getSecret())
      .update(`${sessionId}:${expiryStr}`)
      .digest("hex");

    const sigBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");

    if (
      sigBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      return { valid: false };
    }

    return { valid: true, sessionId };
  } catch {
    return { valid: false };
  }
}
