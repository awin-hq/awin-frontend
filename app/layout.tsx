import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/index.css";

import { AuthProvider } from "@/features/auth/context";

const sfPro = localFont({
  src: [
    {
      path: "../public/assets/fonts/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWÍN",
  description: "Digital Credit Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sfPro.variable}>
        <AuthProvider>{children}</AuthProvider>
        {children}
      </body>
    </html>
  );
}