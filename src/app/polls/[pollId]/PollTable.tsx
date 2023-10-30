'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import {
  addParticipantAction,
  deleteParticipantAction,
  updateParticipantAction,
} from '@/actions/poll';
import { Poll, PollParticipant } from '@/types/poll';
import { SubmitButton } from '@/components/SubmitButton';

interface PollTableProps {
  poll: Poll;
  existingParticipant?: PollParticipant;
}

export default function PollTable({
  poll,
  existingParticipant,
}: PollTableProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const action = existingParticipant
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
    if (data) {
      formRef.current?.reset();
    }
  }, [data, existingParticipant, poll]);

  return (
    <form action={formAction} ref={formRef}>
      {data && <div>Thank you for adding your response</div>}
      {serverError && (
        <div>Sorry, there was a problem adding your response</div>
      )}
      <input name="pollId" type="hidden" value={poll.id} />
      <div style={{ display: 'table' }}>
        <div style={{ display: 'table-header-group' }}>
          <div style={{ display: 'table-row' }}>
            <div style={{ display: 'table-cell' }} className="text-xl">
              Participant
            </div>
            {poll.options.map(option => (
              <div key={option.id} style={{ display: 'table-cell' }}>
                {option.name}
              </div>
            ))}
            <div style={{ display: 'table-cell' }}>Actions</div>
          </div>
        </div>
        <div style={{ display: 'table-row-group' }}>
          {poll.participants.map(participant => (
            <div key={participant.id} style={{ display: 'table-row' }}>
              {participant.id === existingParticipant?.id ? (
                <>
                  <div style={{ display: 'table-cell' }}>
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
                  </div>
                  {poll.options.map(option => (
                    <div key={option.id} style={{ display: 'table-cell' }}>
                      <input
                        type="checkbox"
                        name="selectedOptions[]"
                        value={option.id}
                        defaultChecked={participant.selectedOptions.includes(
                          option.id,
                        )}
                      />
                    </div>
                  ))}
                  <div style={{ display: 'table-cell' }}>
                    <Link href={`/polls/${poll.id}`}>Cancel</Link>
                    <SubmitButton>Save</SubmitButton>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'table-cell' }}>
                    {participant.name}
                  </div>
                  {poll.options.map(option => (
                    <div key={option.id} style={{ display: 'table-cell' }}>
                      {participant.selectedOptions.includes(option.id)
                        ? 'YES'
                        : 'NO'}
                    </div>
                  ))}
                  <div style={{ display: 'table-cell' }}>
                    <Link
                      href={`/polls/${poll.id}/participants/${participant.id}/edit`}
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
                        confirm('Delete this response?')
                          ? formRef.current?.reset()
                          : e.preventDefault()
                      }
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {!existingParticipant && (
            <div style={{ display: 'table-row' }}>
              <div style={{ display: 'table-cell' }}>
                {validationErrors?.name?._errors.map(error => (
                  <div key={error}>{error}</div>
                ))}
                Your name: <input name="name" required />
              </div>
              {poll.options.map(option => (
                <div key={option.id} style={{ display: 'table-cell' }}>
                  <input
                    type="checkbox"
                    name="selectedOptions[]"
                    value={option.id}
                  />
                </div>
              ))}
              <div style={{ display: 'table-cell' }}>
                <SubmitButton>Save</SubmitButton>
              </div>
            </div>
          )}
        </div>
        <div style={{ display: 'table-footer-group' }}>
          <div style={{ display: 'table-row' }}>
            <div style={{ display: 'table-cell' }}>Totals</div>
            {totals.map((value, index) => (
              <div key={index} style={{ display: 'table-cell' }}>
                {value}
                {value > 0 && value === highestTotal ? '*' : ''}
              </div>
            ))}
            <div style={{ display: 'table-cell' }}></div>
          </div>
        </div>
      </div>
    </form>
  );
}
