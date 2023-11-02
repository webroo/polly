import Link from 'next/link';
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
          <Link href={`/polls/${poll.id}/edit`} className="btn">
            Edit this poll
          </Link>
        </div>
      </div>
      <h2 className="ml-0.5 mb-6">{poll.description}</h2>
      <PollTable poll={poll} editParticipant={editParticipant} />
    </>
  );
}
