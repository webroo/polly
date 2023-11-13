import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getPoll } from '@/services/poll';
import PollForm from '@/components/PollForm';

interface EditPollPageProps {
  params: { pollId: string };
}

export async function generateMetadata({
  params,
}: EditPollPageProps): Promise<Metadata> {
  const poll = await getPoll(params.pollId);
  return {
    title: `${poll?.title} - Edit`,
  };
}

export default async function EditPollPage({ params }: EditPollPageProps) {
  const poll = await getPoll(params.pollId);

  if (!poll) {
    notFound();
  }

  if (poll.closed) {
    redirect(`/polls/${poll.id}`);
  }

  return (
    <main>
      <h1 className="mb-5">Edit your poll</h1>
      <PollForm editPoll={poll} />
    </main>
  );
}
