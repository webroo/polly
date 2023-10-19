import { connectDB } from '@/lib/mongodb';

export async function getPolls() {
  const client = await connectDB();
  return client.db().collection('polls').find().toArray();
}

export async function createPoll(poll: any) {
  const client = await connectDB();
  const { insertedId } = await client.db().collection('polls').insertOne(poll);
  return { _id: insertedId, ...poll };
}
