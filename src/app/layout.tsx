import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veterans Tribute Banner Program",
  description:
    "Organization-led Hometown Heroes and Veterans Tribute Banner programs for towns, American Legion posts, VFWs, and community groups."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
