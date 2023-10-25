'use client';

import { useRef, useState } from 'react';
import { addParticipantAction } from '@/actions/poll';
import { Poll, PollParticipant } from '@/types/poll';
import { ActionResult } from '@/types/action';

interface PollTableProps {
  poll: Poll;
}

export default function PollTable({ poll }: PollTableProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [formState, setFormState] = useState<ActionResult<PollParticipant>>({});

  const { data, serverError, validationErrors } = formState;

  const totals: number[] = poll.options.map(option => {
    return poll.participants.reduce((sum, participant) => {
      return participant.selectedOptions.includes(option.id) ? sum + 1 : sum;
    }, 0);
  });

  const highestTotal = Math.max(...totals);

  async function onFormAction(formData: FormData) {
    const result = await addParticipantAction(formData);

    setFormState(result);

    if (result.data) {
      formRef.current?.reset();
    }
  }

  return (
    <form action={onFormAction} ref={formRef}>
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
              <td>{participant.name}</td>
              {poll.options.map(option => (
                <td key={option.id}>
                  {participant.selectedOptions.includes(option.id)
                    ? 'YES'
                    : 'NO'}
                </td>
              ))}
              <td></td>
            </tr>
          ))}
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
                  name="selectedOptions"
                  value={option.id}
                />
              </td>
            ))}
            <td>
              <button type="submit">Save</button>
            </td>
          </tr>
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
