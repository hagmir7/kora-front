import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import "@fontsource/alexandria"; 
import "@fontsource/alexandria/400.css";

export const metadata = {
  title: "Koratab - نتائج و جداول كرة القدم المباشرة",
  description: "Koratab هو موقعك الموثوق لمتابعة نتائج مباريات كرة القدم، جداول الدوري، الترتيب، الإحصائيات وأحدث الأخبار. احصل على تحديثات مباشرة لجميع الدوريات الكبرى.",
  keywords: [
    "koratab",
    "نتائج كرة القدم",
    "جدول الدوري",
    "ترتيب الفرق",
    "مواعيد المباريات",
    "إحصائيات كرة القدم",
    "أخبار كرة القدم",
    "Premier League جدول",
    "La Liga جدول",
    "Champions League نتائج"
  ],
  authors: [{ name: "Koratab Team", url: "https://koratab.com" }],
  openGraph: {
    title: "Koratab - نتائج و جداول كرة القدم المباشرة",
    description: "تابع نتائج مباريات كرة القدم المباشرة، جداول الدوري، ترتيب الفرق، والإحصائيات الحصرية على Koratab.",
    url: "https://koratab.com",
    siteName: "Koratab",
    images: [
      {
        url: "https://koratab.com/logo.png",
        width: 800,
        height: 600,
        alt: "Koratab Logo",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koratab - نتائج و جداول كرة القدم المباشرة",
    description: "تابع نتائج مباريات كرة القدم المباشرة، جداول الدوري، ترتيب الفرق، والإحصائيات الحصرية على Koratab.",
    images: ["https://koratab.com/logo.png"],
    site: "@koratab",
    creator: "@koratab",
  },
};



export default function RootLayout({ children }) {
  return (
    <html dir="rtl">
      <body
        className={`antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
