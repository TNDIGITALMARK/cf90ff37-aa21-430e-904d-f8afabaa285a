import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import PerformanceOptimizer from "@/components/performance/PerformanceOptimizer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Luxe Atelier - Premium Designer Clothing",
  description: "Discover curated elegance with our exclusive collection of luxury designer clothing, accessories, and haute couture. Experience personalized styling and exceptional craftsmanship.",
  keywords: "luxury fashion, designer clothing, haute couture, premium fashion, exclusive collections, luxury accessories",
  authors: [{ name: "Luxe Atelier" }],
  creator: "Luxe Atelier",
  publisher: "Luxe Atelier",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luxeatelier.com",
    title: "Luxe Atelier - Premium Designer Clothing",
    description: "Discover curated elegance with our exclusive collection of luxury designer clothing and accessories.",
    siteName: "Luxe Atelier",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Atelier - Premium Designer Clothing",
    description: "Discover curated elegance with our exclusive collection of luxury designer clothing and accessories.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-body antialiased`}>
        <script src="/phoenix-tracking.js" async></script>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <TooltipProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <CartDrawer />
              <PerformanceOptimizer />
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
