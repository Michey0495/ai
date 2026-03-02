import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeedbackWidget } from "@/components/FeedbackWidget";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai.ezoai.jp"),
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

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${geist.className} bg-slate-50 min-h-screen flex flex-col`}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FeedbackWidget repoName="ai" />
      </body>
    </html>
  );
}
