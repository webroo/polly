'use client';

import { useRouter } from 'next/navigation';

export function AddPoll() {
  const router = useRouter();

  async function addPoll() {
    const response = await fetch('/api/polls', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Breakfast',
      }),
    });
    console.log(`response:`, response);
    router.refresh();
  }

  return <button onClick={addPoll}>Click to add poll</button>;
}
