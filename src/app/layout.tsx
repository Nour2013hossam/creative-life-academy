import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creative Life Academy | أكاديميتك الرقمية",
  description:
    "منصة تعليمية لتطوير مهاراتك في البرمجة والذكاء الاصطناعي والأمن السيبراني والتصميم.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
