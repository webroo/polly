'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function NewPoll() {
  const router = useRouter();
  const [maxOptions, setMaxOptions] = useState(5);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const formDataObj = Array.from(formData.keys()).reduce(
      (result, key) => ({
        ...result,
        [key]: result[key] ? formData.getAll(key) : formData.get(key),
      }),
      {} as Record<string, FormDataEntryValue | FormDataEntryValue[] | null>,
    );

    const response = await fetch('/api/polls', {
      method: 'POST',
      body: JSON.stringify(formDataObj),
    });
    const poll = await response.json();

    router.push(`/polls/${poll._id}`);
  }

  return (
    <main>
      <form onSubmit={onSubmit}>
        <label>
          Poll name:
          <input name="name" required />
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
