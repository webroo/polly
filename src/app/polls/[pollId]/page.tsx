import { notFound } from 'next/navigation';
import { getPoll } from '@/services/poll';
import PollTable from './PollTable';

interface PollPageProps {
  params: { pollId: string };
  searchParams: { participant: string };
}

export default async function PollPage({
  params,
  searchParams,
}: PollPageProps) {
  const poll = await getPoll(params.pollId);

  if (!poll) {
    notFound();
  }

  if (
    searchParams.participant &&
    !poll.participants.some(({ id }) => id === searchParams.participant)
  ) {
    notFound();
  }

  return (
    <main>
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      <PollTable poll={poll} editParticipantId={searchParams.participant} />
    </main>
  );
}
