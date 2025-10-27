import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main Layout Component with Navbar
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
