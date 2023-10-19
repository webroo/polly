import { AddPoll } from './AddPoll';
import { getPolls } from '@/services/polls';

export default async function Home() {
  const polls = await getPolls();

  return (
    <main>
      <h1>Polls:</h1>
      <ul>
        {polls.map(poll => (
          <li key={poll._id.toString()}>{JSON.stringify(poll)}</li>
        ))}
      </ul>
      <AddPoll />
    </main>
  );
}
