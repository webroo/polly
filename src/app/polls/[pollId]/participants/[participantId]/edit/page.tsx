import { Metadata } from 'next';
import Link from 'next/link';
import clsx from 'clsx';
import { notFound } from 'next/navigation';
import { getPoll } from '@/services/poll';
import PollTable from '@/components/PollTable';
import Footer from '@/components/Footer';

interface EditParticipantPageProps {
  params: { pollId: string; participantId: string };
}

export async function generateMetadata({
  params,
}: EditParticipantPageProps): Promise<Metadata> {
  const poll = await getPoll(params.pollId);
  return {
    title: `Polly: ${poll?.title}`,
  };
}

export default async function EditParticipantPage({
  params,
}: EditParticipantPageProps) {
  const poll = await getPoll(params.pollId);

  if (!poll) {
    notFound();
  }

  const editParticipant = poll.participants.find(
    participant => participant.id === params.participantId,
  );

  if (!editParticipant) {
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
        <h1 className="">{poll.title}</h1>
        <div>
          <Link href={`/polls/${poll.id}/edit`} className="btn">
            Edit this poll
          </Link>
        </div>
      </div>
      {poll.description && <h2 className="ml-0.5 mb-8">{poll.description}</h2>}
      <PollTable poll={poll} editParticipant={editParticipant} />
      <Footer poll={poll} />
    </>
  );
}
