import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPoll } from '@/services/poll';
import PollTable from '@/components/PollTable';
import PollControls from '@/components/PollControls';
import PollTitle from '@/components/PollTitle';

interface PollPageProps {
  params: { pollId: string };
}

export async function generateMetadata({
  params,
}: PollPageProps): Promise<Metadata> {
  const poll = await getPoll(params.pollId);
  return {
    title: `Polly: ${poll?.title}`,
  };
}

export default async function PollPage({ params }: PollPageProps) {
  const poll = await getPoll(params.pollId);

  if (!poll) {
    notFound();
  }

  return (
    <main>
      <PollTitle title={poll.title} description={poll.description} />
      <PollTable poll={poll} />
      <PollControls poll={poll} />
    </main>
  );
}
