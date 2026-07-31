import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/index.css";

<<<<<<< HEAD
import { AuthProvider } from "@/features/auth/context";

=======
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
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
<<<<<<< HEAD
        <AuthProvider>{children}</AuthProvider>
=======
        {children}
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
      </body>
    </html>
  );
}