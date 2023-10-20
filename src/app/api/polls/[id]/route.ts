import { updatePoll } from '@/services/polls';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const poll = await updatePoll(params.id, body);
  return Response.json(poll);
}
