import { connectDB } from '@/lib/mongodb';

export default async function Home() {
  const client = await connectDB();

  const pollsCollection = client.db().collection('polls');

  const polls = await pollsCollection.find().toArray();

  return (
    <main>
      <h1>Polls:</h1>
      <ul>
        {polls.map(poll => (
          <li key={poll._id.toString()}>{JSON.stringify(poll)}</li>
        ))}
      </ul>
    </main>
  );
}
