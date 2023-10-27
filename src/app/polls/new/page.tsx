'use client';

import { useState } from 'react';
import { experimental_useFormState as useFormState } from 'react-dom';
import { createPollAction } from '@/actions/poll';
import { SubmitButton } from '@/components/SubmitButton';

export default function NewPollPage() {
  const [maxOptions, setMaxOptions] = useState(5);

  const [formState, formAction] = useFormState(createPollAction, {});

  const { serverError, validationErrors } = formState;

  return (
    <main>
      <form action={formAction}>
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
              <input name="options[]" required={index < 2} />
            </label>
          ))}
          <button
            type="button"
            onClick={() => setMaxOptions(value => value + 1)}
          >
            Add another option
          </button>
        </fieldset>
        <SubmitButton>Save</SubmitButton>
      </form>
    </main>
  );
}
