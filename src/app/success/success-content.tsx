"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { analytics } from "@/lib/analytics";
import { CheckCircle, Download, ArrowRight } from "lucide-react";

export function SuccessContent({ downloadUrl }: { downloadUrl: string }) {
  useEffect(() => { analytics.purchaseComplete(); }, []);

  // Auto-download on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = downloadUrl;
    }, 1500);
    return () => clearTimeout(timer);
  }, [downloadUrl]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center px-6">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <CheckCircle className="w-16 h-16 text-[#3fb950] mx-auto mb-6" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-3">
          Payment successful!
        </h1>
        <p className="text-[#a1a1aa] mb-8">
          Thank you for purchasing SuperSkills. Your download is ready.
        </p>

        <a
          href={downloadUrl}
          onClick={() => analytics.downloadClick()}
          className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors mb-6 cursor-pointer"
        >
          <Download className="w-5 h-5" />
          Download SuperSkills.zip
        </a>

        <div className="bg-[#141415] border border-[#27272a] rounded-xl p-4 text-left mt-8">
          <p className="text-sm text-[#71717a] mb-2 font-medium">Installation:</p>
          <div className="font-mono text-sm space-y-1">
            <p className="text-[#c9d1d9]">
              <span className="text-[#3fb950]">$</span> unzip superskills.zip -d ~/.claude/skills/
            </p>
            <p className="text-[#c9d1d9]">
              <span className="text-[#3fb950]">$</span> # Restart Claude Code
            </p>
            <p className="text-[#3fb950]">106 skills installed!</p>
          </div>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#52525b] hover:text-[#a1a1aa] mt-8 transition-colors cursor-pointer"
        >
          Back to homepage
          <ArrowRight className="w-3 h-3" />
        </a>

        <p className="text-xs text-[#3f3f46] mt-6">
          Download link expires in 2 hours. Save your ZIP file.
        </p>
      </motion.div>
    </div>
  );
}
