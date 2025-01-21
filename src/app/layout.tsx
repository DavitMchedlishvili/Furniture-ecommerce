import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Jorko",
  description: "Furniture e-commerce site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider defaultTheme="system" enableSystem attribute="class">
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
