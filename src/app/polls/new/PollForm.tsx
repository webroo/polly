'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { createPollAction, updatePollAction } from '@/actions/poll';
import { SubmitButton } from '@/components/SubmitButton';
import { Poll } from '@/types/poll';

interface PollFormProps {
  existingPoll?: Poll;
}

export default function PollForm({ existingPoll }: PollFormProps) {
  const [maxOptions, setMaxOptions] = useState(
    existingPoll?.options.length ?? 5,
  );

  const action = existingPoll ? updatePollAction : createPollAction;

  const [formState, formAction] = useFormState(action, {});

  const { serverError, validationErrors } = formState;

  return (
    <form action={formAction}>
      {serverError && <div>Sorry, there was a problem creating the poll</div>}
      <input name="pollId" type="hidden" value={existingPoll?.id} />
      {validationErrors?.title?._errors.map(error => (
        <div key={error}>{error}</div>
      ))}
      <label>
        Poll name:
        <input name="title" defaultValue={existingPoll?.title} required />
      </label>
      <label>
        Additional information (optional):
        <input name="description" defaultValue={existingPoll?.description} />
      </label>
      <fieldset>
        <legend>Options</legend>
        {validationErrors?.options?._errors.map(error => (
          <div key={error}>{error}</div>
        ))}
        {Array.from({ length: maxOptions }).map((_, index) => (
          <label key={index}>
            Option {index + 1}:
            <input
              name={`options[${index}].name`}
              defaultValue={existingPoll?.options[index]?.name}
            />
            <input
              name={`options[${index}].id`}
              type="hidden"
              value={existingPoll?.options[index]?.id}
            />
          </label>
        ))}
        <button type="button" onClick={() => setMaxOptions(value => value + 1)}>
          Add another option
        </button>
      </fieldset>
      <SubmitButton>Save</SubmitButton>
    </form>
  );
}
