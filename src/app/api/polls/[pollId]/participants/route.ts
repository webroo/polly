import { addParticipant } from '@/services/polls';
import { NewParticipant } from '@/types/poll';

export async function POST(
  request: Request,
  { params }: { params: { pollId: string } },
) {
  const body: NewParticipant = await request.json();

  const participant = await addParticipant(
    params.pollId,
    body.name,
    body.selectedOptions,
  );

  return Response.json(participant);
}
