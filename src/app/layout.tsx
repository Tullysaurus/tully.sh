import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tully.sh",
  description: "tully.sh is a portfolio and project listing with tutorials for various tasks.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/x-icon" sizes="16x16" href="/icons/favicon-16x16.png" />
        </head>
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
