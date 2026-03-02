import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIマシュマロ — AIが匿名質問に個性的に回答",
  description: "匿名で質問するとAIキャラクター「マシュ」が個性的に回答します。気軽に聞いてみてください！",
  openGraph: {
    title: "AIマシュマロ",
    description: "匿名で質問するとAIが個性的に回答します",
    siteName: "AIマシュマロ",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIマシュマロ",
    description: "匿名で質問するとAIが個性的に回答します",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${geist.className} bg-slate-50 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
