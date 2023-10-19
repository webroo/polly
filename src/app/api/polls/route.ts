import { createPoll, getPolls } from '@/services/polls';

export async function GET(request: Request) {
  const polls = await getPolls();
  return Response.json(polls);
}

export async function POST(request: Request) {
  const body = await request.json();
  const poll = await createPoll(body);
  return Response.json(poll);
}
