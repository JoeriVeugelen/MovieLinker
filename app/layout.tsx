import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "MovieLinker",
  description: "Find movies similar to your favorites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="overflow-y-scroll" lang="en">
      <body className="bg-[#050505] max-w-7xl mx-auto">
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
