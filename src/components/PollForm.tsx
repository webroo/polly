'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { createPollAction, updatePollAction } from '@/actions/poll';
import { SubmitButton } from '@/components/SubmitButton';
import { Poll } from '@/types/poll';
import Link from 'next/link';

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
      <div className="grid gap-7">
        <div>
          <label htmlFor="title" className="block mb-2">
            Enter the name of your poll
          </label>
          <input
            name="title"
            defaultValue={editPoll?.title}
            required
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            Additional information (optional)
          </label>
          <input
            name="description"
            defaultValue={editPoll?.description}
            className="w-full"
          />
        </div>
        <fieldset className="grid gap-2">
          <legend className="mb-2">List some dates, times or options</legend>
          {validationErrors?.options?._errors.map(error => (
            <div key={error}>{error}</div>
          ))}
          {Array.from({ length: maxOptions }).map((_, index) => (
            <div key={index} className="flex items-center">
              <label
                key={index}
                htmlFor={`options[${index}].name`}
                className="mr-3"
              >
                Option {index + 1}
              </label>
              <input
                name={`options[${index}].name`}
                defaultValue={editPoll?.options[index]?.name}
                className="flex-1"
              />
              <input
                name={`options[${index}].id`}
                type="hidden"
                value={editPoll?.options[index]?.id}
              />
            </div>
          ))}
        </fieldset>
        <div className="flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={() => setMaxOptions(value => value + 1)}
              className="btn"
            >
              Add another option
            </button>
          </div>
          <div>
            {editPoll && (
              <Link href={`/polls/${editPoll.id}`} className="btn mr-4">
                Cancel
              </Link>
            )}
            <SubmitButton>
              {editPoll ? 'Save Changes' : 'Create Poll'}
            </SubmitButton>
          </div>
        </div>
      </div>
    </form>
  );
}
