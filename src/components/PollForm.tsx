'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { createPollAction, updatePollAction } from '@/actions/poll';
import { SubmitButton } from '@/components/SubmitButton';
import { Poll } from '@/types/poll';
import Link from 'next/link';

interface PollFormProps {
  pollTitle?: string;
  editPoll?: Poll;
}

export default function PollForm({ pollTitle, editPoll }: PollFormProps) {
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
      <div className="grid gap-6">
        <div>
          <label htmlFor="title" className="block mb-2">
            Name of your poll
          </label>
          <input
            name="title"
            defaultValue={editPoll?.title ?? pollTitle}
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
        <fieldset className="">
          <legend className="mb-2">
            List some dates, times or options.{' '}
            <span className="font-serif italic mb-2">
              For example: &quot;Thu 12th&quot;, &quot;Fri 9pm&quot;, etc.
            </span>
          </legend>
          {validationErrors?.options?._errors.map(error => (
            <div key={error}>{error}</div>
          ))}
          <div className="grid grid-cols-[auto_1fr] items-center gap-2">
            {Array.from({ length: maxOptions }).map((_, index) => (
              <>
                <label key={index} htmlFor={`options[${index}].name`}>
                  Option {index + 1}
                </label>
                <input
                  name={`options[${index}].name`}
                  defaultValue={editPoll?.options[index]?.name}
                  className=""
                />
                <input
                  name={`options[${index}].id`}
                  type="hidden"
                  value={editPoll?.options[index]?.id}
                />
              </>
            ))}
          </div>
        </fieldset>
        <div className="flex items-center justify-between">
          <div>
            {maxOptions < 10 && (
              <button
                type="button"
                onClick={() => setMaxOptions(value => value + 1)}
                className="btn"
              >
                Add another option
              </button>
            )}
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
