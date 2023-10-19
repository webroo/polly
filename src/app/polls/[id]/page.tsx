import { getPoll } from '@/services/polls';

export default async function Poll({ params }: { params: { id: string } }) {
  const poll = await getPoll(params.id);

  return (
    <main>
      <div>{JSON.stringify(poll)}</div>
    </main>
  );
}
