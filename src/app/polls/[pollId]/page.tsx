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
    <>
      <div className="flex items-center justify-between mb-5">
        <h1 className="">{poll.title}</h1>
        <div>
          <a href={`/polls/${poll.id}/edit`}>Edit this poll</a>
        </div>
      </div>
      <p className="mb-6">{poll.description}</p>
      <PollTable poll={poll} />
    </>
  );
}
