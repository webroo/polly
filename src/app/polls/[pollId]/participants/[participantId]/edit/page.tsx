import { notFound } from 'next/navigation';
import { getPoll } from '@/services/poll';
import PollTable from '@/components/PollTable';

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

  const editParticipant = poll.participants.find(
    participant => participant.id === params.participantId,
  );

  if (!editParticipant) {
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
      <PollTable poll={poll} editParticipant={editParticipant} />
    </>
  );
}
