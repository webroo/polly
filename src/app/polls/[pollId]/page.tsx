import { Metadata } from 'next';
import clsx from 'clsx';
import { notFound } from 'next/navigation';
import { getPoll } from '@/services/poll';
import PollTable from '@/components/PollTable';
import Footer from '@/components/Footer';

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
    <>
      <div
        className={clsx(
          'flex items-start justify-between gap-3',
          poll.description ? 'mb-5' : 'mb-10',
        )}
      >
        <h1>{poll.title}</h1>
      </div>
      {poll.description && <h2 className="ml-0.5 mb-8">{poll.description}</h2>}
      <PollTable poll={poll} />
      <Footer poll={poll} />
    </>
  );
}
