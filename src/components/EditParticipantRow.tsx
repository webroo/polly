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
    <div className="table-row relative h-32">
      <form
        action={formAction}
        ref={formRef}
        className="contents  divide-x divide-gray-300"
      >
        <input name="pollId" type="hidden" value={poll.id} />
        <input name="participantId" type="hidden" value={participant.id} />
        <div className="table-cell p-2 align-top">
          <div className="mb-1">Your name:</div>
          <input
            name="name"
            defaultValue={participant.name}
            required
            className="w-full"
          />
        </div>
        {poll.options.map(option => (
          <div key={option.id} className="table-cell p-2 pt-7 text-center">
            <input
              type="checkbox"
              name="selectedOptions[]"
              value={option.id}
              defaultChecked={participant.selectedOptions.includes(option.id)}
            />
          </div>
        ))}
        <div className="absolute bottom-2 left-[5%] w-[90%] rounded p-2 bg-emerald-300 text-center">
          <SubmitButton>Save</SubmitButton> or{' '}
          <Link href={`/polls/${poll.id}`}>Cancel</Link> changes
        </div>
        {/* <div className="table-cell">
          <Link href={`/polls/${poll.id}`}>Cancel</Link>
          <SubmitButton>Save</SubmitButton>
        </div> */}
      </form>
    </div>
  );
}
