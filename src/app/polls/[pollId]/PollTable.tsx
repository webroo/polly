'use client';

import { useEffect, useRef } from 'react';
import { experimental_useFormState as useFormState } from 'react-dom';
import { redirect } from 'next/navigation';
import {
  addParticipantAction,
  deleteParticipantAction,
  updateParticipantAction,
} from '@/actions/poll';
import { Poll } from '@/types/poll';
import { SubmitButton } from '@/components/SubmitButton';
import Link from 'next/link';

interface PollTableProps {
  poll: Poll;
  editParticipantId?: string;
}

export default function PollTable({ poll, editParticipantId }: PollTableProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const action = editParticipantId
    ? updateParticipantAction
    : addParticipantAction;

  const [formState, formAction] = useFormState(action, {});

  const { data, serverError, validationErrors } = formState;

  const totals: number[] = poll.options.map(option => {
    return poll.participants.reduce((sum, participant) => {
      return participant.selectedOptions.includes(option.id) ? sum + 1 : sum;
    }, 0);
  });

  const highestTotal = Math.max(...totals);

  useEffect(() => {
    if (data && editParticipantId) {
      redirect(`/polls/${poll.id}`);
    }
    if (data) {
      formRef.current?.reset();
    }
  }, [data, editParticipantId, poll]);

  return (
    <form action={formAction} ref={formRef}>
      {data && <div>Thank you for adding your response</div>}
      {serverError && (
        <div>Sorry, there was a problem adding your response</div>
      )}
      <input name="pollId" type="hidden" value={poll.id} />
      <table>
        <thead>
          <tr>
            <th></th>
            {poll.options.map(option => (
              <th key={option.id}>{option.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {poll.participants.map(participant => (
            <tr key={participant.id}>
              {participant.id === editParticipantId ? (
                <>
                  <td>
                    <input
                      name="participantId"
                      type="hidden"
                      value={participant.id}
                    />
                    Your name:{' '}
                    <input
                      name="name"
                      defaultValue={participant.name}
                      required
                    />
                  </td>
                  {poll.options.map(option => (
                    <td key={option.id}>
                      <input
                        type="checkbox"
                        name="selectedOptions[]"
                        value={option.id}
                        defaultChecked={participant.selectedOptions.includes(
                          option.id,
                        )}
                      />
                    </td>
                  ))}
                  <td>
                    <SubmitButton>Save</SubmitButton>
                  </td>
                </>
              ) : (
                <>
                  <td>{participant.name}</td>
                  {poll.options.map(option => (
                    <td key={option.id}>
                      {participant.selectedOptions.includes(option.id)
                        ? 'YES'
                        : 'NO'}
                    </td>
                  ))}
                  <td>
                    <Link
                      href={`/polls/${poll.id}?participant=${participant.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      formAction={deleteParticipantAction.bind(
                        null,
                        poll.id,
                        participant.id,
                      )}
                      formNoValidate
                      onClick={e =>
                        !confirm('Delete this response?') && e.preventDefault()
                      }
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {!editParticipantId && (
            <tr>
              <td>
                {validationErrors?.name?._errors.map(error => (
                  <div key={error}>{error}</div>
                ))}
                Your name: <input name="name" required />
              </td>
              {poll.options.map(option => (
                <td key={option.id}>
                  <input
                    type="checkbox"
                    name="selectedOptions[]"
                    value={option.id}
                  />
                </td>
              ))}
              <td>
                <SubmitButton>Save</SubmitButton>
              </td>
            </tr>
          )}
          <tr>
            <td>Totals</td>
            {totals.map((value, index) => (
              <td key={index}>
                {value}
                {value > 0 && value === highestTotal ? '*' : ''}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </form>
  );
}
