import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Monk font - using a similar bold sans-serif font
const monk = Inter({
  variable: "--font-monk",
  subsets: ["latin"],
  weight: ["900"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "abdirahman — Software Engineer & Entrepreneur",
  description: "I'm a 20 y/o self-taught aspiring entrepreneur and software engineer from Somalia 🇸🇴. Passionate about creating digital experiences and building innovative solutions.",
  keywords: ["abdirahman", "software engineer", "entrepreneur", "somalia", "developer", "portfolio", "web development", "AI enthusiast"],
  authors: [{ name: "abdirahman" }],
  creator: "abdirahman",
  publisher: "abdirahman",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abdirahman.vercel.app',
    title: 'abdirahman — Software Engineer & Entrepreneur',
    description: 'I\'m a 20 y/o self-taught aspiring entrepreneur and software engineer from Somalia 🇸🇴. Passionate about creating digital experiences and building innovative solutions.',
    siteName: 'abdirahman portfolio',
    images: [
      {
        url: '/images/user.jpg',
        width: 1200,
        height: 630,
        alt: 'abdirahman - Software Engineer & Entrepreneur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'abdirahman — Software Engineer & Entrepreneur',
    description: 'I\'m a 20 y/o self-taught aspiring entrepreneur and software engineer from Somalia 🇸🇴. Passionate about creating digital experiences and building innovative solutions.',
    images: ['/images/user.jpg'],
    creator: '@abdirahmanxyz',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ff4500' },
    { media: '(prefers-color-scheme: dark)', color: '#ff4500' },
  ],
  icons: {
    icon: [
      { url: '/favicon.jpg', sizes: '32x32' },
      { url: '/favicon.jpg', sizes: '16x16' }
    ],
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg',
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
        className={`${inter.variable} ${poppins.variable} ${monk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
