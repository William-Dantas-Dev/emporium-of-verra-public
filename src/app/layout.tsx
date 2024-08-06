import NextAuthSessionProvider from '@/providers/sessionProvider';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emporium Of Verra",
  description: "Emporium Of Verra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body><NextAuthSessionProvider>{children}</NextAuthSessionProvider></body>
    </html>
  );
}
