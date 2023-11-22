import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { getPoll } from '@/services/poll';
import PollTable from '@/components/PollTable';
import PollControls from '@/components/PollControls';
import PollTitle from '@/components/PollTitle';

interface PollPageProps {
  params: { pollId: string };
}

export async function generateMetadata({
  params,
}: PollPageProps): Promise<Metadata> {
  const poll = await getPoll(params.pollId);
  return {
    title: poll?.title,
  };
}

export default async function PollPage({ params }: PollPageProps) {
  const poll = await getPoll(params.pollId);

  if (!poll) {
    notFound();
  }

  const host = headers().get('host');
  console.log(`host:`, host);
  const protocol = process.env.NODE_ENV === 'development' ? `http` : 'https';
  console.log(`protocol:`, protocol);
  const shareUrl = `${protocol}://${host}/polls/${poll.id}`;
  console.log(`shareUrl:`, shareUrl);

  return (
    <main>
      <PollTitle title={poll.title} description={poll.description} />
      <PollTable poll={poll} />
      <PollControls poll={poll} shareUrl={shareUrl} />
    </main>
  );
}
