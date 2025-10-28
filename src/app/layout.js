import Navbar from "@/components/organisms/Navbar";
import "./globals.css";
import FooterSection from "@/components/organisms/Footer";
import { CartProvider } from "@/context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <FooterSection />
        </CartProvider>
      </body>
    </html>
  );
}
