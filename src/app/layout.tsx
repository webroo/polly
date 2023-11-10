import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
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
      <body className={clsx(inter.className, 'flex flex-col h-full')}>
        <main className="flex flex-col flex-1 w-full max-w-6xl min-w-[58rem] mx-auto p-6 pt-8">
          {children}
        </main>
        <footer className="flex flex-col items-center mx-auto p-6 text-xs">
          <Image
            src="/parrot.png"
            alt="Cartoon character of a happy-looking green parrot smiling and waving a wing."
            width={64}
            height={64}
            className="mb-2"
          />
          <div>
            Polly created by <a href="https://github.com/webroo/">webroo</a>
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
