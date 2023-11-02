'use client';

import { Fragment, useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { createPollAction, updatePollAction } from '@/actions/poll';
import { SubmitButton } from '@/components/SubmitButton';
import ErrorAlert from '@/components/ErrorAlert';
import { Poll } from '@/types/poll';
import { flattenValidationErrors } from '@/lib/zod';

interface PollFormProps {
  pollTitle?: string;
  editPoll?: Poll;
}

export default function PollForm({ pollTitle, editPoll }: PollFormProps) {
  const [totalOptions, setTotalOptions] = useState(
    editPoll?.options.length ?? 5,
  );

  const action = editPoll ? updatePollAction : createPollAction;

  const [formState, formAction] = useFormState(action, {});

  return (
    <form action={formAction}>
      {formState.validationErrors && (
        <ErrorAlert
          title="Oops, there were errors with your submission"
          messages={flattenValidationErrors(formState.validationErrors)}
          className="mb-4"
        />
      )}
      <input name="pollId" type="hidden" value={editPoll?.id} />
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
          <div className="grid grid-cols-[auto_1fr] items-center gap-2">
            {Array.from({ length: totalOptions }).map((_, index) => (
              <Fragment key={index}>
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
              </Fragment>
            ))}
          </div>
        </fieldset>
        <div className="flex items-center justify-between">
          <div>
            {totalOptions < 10 && (
              <button
                type="button"
                onClick={() => setTotalOptions(value => value + 1)}
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
