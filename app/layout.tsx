import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import GlobalScrollBackground from "@/components/GlobalScrollBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bunquintheodore.github.io"),
  title: {
    default: "Theodore Bunquin | Full Stack Developer & Data Analyst",
    template: "%s | Theodore Bunquin",
  },
  description:
    "Professional portfolio of Theodore Bunquin, a full stack developer and aspiring data analyst in the Philippines, open for internships, commissions, and client work.",
  keywords: [
    "Theodore Bunquin",
    "full stack developer",
    "data analyst",
    "portfolio",
    "Philippines developer",
    "internship",
    "Flutter",
    "Next.js",
    "Laravel",
  ],
  openGraph: {
    title: "Theodore Bunquin | Full Stack Developer & Data Analyst",
    description:
      "Turning ideas into solutions, building tech that matters, and transforming vision into lasting impact.",
    url: "https://bunquintheodore.github.io",
    siteName: "Theodore Portfolio",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Theodore Bunquin portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Theodore Bunquin | Full Stack Developer & Data Analyst",
    description:
      "Portfolio showcasing projects, services, and internship-ready experience in full stack development and data analysis.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <GlobalScrollBackground />
          <div className="relative z-10">{children}</div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
