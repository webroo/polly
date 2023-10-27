import { notFound } from 'next/navigation';
import { getPoll } from '@/services/poll';
import PollTable from '../../../PollTable';

interface EditParticipantPageProps {
  params: { pollId: string; participantId: string };
}

export default async function EditParticipantPage({
  params,
}: EditParticipantPageProps) {
  const poll = await getPoll(params.pollId);

  if (!poll) {
    notFound();
  }

  const existingParticipant = poll.participants.find(
    participant => participant.id === params.participantId,
  );

  if (!existingParticipant) {
    notFound();
  }

  return (
    <main>
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      <a href={`/polls/${poll.id}/edit`}>Edit this poll</a>
      <PollTable poll={poll} existingParticipant={existingParticipant} />
    </main>
  );
}
