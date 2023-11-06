import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Polly',
  description:
    'Polly helps you schedule events with your friends and colleagues.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-6xl min-w-[58rem] mx-auto p-10">{children}</main>
      </body>
    </html>
  );
}
