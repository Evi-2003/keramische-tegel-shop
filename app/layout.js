import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import CartProvider from "./components/providers";
import { GeistSans, GeistMono } from "geist/font";


export default function RootLayout({ children }) {
  
  return (
    <html lang="nl-NL">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={
          GeistSans.className +
          " bg-white dark:bg-dark-bg flex flex-col items-center justify-center"
        }
      >
                  
        <CartProvider mode="payment" currency="EUR">
          <Header />
            <main className="bg-white dark:bg-dark-bg flex w-full justify-center">
              {children}
              
            </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
