import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Optional: Add if you want global styles (create globals.css next if needed)

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Miami Permit Generator',
  description: 'AI-powered PDF permit generator for Miami-Dade',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
