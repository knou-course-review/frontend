import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/contexts/auth/AuthContextProvider";

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
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <NavBar />
          <main className="grid place-content-center min-h-[calc(100dvh-20rem)]">{children}</main>
        </AuthContextProvider>
        <Footer />
      </body>
    </html>
  );
}
