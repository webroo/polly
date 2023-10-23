import { createPoll } from '@/services/polls';
import { NewPoll } from '@/types/poll';

export async function POST(request: Request) {
  const body: NewPoll = await request.json();

  const poll = await createPoll(body.title, body.description, body.options);

  return Response.json(poll);
}
