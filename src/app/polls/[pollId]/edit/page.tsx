import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
    title: `Polly: ${poll?.title}`,
  };
}

export default async function EditPollPage({ params }: EditPollPageProps) {
  const poll = await getPoll(params.pollId);

  if (!poll) {
    notFound();
  }

  return (
    <>
      <h1 className="mb-5">Edit your poll</h1>
      <PollForm editPoll={poll} />
    </>
  );
}
