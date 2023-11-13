import { Metadata } from 'next';
import PollForm from '@/components/PollForm';

export const metadata: Metadata = {
  title: 'Polly: Create a new poll',
};

interface NewPollPageProps {
  searchParams: { title: string };
}

export default async function NewPollPage({ searchParams }: NewPollPageProps) {
  return (
    <main>
      <h1 className="mb-4">Create a new poll</h1>
      {searchParams.title && (
        <h2 className="mb-5">
          Thanks, now let&apos;s get some more information.
        </h2>
      )}
      <PollForm pollTitle={searchParams.title} />
    </main>
  );
}
