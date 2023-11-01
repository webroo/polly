'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { deleteParticipantAction } from '@/actions/poll';
import { Poll, PollParticipant } from '@/types/poll';
import { SubmitButton } from '@/components/SubmitButton';
import { Check, Cross } from '@/components/Icons';

export interface ParticipantRowProps {
  poll: Poll;
  participant: PollParticipant;
}

export default function ParticipantRow({
  poll,
  participant,
}: ParticipantRowProps) {
  const [_formState, formAction] = useFormState(deleteParticipantAction, {});

  return (
    <div className="table-row">
      <form action={formAction} className="contents divide-x divide-gray-300">
        <input name="pollId" type="hidden" value={poll.id} />
        <input name="participantId" type="hidden" value={participant.id} />
        <div className="table-cell p-2">
          <span className="font-bold">{participant.name}</span>{' '}
          <span className="text-sm text-gray-600">
            (
            <Link
              href={`/polls/${poll.id}/participants/${participant.id}/edit`}
            >
              Edit
            </Link>{' '}
            or{' '}
            <SubmitButton
              onClick={e =>
                confirm('Delete this response?')
                  ? undefined // formRef.current?.reset()
                  : e.preventDefault()
              }
            >
              Delete
            </SubmitButton>
            )
          </span>
        </div>
        {poll.options.map(option => (
          <div
            key={option.id}
            className="table-cell p-2 align-middle text-center"
          >
            {participant.selectedOptions.includes(option.id) ? (
              <Check />
            ) : (
              <Cross />
            )}
          </div>
        ))}
      </form>
    </div>
  );
}
