import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foodie FOMO",
  description: "Discover nearby restaurants, top specials, and the best place to eat next.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
