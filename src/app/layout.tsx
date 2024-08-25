import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import Footer from "@/components/Footer";
import NavBar from "@/components/nav/NavBar";
import ContextProviders from "@/contexts";
import { noto_sans_kr } from "@/constants/next-font";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "방통대 강의 후기는 노우강!",
  description: "한국방송통신대학교 강의의 수강 리뷰를 한눈에 볼 수 있는 사이트입니다.",
  openGraph: {
    title: "방통대 강의 후기는 노우강!",
    siteName: "노우강",
    description: "한국방송통신대학교 강의의 수강 리뷰를 한눈에 볼 수 있는 사이트입니다.",
    locale: "ko_KR",
    url: "https://knouk.vercel.app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={noto_sans_kr.className}>
        <InitColorSchemeScript defaultMode="system" />
        <ContextProviders>
          <NavBar />
          <main className="grid place-content-center min-h-[calc(100dvh-12rem)] sm:min-h-[calc(100dvh-20rem)]">
            {children}
          </main>
          <Footer />
        </ContextProviders>
      </body>
    </html>
  );
}
