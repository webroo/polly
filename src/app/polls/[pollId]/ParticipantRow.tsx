'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { deleteParticipantAction } from '@/actions/poll';
import { Poll, PollParticipant } from '@/types/poll';
import { SubmitButton } from '@/components/SubmitButton';

export interface ParticipantRowProps {
  poll: Poll;
  participant: PollParticipant;
}

export default function ParticipantRow({
  poll,
  participant,
}: ParticipantRowProps) {
  const [_formState, formAction] = useFormState(
    deleteParticipantAction.bind(null, poll.id, participant.id),
    {},
  );

  return (
    <form action={formAction} style={{ display: 'contents' }}>
      <div style={{ display: 'table-row' }}>
        <div style={{ display: 'table-cell' }}>{participant.name}</div>
        {poll.options.map(option => (
          <div key={option.id} style={{ display: 'table-cell' }}>
            {participant.selectedOptions.includes(option.id) ? 'YES' : 'NO'}
          </div>
        ))}
        <div style={{ display: 'table-cell' }}>
          <Link href={`/polls/${poll.id}/participants/${participant.id}/edit`}>
            Edit
          </Link>
          <SubmitButton
            onClick={e =>
              confirm('Delete this response?')
                ? undefined // formRef.current?.reset()
                : e.preventDefault()
            }
          >
            Delete
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
