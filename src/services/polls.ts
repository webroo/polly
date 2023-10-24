import { connectDB } from '@/lib/mongodb';
import { uniqueid } from '@/lib/uniqueid';
import { PollParticipant, Poll } from '@/types/poll';

export async function getPoll(id: string): Promise<Poll | null> {
  return (await connectDB())
    .collection('polls')
    .findOne<Poll>({ id }, { projection: { _id: 0 } });
}

export async function getPolls(): Promise<Poll[]> {
  return (await connectDB())
    .collection('polls')
    .find<Poll>({}, { projection: { _id: 0 } })
    .toArray();
}

export async function createPoll(
  title: string,
  description: string,
  options: string[],
): Promise<Poll> {
  const poll: Poll = {
    id: uniqueid(),
    title,
    description,
    participants: [],
    options: options
      .filter(option => Boolean(option.trim()))
      .map(option => ({ id: uniqueid(), name: option })),
  };

  await (await connectDB())
    .collection('polls')
    .insertOne(poll, { forceServerObjectId: true });

  return poll;
}

export async function addParticipant(
  pollId: string,
  name: string,
  selectedOptions: string[],
): Promise<PollParticipant> {
  const participant: PollParticipant = {
    id: uniqueid(),
    name,
    selectedOptions,
  };

  await (await connectDB())
    .collection('polls')
    .updateOne({ id: pollId }, { $push: { participants: participant } });

  return participant;
}
