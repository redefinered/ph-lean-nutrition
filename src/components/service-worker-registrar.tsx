"use client";

import { useEffect } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register(`${basePath}/sw.js`, {
        scope: `${basePath}/`,
        updateViaCache: "none",
      })
      .catch(() => {
        // Offline support is optional; the plan still renders without it.
      });
  }, []);

  return null;
}
