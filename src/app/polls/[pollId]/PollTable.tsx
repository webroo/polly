'use client';

import { useRef, useState } from 'react';
import { addParticipantAction } from '@/actions/polls';
import { Poll } from '@/types/poll';

interface PollTableProps {
  poll: Poll;
}

export default function PollTable({ poll }: PollTableProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function onFormAction(formData: FormData) {
    const response = await addParticipantAction(formData);

    if (response.data) {
      setSuccess(true);
      setError(false);
      formRef.current?.reset();
    } else {
      setSuccess(false);
      setError(true);
    }
  }

  const totals: number[] = poll.options.map(option => {
    return poll.participants.reduce((sum, participant) => {
      return participant.selectedOptions.includes(option.id) ? sum + 1 : sum;
    }, 0);
  });

  const highestTotal = Math.max(...totals);

  return (
    <form action={onFormAction} ref={formRef}>
      {success && <div>Thank you for adding your response</div>}
      {error && <div>Sorry, there was a problem adding your response</div>}
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
              Your name: <input name="name" />
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
