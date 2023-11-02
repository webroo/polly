import PollForm from '@/components/PollForm';

interface NewPollPageProps {
  searchParams: { title: string };
}

export default async function NewPollPage({ searchParams }: NewPollPageProps) {
  return (
    <>
      <h1 className="mb-4">Create a new poll</h1>
      {searchParams.title && (
        <h2 className="mb-5">
          Thanks, now let&apos;s get some more information.
        </h2>
      )}
      <PollForm pollTitle={searchParams.title} />
    </>
  );
}
