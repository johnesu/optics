import type { Metadata, Viewport } from "next";
import { ShopProvider } from "@/components/providers";
import { ScrollProgress } from "@/components/motion";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OPTICS — The verified vehicle marketplace",
    template: "%s · OPTICS",
  },
  description:
    "Buy, sell and finance new and used vehicles from verified dealers across Nigeria. Transparent pricing, inspected inventory, and every powertrain in one place.",
  applicationName: "OPTICS",
  openGraph: {
    type: "website",
    siteName: "OPTICS",
    title: "OPTICS — The verified vehicle marketplace",
    description:
      "Verified dealer inventory across Nigeria. Cars, SUVs, trucks, buses, machinery and electric vehicles in one clear marketplace.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <ShopProvider>
          <ScrollProgress />
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}
