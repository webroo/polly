import { connectDB } from '@/lib/mongodb';
import { ParticipantModel, PollModel } from '@/types/poll';
import { ObjectId } from 'mongodb';

export async function getPoll(id: string): Promise<PollModel | null> {
  const client = await connectDB();
  return client
    .db()
    .collection('polls')
    .findOne<PollModel>({ _id: new ObjectId(id) });
}

export async function getPolls(): Promise<PollModel[]> {
  const client = await connectDB();
  return client.db().collection('polls').find<PollModel>({}).toArray();
}

export async function createPoll(poll: PollModel): Promise<PollModel> {
  const client = await connectDB();
  await client.db().collection('polls').insertOne(poll);
  return poll;
}

export async function addParticipant(
  pollId: ObjectId,
  participant: ParticipantModel,
): Promise<ParticipantModel> {
  const client = await connectDB();
  await client
    .db()
    .collection('polls')
    .updateOne({ _id: pollId }, { $push: { participants: participant } });
  return participant;
}

export async function updatePoll(id: string, poll: any) {
  const client = await connectDB();
  await client
    .db()
    .collection('polls')
    .replaceOne({ _id: new ObjectId(id) }, poll);
  return { _id: id, ...poll };
}
