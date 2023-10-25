import { getPolls } from '@/services/poll';
import Link from 'next/link';

export default async function Polls() {
  const polls = await getPolls();

  return (
    <main>
      <ul>
        {polls.map(poll => (
          <li key={poll.id}>
            <Link href={`/polls/${poll.id}`}>{poll.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        <Link href="/polls/new">Add poll</Link>
      </div>
    </main>
  );
}
