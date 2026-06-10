import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./home/Navbar";
import BottomTabNav from "./home/BottomTabNav";
import Footer from "./home/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ChatWidget from "@/components/ChatWidget";
import { Toaster } from "sonner";
import Script from "next/script";

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
  title: {
    default: "Ahmed Abdelgwad — Frontend & React Developer",
    template: "%s | Ahmed Abdelgwad",
  },
  description: "Ahmed Abdelgwad is a Frontend & React specialist with 2+ years experience building high-performance web apps using Next.js, TypeScript & Tailwind CSS. Available for freelance projects.",
  authors: [{ name: "Ahmed Abdelgwad", url: "https://ahmed-abdelgwad.vercel.app" }],
  creator: "Ahmed Abdelgwad",
  publisher: "Ahmed Abdelgwad",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/my.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/my.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
    apple: "/my.jpg",
  },
  openGraph: {
    title: "Ahmed Abdelgwad — Frontend & React Developer",
    description: "Building high-performance, visually stunning web applications. Available for freelance projects.",
    url: "https://ahmed-abdelgwad.vercel.app",
    siteName: "Ahmed Abdelgwad",
    images: [
      {
        url: "/my.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmed Abdelgwad - Frontend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Abdelgwad — Frontend & React Developer",
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
        <BottomTabNav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <ChatWidget />
        <Toaster position="top-center" richColors closeButton />
        {/* Microsoft Clarity Analytics */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "x4v7v3a0dq");`}
        </Script>
        {/* JSON-LD Structured Data — helps Google & AI understand who Ahmed is */}
        <Script id="json-ld-person" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ahmed Abdelgwad",
            "alternateName": "أحمد عبد الجواد",
            "url": "https://ahmed-abdelgwad.vercel.app",
            "image": "https://ahmed-abdelgwad.vercel.app/my.jpg",
            "jobTitle": "Frontend & React Developer",
            "description": "Professional web developer specializing in React.js, Next.js, and TypeScript. Building high-performance, visually stunning web applications with 2+ years of experience.",
            "email": "aa1019914@gmail.com",
            "telephone": "+201201302871",
            "nationality": "Egyptian",
            "knowsAbout": [
              "React.js", "Next.js", "TypeScript", "Tailwind CSS",
              "Node.js", "MongoDB", "Prisma", "Framer Motion",
              "SEO Optimization", "Web Performance", "SaaS Development",
              "E-commerce Development", "UI/UX Design"
            ],
            "sameAs": [
              "https://www.linkedin.com/in/ahmed-abd-elgwad",
              "https://github.com/AhmedAbdElgwadHassen19",
              "https://khamsat.com/programming/custom-website-development/4251679"
            ],
            "offers": {
              "@type": "Offer",
              "description": "Freelance web development services including e-commerce, SaaS, landing pages, real estate portals, and e-learning platforms.",
              "url": "https://ahmed-abdelgwad.vercel.app/services"
            }
          })}
        </Script>
      </body>
    </html>
  );
}