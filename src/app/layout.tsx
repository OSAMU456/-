import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "美丽预约 - Fukuoka Beauty Salon Booking",
  description: "Professional beauty salon booking platform for Chinese tourists in Fukuoka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
