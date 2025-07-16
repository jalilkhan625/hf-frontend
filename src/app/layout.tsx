import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { Analytics } from "@vercel/analytics/react"; // Import Analytics

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OCR Summarizer",
  description: "Extract and summarize text from images using AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Analytics /> {/* ✅ Add this just before closing body */}
      </body>
    </html>
  );
}
