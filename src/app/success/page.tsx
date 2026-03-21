import { redirect } from "next/navigation";
import { validateDownloadToken } from "@/lib/tokens";
import { SuccessContent } from "./success-content";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/");
  }

  const result = validateDownloadToken(token);
  if (!result.valid) {
    redirect("/");
  }

  const downloadUrl = `/api/download?token=${token}`;

  return <SuccessContent downloadUrl={downloadUrl} />;
}
