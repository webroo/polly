'use client';

import { useRef } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { updateParticipantAction } from '@/actions/poll';
import { flattenValidationErrors } from '@/lib/zod';
import { Poll, PollParticipant } from '@/types/poll';
import { SubmitButton } from '@/components/SubmitButton';
import ErrorAlert from '@/components/ErrorAlert';

export interface EditParticipantRowProps {
  poll: Poll;
  participant: PollParticipant;
}

export default function EditParticipantRow({
  poll,
  participant,
}: EditParticipantRowProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [formState, formAction] = useFormState(updateParticipantAction, {});

  return (
    <div className="table-row relative h-36 bg-gray-500/5 outline outline-2 outline-gray-800 outline-offset-[-1px]">
      <form
        id="ParticipantForm"
        action={formAction}
        ref={formRef}
        className="contents divide-x divide-gray-300"
      >
        <input name="pollId" type="hidden" value={poll.id} />
        <input name="participantId" type="hidden" value={participant.id} />
        <div className="table-cell px-2.5 py-2 align-top">
          <label htmlFor="name" className="block mb-1.5">
            Your name
          </label>
          <input
            name="name"
            defaultValue={participant.name}
            required
            className="w-full"
          />
          <div className="absolute left-[20rem] right-8 p-2 text-center bg-white rounded-md border border-gray-300 shadow-md">
            <span className="font-serif italic mr-2">
              Update your details and
            </span>
            <SubmitButton form="ParticipantForm" className="btn-primary py-2">
              Save Changes
            </SubmitButton>
            <span className="font-serif italic mx-2">or</span>
            <Link href={`/polls/${poll.id}`} className="btn py-2">
              Cancel
            </Link>
            {formState.validationErrors && (
              <ErrorAlert
                title="Oops, there were errors with your submission"
                messages={flattenValidationErrors(formState.validationErrors)}
                className="mt-2"
              />
            )}
          </div>
        </div>
        {poll.options.map(option => (
          <div
            key={option.id}
            className="table-cell px-2.5 py-2 pt-8 text-center"
          >
            <input
              type="checkbox"
              name="selectedOptions[]"
              value={option.id}
              defaultChecked={participant.selectedOptions.includes(option.id)}
            />
          </div>
        ))}
      </form>
    </div>
  );
}
