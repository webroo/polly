import { notFound } from 'next/navigation';
import { getPoll } from '@/services/poll';
import PollForm from '../../new/PollForm';

interface EditPollPageProps {
  params: { pollId: string };
}

export default async function EditPollPage({ params }: EditPollPageProps) {
  const poll = await getPoll(params.pollId);

  if (!poll) {
    notFound();
  }

  return (
    <main>
      <PollForm existingPoll={poll} />
    </main>
  );
}
