import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getPoll } from '@/services/poll';
import PollTable from '@/components/PollTable';
import PollControls from '@/components/PollControls';
import PollTitle from '@/components/PollTitle';

interface EditParticipantPageProps {
  params: { pollId: string; participantId: string };
}

export async function generateMetadata({
  params,
}: EditParticipantPageProps): Promise<Metadata> {
  const poll = await getPoll(params.pollId);
  return {
    title: poll?.title,
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
    <main>
      <PollTitle title={poll.title} description={poll.description} />
      <PollTable poll={poll} editParticipant={editParticipant} />
      <PollControls poll={poll} />
    </main>
  );
}
