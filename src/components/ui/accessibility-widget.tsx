"use client";

import { useState, useEffect, useCallback } from "react";
import { Accessibility, X, ZoomIn, ZoomOut, Eye, Type, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface A11ySettings {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  largeLinks: boolean;
  focusHighlight: boolean;
}

const DEFAULT_SETTINGS: A11ySettings = {
  fontSize: 100,
  highContrast: false,
  reducedMotion: false,
  largeLinks: false,
  focusHighlight: false,
};

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const saved = localStorage.getItem("a11y-settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch { /* ignore */ }
    }
  }, []);

  const apply = useCallback((s: A11ySettings) => {
    const root = document.documentElement;

    // Font size
    root.style.fontSize = `${s.fontSize}%`;

    // High contrast
    root.classList.toggle("a11y-high-contrast", s.highContrast);

    // Reduced motion
    root.classList.toggle("a11y-reduced-motion", s.reducedMotion);

    // Large link/button targets
    root.classList.toggle("a11y-large-links", s.largeLinks);

    // Focus highlight
    root.classList.toggle("a11y-focus-highlight", s.focusHighlight);

    localStorage.setItem("a11y-settings", JSON.stringify(s));
  }, []);

  useEffect(() => {
    apply(settings);
  }, [settings, apply]);

  const update = (partial: Partial<A11ySettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const reset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 end-6 z-50 w-12 h-12 bg-[#D97757] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#c5673f] transition-colors cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#D97757]/50"
        aria-label="Open accessibility settings"
        title="Accessibility"
      >
        <Accessibility className="w-5 h-5" />
      </button>

      {/* Panel */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/60"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Accessibility settings"
            className="fixed bottom-0 end-0 z-50 w-full sm:w-[380px] sm:bottom-6 sm:end-6 bg-[#141415] border border-[#27272a] rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#27272a]">
              <div className="flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-[#D97757]" />
                <h2 className="text-base font-semibold text-white">Accessibility</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#71717a] hover:text-white transition-colors cursor-pointer p-1 focus:outline-none focus:ring-2 focus:ring-[#D97757] rounded"
                aria-label="Close accessibility panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Controls */}
            <div className="p-5 space-y-5">
              {/* Font size */}
              <div>
                <label className="text-sm text-[#a1a1aa] mb-2 flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Font Size: {settings.fontSize}%
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => update({ fontSize: Math.max(80, settings.fontSize - 10) })}
                    className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center text-white hover:bg-[#3f3f46] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D97757]"
                    aria-label="Decrease font size"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <input
                    type="range"
                    min={80}
                    max={150}
                    step={10}
                    value={settings.fontSize}
                    onChange={(e) => update({ fontSize: Number(e.target.value) })}
                    className="flex-1 accent-[#D97757] h-2 cursor-pointer"
                    aria-label="Font size slider"
                  />
                  <button
                    onClick={() => update({ fontSize: Math.min(150, settings.fontSize + 10) })}
                    className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center text-white hover:bg-[#3f3f46] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D97757]"
                    aria-label="Increase font size"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Toggle controls */}
              <ToggleControl
                label="High Contrast"
                description="Increase text and border contrast"
                icon={<Eye className="w-4 h-4" />}
                checked={settings.highContrast}
                onChange={(v) => update({ highContrast: v })}
              />

              <ToggleControl
                label="Reduce Motion"
                description="Disable all animations"
                icon={<MousePointer2 className="w-4 h-4" />}
                checked={settings.reducedMotion}
                onChange={(v) => update({ reducedMotion: v })}
              />

              <ToggleControl
                label="Larger Touch Targets"
                description="Increase button and link sizes"
                icon={<MousePointer2 className="w-4 h-4" />}
                checked={settings.largeLinks}
                onChange={(v) => update({ largeLinks: v })}
              />

              <ToggleControl
                label="Focus Highlight"
                description="Strong visible focus indicators"
                icon={<Eye className="w-4 h-4" />}
                checked={settings.focusHighlight}
                onChange={(v) => update({ focusHighlight: v })}
              />

              {/* Reset */}
              <button
                onClick={reset}
                className="w-full py-2.5 text-sm text-[#a1a1aa] hover:text-white border border-[#27272a] rounded-lg hover:bg-[#27272a] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D97757]"
              >
                Reset to defaults
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function ToggleControl({
  label,
  description,
  icon,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer text-start focus:outline-none focus:ring-2 focus:ring-[#D97757]",
        checked
          ? "border-[#D97757]/40 bg-[#D97757]/10"
          : "border-[#27272a] hover:bg-[#1c1c1e]"
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
        checked ? "bg-[#D97757]/20 text-[#D97757]" : "bg-[#27272a] text-[#71717a]"
      )}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium", checked ? "text-white" : "text-[#a1a1aa]")}>
          {label}
        </p>
        <p className="text-xs text-[#52525b]">{description}</p>
      </div>
      <div className={cn(
        "w-10 h-6 rounded-full flex items-center transition-colors flex-shrink-0",
        checked ? "bg-[#D97757] justify-end" : "bg-[#27272a] justify-start"
      )}>
        <div className="w-4 h-4 rounded-full bg-white mx-1" />
      </div>
    </button>
  );
}
