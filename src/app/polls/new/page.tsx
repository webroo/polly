'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { createPollAction } from '@/actions/polls';

export default function NewPollPage() {
  const [maxOptions, setMaxOptions] = useState(5);

  async function onFormAction(formData: FormData) {
    const poll = await createPollAction(formData);
    redirect(`/polls/${poll.id}`);
  }

  return (
    <main>
      <form action={onFormAction}>
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
