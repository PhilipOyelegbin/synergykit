import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientProviders from "./_components/Provider";
import "./globals.css";

const interSans = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SynergyKit - Your Essential Utilities",
  description:
    "A modern landing page for SynergyKit, a utility application featuring a secure token generator and an intuitive note-taking system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} antialiased bg-[#f9fafb]`}
        suppressHydrationWarning
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
