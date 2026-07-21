import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/index.css";

const neueMontreal = localFont({
  src: [
    {
      path: "../public/assets/fonts/NeueMontreal-Light.otf",
      weight: "300",
    },
    {
      path: "../public/assets/fonts/NeueMontreal-Regular.otf",
      weight: "400",
    },
    {
      path: "../public/assets/fonts/NeueMontreal-Medium.otf",
      weight: "500",
    },
    {
      path: "../public/assets/fonts/NeueMontreal-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-neue",
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
      <body className={neueMontreal.variable}>
        {children}
      </body>
    </html>
  );
}