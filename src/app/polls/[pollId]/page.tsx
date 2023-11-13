import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import clsx from 'clsx';
import { getPoll } from '@/services/poll';
import PollTable from '@/components/PollTable';
import PollControls from '@/components/PollControls';

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
      <div className="text-center">
        <h1 className={clsx(poll.description ? 'mb-5' : 'mb-10')}>
          {poll.title}
        </h1>
        {poll.description && (
          <h2 className=" ml-0.5 mb-8">{poll.description}</h2>
        )}
      </div>
      <PollTable poll={poll} />
      <PollControls poll={poll} />
    </main>
  );
}
