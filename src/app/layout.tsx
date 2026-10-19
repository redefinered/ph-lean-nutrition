import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { InstallPrompt } from "@/components/install-prompt";
import { ServiceWorkerRegistrar } from "@/components/service-worker-registrar";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "6-day lean recomposition meal plan",
  description:
    "Mon–Sat Filipino meals for a 39-year-old, 51–53 kg male (Sunday cheat day): maintain weight, hit 80–95 g protein, stay lean without bulk.",
  applicationName: "Meal Plan",
  appleWebApp: {
    capable: true,
    title: "Meal Plan",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  // Safari only honours the standardised `mobile-web-app-capable` from 16.4 on.
  other: { "apple-mobile-web-app-capable": "yes" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable} h-full antialiased`}
    >
      <body
        className={`${inter.className} flex min-h-full flex-col font-sans antialiased`}
      >
        {children}
        <InstallPrompt />
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
