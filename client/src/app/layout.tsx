import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./animations.css"; // Make sure this is imported
import { ThemeProvider } from "@/components/theme-provider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Chatbot",
  description: "An intelligent AI chatbot built with Next.js and Shadcn UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* This ensures animations.css is properly loaded */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
