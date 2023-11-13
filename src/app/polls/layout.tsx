import { ParrotIcon } from '@/components/Icons';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">{children}</div>
      <div className="self-center pt-14 pb-2">
        <a href="/">
          <ParrotIcon size={64} />
        </a>
      </div>
    </div>
  );
}
