import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

// 1. إعداد الخطوط - ربطنا Jakarta بمتغير --font-geist-sans عشان يقرأ من globals.css اللي عندك
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmed-abdelgwad.vercel.app"),
  title: "Ahmed - Web Developer",
  description: "أحمد عبد الجواد - مطور ويب متخصص في بناء واجهات أمامية احترافية باستخدام React و Next.js. خبير في تصميم تجارب مستخدم فخمة وأداء عالي. Crafting high-performance, visually stunning web experiences.",
  keywords: [
    "Ahmed Abdelgwad", "أحمد عبد الجواد",
    "Web Developer", "مطور واجهات أمامية",
    "Creative Developer", "مطور ويب مبدع",
    "React Specialist", "خبير رياكت",
    "Next.js Expert", "خبير نكست جي إس",
    "UI/UX Designer", "مصمم واجهات مستخدم",
    "Full Stack Development", "تطوير ويب متكامل",
    "Software Engineer Portfolio", "معرض أعمال مهندس برمجيات",
    "Modern Web Design", "تصميم ويب حديث",
    "SaaS Builder", "بناء تطبيقات سحابية",
    "SEO Expert", "تحسين محركات البحث",
    "Web Performance", "أداء المواقع",
    "مترجم برمجيات", "Freelance Developer Egypt", "مطور فريلانس"
  ],
  icons: {
    icon: [
      { url: "/my.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/my.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
    apple: "/my.jpg",
  },
  openGraph: {
    title: "Eng/Ahmed - Web Developer",
    description: "Explore the portfolio of Ahmed Abdelgwad, a frontend engineer dedicated to building premium digital products.",
    url: "https://ahmed-abdelgwad.vercel.app",
    siteName: "Ahmed Abdelgwad",
    images: [
      {
        url: "/my.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmed Abdelgwad - Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Abdelgwad — Digital Architect",
    description: "Frontend Engineer & UI Specialist building the future of the web.",
    images: ["/my.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${geistMono.variable} antialiased`}
    >
      <body className="relative min-h-screen flex flex-col font-sans bg-zinc-950 text-zinc-50">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}