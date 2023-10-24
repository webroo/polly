'use client';

import { useRef } from 'react';
import { addParticipantAction } from '@/actions/polls';
import { Poll } from '@/types/poll';

interface PollTableProps {
  poll: Poll;
}

export default function PollTable({ poll }: PollTableProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const totals: number[] = poll.options.map(option => {
    return poll.participants.reduce((sum, participant) => {
      return participant.selectedOptions.includes(option.id) ? sum + 1 : sum;
    }, 0);
  });

  const highestTotal = Math.max(...totals);

  async function onFormAction(formData: FormData) {
    await addParticipantAction(formData);
    formRef.current?.reset();
  }

  return (
    <form action={onFormAction} ref={formRef}>
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
