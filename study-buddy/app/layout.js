import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import  Script  from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flashcards",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <head>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9KZV5G632Q"></Script>
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || []
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-9KZV5G632Q');
`}
      </Script>
      </head>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
