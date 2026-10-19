import type { MetadataRoute } from "next";

// basePath is applied to framework-generated URLs but not to the strings we
// put inside the manifest, so every path here is prefixed by hand.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: `${basePath}/`,
    name: "6-day lean recomposition meal plan",
    short_name: "Meal Plan",
    description:
      "Mon–Sat Filipino meals for a 39-year-old, 51–53 kg male (Sunday cheat day): maintain weight, hit 80–95 g protein, stay lean without bulk.",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    categories: ["health", "food", "lifestyle"],
    icons: [
      {
        src: `${basePath}/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-maskable-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: `${basePath}/icons/icon-maskable-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
