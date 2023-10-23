import { getPoll } from '@/services/polls';
import PollTable from './PollTable';

export default async function PollPage({
  params,
}: {
  params: { pollId: string };
}) {
  const poll = await getPoll(params.pollId);

  if (!poll) {
    // TODO redirect to 404 page
    throw new Error('Poll not found');
  }

  return (
    <main>
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      <PollTable poll={poll} />
    </main>
  );
}
