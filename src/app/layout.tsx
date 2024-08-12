import { Inter } from "next/font/google";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ContextProviders from "@/contexts";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KNOU",
  description: "한국방송통신대학교 강의 후기를 한눈에 볼 수 있는 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <InitColorSchemeScript defaultMode="system" />
        <ContextProviders>
          <NavBar />
          <main className="grid place-content-center min-h-[calc(100dvh-20rem)]">{children}</main>
          <Footer />
        </ContextProviders>
      </body>
    </html>
  );
}
