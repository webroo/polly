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
    <div className="table-row relative h-32">
      <form
        action={formAction}
        ref={formRef}
        className="contents divide-x divide-gray-300"
      >
        <input name="pollId" type="hidden" value={poll.id} />
        <div className="table-cell p-2 align-top">
          <div className="mb-1">Your name:</div>
          <input name="name" required className="w-full" />
        </div>
        {poll.options.map(option => (
          <div key={option.id} className="table-cell p-2 pt-7 text-center">
            <input type="checkbox" name="selectedOptions[]" value={option.id} />
          </div>
        ))}
        <div className="absolute bottom-2 left-[5%] w-[90%] rounded p-2 bg-emerald-300 text-center">
          Enter your name, select your options and click{' '}
          <SubmitButton>Save</SubmitButton>
        </div>
      </form>
    </div>
  );
}
