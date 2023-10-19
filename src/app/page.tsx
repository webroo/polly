import Link from 'next/link';
import { getPolls } from '@/services/polls';

export default async function Home() {
  const polls = await getPolls();

  return (
    <main>
      <div>
        <Link href="/polls">View polls</Link>
      </div>
      <div>
        <Link href="/polls/new">Add poll</Link>
      </div>
    </main>
  );
}
