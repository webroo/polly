'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function NewPoll() {
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    await fetch('/api/polls', {
      method: 'POST',
      body: JSON.stringify(formJson),
    });

    router.push('/polls');
    router.refresh();
  }

  return (
    <main>
      <form onSubmit={onSubmit}>
        <label>
          Poll name:
          <input name="name" />
        </label>
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
