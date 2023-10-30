'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { addParticipantAction } from '@/actions/poll';
import { Poll } from '@/types/poll';
import { SubmitButton } from '@/components/SubmitButton';

export interface AddParticipantRowProps {
  poll: Poll;
}

export default function AddParticipantRow({ poll }: AddParticipantRowProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [formState, formAction] = useFormState(addParticipantAction, {});

  useEffect(() => {
    if (formState.data) {
      formRef.current?.reset();
    }
  }, [formState.data]);

  return (
    <form action={formAction} ref={formRef} style={{ display: 'contents' }}>
      <input name="pollId" type="hidden" value={poll.id} />
      <div style={{ display: 'table-row' }}>
        <div style={{ display: 'table-cell' }}>
          Your name: <input name="name" required />
        </div>
        {poll.options.map(option => (
          <div key={option.id} style={{ display: 'table-cell' }}>
            <input type="checkbox" name="selectedOptions[]" value={option.id} />
          </div>
        ))}
        <div style={{ display: 'table-cell' }}>
          <SubmitButton>Save</SubmitButton>
        </div>
      </div>
    </form>
  );
}
