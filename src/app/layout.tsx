import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "14 Chair",
  description: "Furniture e-commerce site",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return children;
}