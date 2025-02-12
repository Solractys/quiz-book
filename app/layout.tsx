import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

export const metadata: Metadata = {
  title: "Who Wrote Me",
  description: "A quiz book for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="light" lang="pt-BR">
      <body>{children}
      <Analytics/>
      </body>
    </html>
  );
}
