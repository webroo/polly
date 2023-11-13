import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import clsx from 'clsx';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Polly',
  description: 'Polly helps you schedule events with your friends.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={clsx(
          inter.className,
          'flex flex-col h-full max-w-6xl min-w-[58rem] mx-auto',
        )}
      >
        <div className="flex flex-col flex-1 px-6 pt-8 pb-0">{children}</div>
        <footer className="text-xs text-center pb-6">
          <div>
            Created by <a href="https://github.com/webroo/">webroo</a>
          </div>
          <div>
            <a href="https://www.flaticon.com/free-icons/parrot">
              Parrot icon by Freepik - Flaticon
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
