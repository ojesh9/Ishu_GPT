import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContexProvider } from "@/context/appcontex";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ishu-GPT",
  description: "Full Stack Project",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContexProvider>
        <html lang="en" className={inter.className}>
          <head />
          <body className="antialiased">{children}</body>
        </html>
      </AppContexProvider>
    </ClerkProvider>
  );
}
