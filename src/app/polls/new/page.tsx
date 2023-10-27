import { getPoll } from '@/services/poll';
import PollForm from './PollForm';
import { notFound } from 'next/navigation';

interface PollPageProps {
  searchParams: { poll: string };
}

export default async function NewPollPage({ searchParams }: PollPageProps) {
  const poll = searchParams.poll
    ? (await getPoll(searchParams.poll)) ?? undefined
    : undefined;

  if (searchParams.poll && !poll) {
    notFound();
  }

  return (
    <main>
      <PollForm existingPoll={poll} />
    </main>
  );
}
