import { getPolls } from '@/services/polls';
import Link from 'next/link';

export default async function Polls() {
  const polls = await getPolls();

  return (
    <main>
      <ul>
        {polls.map(poll => (
          <li key={poll._id.toString()}>
            <Link href={`/polls/${poll._id}`}>{JSON.stringify(poll)}</Link>
          </li>
        ))}
      </ul>
      <div>
        <Link href="/polls/new">Add poll</Link>
      </div>
    </main>
  );
}
