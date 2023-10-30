'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { createPollAction, updatePollAction } from '@/actions/poll';
import { SubmitButton } from '@/components/SubmitButton';
import { Poll } from '@/types/poll';

interface PollFormProps {
  editPoll?: Poll;
}

export default function PollForm({ editPoll }: PollFormProps) {
  const [maxOptions, setMaxOptions] = useState(editPoll?.options.length ?? 5);

  const action = editPoll ? updatePollAction : createPollAction;

  const [formState, formAction] = useFormState(action, {});

  const { serverError, validationErrors } = formState;

  return (
    <form action={formAction}>
      {serverError && <div>Sorry, there was a problem creating the poll</div>}
      <input name="pollId" type="hidden" value={editPoll?.id} />
      {validationErrors?.title?._errors.map(error => (
        <div key={error}>{error}</div>
      ))}
      <label>
        Poll name:
        <input name="title" defaultValue={editPoll?.title} required />
      </label>
      <label>
        Additional information (optional):
        <input name="description" defaultValue={editPoll?.description} />
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
              defaultValue={editPoll?.options[index]?.name}
            />
            <input
              name={`options[${index}].id`}
              type="hidden"
              value={editPoll?.options[index]?.id}
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
