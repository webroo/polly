import { createPoll } from '@/services/polls';

export async function POST(request: Request) {
  const body = await request.json();
  const poll = await createPoll(body);
  return Response.json(poll);
}
