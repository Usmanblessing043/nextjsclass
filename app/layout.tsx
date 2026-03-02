
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Toaster} from 'react-hot-toast'
import ApolloProvider from "@/shared/lib/provider/ApolloProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js App Router Example",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ApolloProvider>
          {children} 
        </ApolloProvider>

        <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(0,0,0,0.9)",
            color: "#fff",
            borderRadius: "0.75rem",
            padding: "0.75rem 1.25rem",
            fontSize: "1rem",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            pointerEvents: "none"
          },
           
        }}
      />
      </body>
    </html>
  );
}