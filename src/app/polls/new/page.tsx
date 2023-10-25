'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { createPollAction } from '@/actions/poll';
import { Poll } from '@/types/poll';
import { ActionResult } from '@/types/action';

export default function NewPollPage() {
  const [maxOptions, setMaxOptions] = useState(5);
  const [formState, setFormState] = useState<ActionResult<Poll>>({});

  const { serverError, validationErrors } = formState;

  async function onFormAction(formData: FormData) {
    const result = await createPollAction(formData);

    setFormState(result);

    if (result.data) {
      redirect(`/polls/${result.data.id}`);
    }
  }

  return (
    <main>
      <form action={onFormAction}>
        {serverError && <div>Sorry, there was a problem creating the poll</div>}
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
          {validationErrors?.options?._errors.map(error => (
            <div key={error}>{error}</div>
          ))}
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
