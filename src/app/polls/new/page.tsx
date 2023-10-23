'use client';

import { NewPoll, PollModel } from '@/types/poll';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function NewPollPage() {
  const router = useRouter();
  const [maxOptions, setMaxOptions] = useState(5);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newPoll: NewPoll = {
      title: String(formData.get('title')),
      description: String(formData.get('description')),
      options: formData.getAll('options').map(String),
    };

    const response = await fetch('/api/polls', {
      method: 'POST',
      body: JSON.stringify(newPoll),
    });

    const poll: PollModel = await response.json();

    router.push(`/polls/${poll.id}`);
  }

  return (
    <main>
      <form onSubmit={onSubmit}>
        <label>
          Poll name:
          <input name="title" required />
        </label>
        <label>
          Additional information (optional):
          <input name="description" />
        </label>
        <fieldset>
          <legend>Options</legend>
          {Array.from({ length: maxOptions }).map((_, index) => (
            <label key={index}>
              Option {index + 1}:
              <input name="options" required={index < 2} />
            </label>
          ))}
          <button
            type="button"
            onClick={() => setMaxOptions(value => value + 1)}
          >
            Add another option
          </button>
        </fieldset>
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
