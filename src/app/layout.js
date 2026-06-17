import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata = {
  title: "SoleVibe | Premium Sneakers & High-Performance Shoes",
  description: "Shop premium Nike, Adidas, and Puma sneakers at SoleVibe. Discover futuristic designs, elite running models, and comfortable casual wear with seamless, direct WhatsApp checkout.",
  keywords: "shoes, sneakers, Nike, Adidas, Puma, running shoes, sports shoes, casual shoes, premium footwear, WhatsApp shop",
  openGraph: {
    title: "SoleVibe | Premium Sneakers Shop",
    description: "Shop premium Nike, Adidas, and Puma sneakers at SoleVibe. Secure checkout via WhatsApp.",
    type: "website",
    locale: "en_US",
    siteName: "SoleVibe"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <CartProvider>
          {/* Global Sticky Navbar */}
          <Navbar />
          
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          
          {/* Global Support Widget */}
          <FloatingWhatsApp />
          
          {/* Global Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
