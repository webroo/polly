import { Metadata } from 'next';
import Link from 'next/link';
import clsx from 'clsx';
import { notFound, redirect } from 'next/navigation';
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

  if (poll.closed) {
    redirect(`/polls/${poll.id}`);
  }

  const editParticipant = poll.participants.find(
    participant => participant.id === params.participantId,
  );

  if (!editParticipant) {
    notFound();
  }

  return (
    <>
      <div className="text-center">
        <h1 className={clsx(poll.description ? 'mb-5' : 'mb-10')}>
          {poll.title}
        </h1>
        {poll.description && (
          <h2 className=" ml-0.5 mb-8">{poll.description}</h2>
        )}
      </div>
      <PollTable poll={poll} editParticipant={editParticipant} />
      <Footer poll={poll} />
    </>
  );
}
