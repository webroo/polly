import { ObjectId } from 'mongodb';
import { createPoll } from '@/services/polls';
import { NewPoll } from '@/types/poll';

export async function POST(request: Request) {
  const body: NewPoll = await request.json();

  const newPoll = {
    _id: new ObjectId(),
    title: body.title,
    description: body.description,
    options: body.options
      .map(v => v.trim())
      .filter(Boolean)
      .map(option => ({ _id: new ObjectId(), name: option })),
    participants: [],
  };

  const createdPoll = await createPoll(newPoll);

  return Response.json(createdPoll);
}
