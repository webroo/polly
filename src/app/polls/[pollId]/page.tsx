import { notFound } from 'next/navigation';
import { getPoll } from '@/services/polls';
import PollTable from './PollTable';

export default async function PollPage({
  params,
}: {
  params: { pollId: string };
}) {
  const poll = await getPoll(params.pollId);

  if (!poll) {
    notFound();
  }

  return (
    <main>
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      <PollTable poll={poll} />
    </main>
  );
}
