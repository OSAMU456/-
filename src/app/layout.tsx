import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "美丽预约 - Beauty Appointment Portal",
  description: "专为访日・在日中国人打造的美容室检索・预约门户网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
