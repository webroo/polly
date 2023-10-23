'use client';

import { NewParticipant, PollModel } from '@/types/poll';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

interface PollTableProps {
  poll: PollModel;
}

export default function PollTable({ poll }: PollTableProps) {
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newParticipant: NewParticipant = {
      name: String(formData.get('name')),
      selectedOptions: formData.getAll('selectedOptions').map(String),
    };

    await fetch(`/api/polls/${poll.id}/participants`, {
      method: 'POST',
      body: JSON.stringify(newParticipant),
    });

    router.refresh();
  }

  const totals = poll.options.map(option => {
    return poll.participants.reduce((sum, participant) => {
      return participant.selectedOptions.includes(option.id) ? sum + 1 : sum;
    }, 0);
  });

  const highestTotal = Math.max(...totals);

  return (
    <form onSubmit={onSubmit}>
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
