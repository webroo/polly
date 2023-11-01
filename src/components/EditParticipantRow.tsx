'use client';

import { useRef } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { updateParticipantAction } from '@/actions/poll';
import { Poll, PollParticipant } from '@/types/poll';
import { SubmitButton } from '@/components/SubmitButton';

export interface EditParticipantRowProps {
  poll: Poll;
  participant: PollParticipant;
}

export default function EditParticipantRow({
  poll,
  participant,
}: EditParticipantRowProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [_formState, formAction] = useFormState(updateParticipantAction, {});

  return (
    <div className="table-row relative h-36 outline outline-2 outline-gray-800 outline-offset-[-1px]">
      <form
        id="ParticipantForm"
        action={formAction}
        ref={formRef}
        className="contents divide-x divide-gray-300"
      >
        <input name="pollId" type="hidden" value={poll.id} />
        <input name="participantId" type="hidden" value={participant.id} />
        <div className="table-cell p-2 align-top">
          <label htmlFor="name" className="block mb-1.5">
            Your name
          </label>
          <input
            name="name"
            defaultValue={participant.name}
            required
            className="w-full"
          />
        </div>
        {poll.options.map(option => (
          <div key={option.id} className="table-cell p-2 pt-8 text-center">
            <input
              type="checkbox"
              name="selectedOptions[]"
              value={option.id}
              defaultChecked={participant.selectedOptions.includes(option.id)}
            />
          </div>
        ))}
      </form>
      <div className="absolute bottom-4 left-[20rem] right-8 p-2 text-center bg-white rounded-md border border-gray-300 shadow-md">
        Update your details then{' '}
        <SubmitButton form="ParticipantForm" className="btn-primary py-2">
          Save
        </SubmitButton>{' '}
        your changes, or{' '}
        <Link href={`/polls/${poll.id}`} className="btn py-2">
          Cancel
        </Link>
      </div>
    </div>
  );
}
