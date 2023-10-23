import { addParticipant } from '@/services/polls';
import { NewParticipant, ParticipantModel } from '@/types/poll';
import { ObjectId } from 'mongodb';

export async function POST(
  request: Request,
  { params }: { params: { pollId: string } },
) {
  const body: NewParticipant = await request.json();

  const newParticipant: ParticipantModel = {
    _id: new ObjectId(),
    name: body.name,
    selectedOptions: body.selectedOptions,
  };

  const createdParticipant = await addParticipant(
    new ObjectId(params.pollId),
    newParticipant,
  );

  return Response.json(createdParticipant);
}
