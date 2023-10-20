import { getPoll } from '@/services/polls';
import PollTable from './PollTable';

export default async function Poll({ params }: { params: { id: string } }) {
  const poll = await getPoll(params.id);

  if (!poll) {
    // TODO redirect to 404 page
    throw new Error('Poll not found');
  }

  return (
    <main>
      <h1>{poll.name}</h1>
      <p>{poll.description}</p>
      <PollTable poll={poll} />
    </main>
  );
}
