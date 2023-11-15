import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import CartProvider from "./components/providers";
import { GeistSans, GeistMono } from 'geist/font'


export default function RootLayout({ children }) {
  return (
    <html lang="nl-NL">
        <body className={GeistSans.className + "bg-white dark:bg-slate-950 flex flex-col items-center"}>
        <CartProvider
        mode="payment"
        currency="EUR"
      >
          <Header />
          {children}
      
          </CartProvider>
        </body>

    </html>
  );
}
