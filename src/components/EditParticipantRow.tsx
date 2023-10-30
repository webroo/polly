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
    <form action={formAction} ref={formRef} style={{ display: 'contents' }}>
      <input name="pollId" type="hidden" value={poll.id} />
      <input name="participantId" type="hidden" value={participant.id} />
      <div style={{ display: 'table-row' }}>
        <div style={{ display: 'table-cell' }}>
          Your name:{' '}
          <input name="name" defaultValue={participant.name} required />
        </div>
        {poll.options.map(option => (
          <div key={option.id} style={{ display: 'table-cell' }}>
            <input
              type="checkbox"
              name="selectedOptions[]"
              value={option.id}
              defaultChecked={participant.selectedOptions.includes(option.id)}
            />
          </div>
        ))}
        <div style={{ display: 'table-cell' }}>
          <Link href={`/polls/${poll.id}`}>Cancel</Link>
          <SubmitButton>Save</SubmitButton>
        </div>
      </div>
    </form>
  );
}
