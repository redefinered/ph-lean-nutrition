"use client";

import { useEffect, useState } from "react";
import { Share, SquarePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISSED_KEY = "ph-lean-install-dismissed";

function isAppleMobile() {
  // iPadOS reports itself as a Mac, so touch points are the only tell.
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function isInstalled() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function InstallPrompt() {
  const [mode, setMode] = useState<"hidden" | "ios" | "prompt">("hidden");
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);

  useEffect(() => {
    if (isInstalled()) return;
    if (window.localStorage.getItem(DISMISSED_KEY) === "1") return;

    if (isAppleMobile()) {
      setMode("ios");
      return;
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallEvent);
      setMode("prompt");
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () =>
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    const onInstalled = () => setMode("hidden");
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  function dismiss() {
    window.localStorage.setItem(DISMISSED_KEY, "1");
    setMode("hidden");
  }

  async function install() {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    setMode("hidden");
  }

  if (mode === "hidden") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
      <div className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Keep the plan on your phone</p>
          {mode === "ios" ? (
            <p className="mt-1 flex flex-wrap items-center gap-x-1 gap-y-0.5 text-xs text-muted-foreground">
              Tap
              <Share className="inline size-3.5" aria-label="the Share button" />
              in Safari, then
              <SquarePlus className="inline size-3.5" aria-hidden="true" />
              <span className="font-medium text-foreground">
                Add to Home Screen
              </span>
              .
            </p>
          ) : (
            <p className="mt-1 text-xs text-muted-foreground">
              Install it for a full-screen, offline-ready copy.
            </p>
          )}
        </div>
        {mode === "prompt" ? (
          <Button size="sm" onClick={install}>
            Install
          </Button>
        ) : null}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={dismiss}
          aria-label="Dismiss install tip"
        >
          <X />
        </Button>
      </div>
    </div>
  );
}
