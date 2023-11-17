import { ReactNode } from 'react';
import { ParrotIcon } from '@/components/Icons';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">{children}</div>
      <div className="relative self-center pt-14 pb-2">
        <div className="absolute whitespace-nowrap left-16">
          <div className="text-xs bg-gray-100 rounded-md px-2 py-1 rounded-bl-none">
            <a href="/">Want to create your own poll?</a>
          </div>
          <div className="absolute bottom-0 -left-2 w-2 h-2 bg-[radial-gradient(circle_at_top_left,transparent_0.5rem,rgb(243,244,246)_0.6rem)]"></div>
        </div>
        <a href="/">
          <ParrotIcon size={64} />
        </a>
      </div>
    </div>
  );
}
