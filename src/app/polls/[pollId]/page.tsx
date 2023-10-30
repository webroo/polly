import { notFound } from 'next/navigation';
import { getPoll } from '@/services/poll';
import PollTable from '@/components/PollTable';

interface PollPageProps {
  params: { pollId: string };
}

export default async function PollPage({ params }: PollPageProps) {
  const poll = await getPoll(params.pollId);

  if (!poll) {
    notFound();
  }

  return (
    <main>
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      <a href={`/polls/${poll.id}/edit`}>Edit this poll</a>
      <PollTable poll={poll} />
    </main>
  );
}
