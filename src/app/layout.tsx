import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";

export const metadata: Metadata = {
  title: "shipping form",
  description: "shipping form made with create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mainContainer">
        <AntdRegistry>{children}</AntdRegistry>
        </div>
      </body>
    </html>
  );
}
