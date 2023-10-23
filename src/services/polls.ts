import { connectDB } from '@/lib/mongodb';
import { uniqueid } from '@/lib/uniqueid';
import { ParticipantModel, PollModel, PollOptionModel } from '@/types/poll';

export async function getPoll(id: string): Promise<PollModel | null> {
  return (await connectDB())
    .collection('polls')
    .findOne<PollModel>({ id }, { projection: { _id: 0 } });
}

export async function getPolls(): Promise<PollModel[]> {
  return (await connectDB())
    .collection('polls')
    .find<PollModel>({}, { projection: { _id: 0 } })
    .toArray();
}

export async function createPoll(
  title: string,
  description: string,
  options: string[],
): Promise<PollModel> {
  const poll: PollModel = {
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
): Promise<ParticipantModel> {
  const participant: ParticipantModel = {
    id: uniqueid(),
    name,
    selectedOptions,
  };

  await (await connectDB())
    .collection('polls')
    .updateOne({ id: pollId }, { $push: { participants: participant } });

  return participant;
}
