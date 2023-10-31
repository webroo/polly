import PollForm from '@/components/PollForm';

export default async function NewPollPage() {
  return (
    <>
      <h1 className="mb-5">Create a new poll</h1>
      <PollForm />
    </>
  );
}
