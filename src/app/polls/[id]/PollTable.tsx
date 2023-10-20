'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function PollTable({ poll }) {
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const formDataObj = Array.from(formData.keys()).reduce(
      (result, key) => ({
        ...result,
        [key]: result[key] ? formData.getAll(key) : formData.get(key),
      }),
      {} as Record<string, FormDataEntryValue | FormDataEntryValue[] | null>,
    );

    const reducedOptions = (formDataObj.option as FormDataEntryValue[]).reduce(
      (acc, value) => {
        if (value === 'true') {
          acc[acc.length - 1] = true;
        } else {
          acc.push(false);
        }
        return acc;
      },
      [] as boolean[],
    );

    const updatedPoll = {
      ...poll,
      _id: undefined,
      participants: [
        ...poll.participants,
        {
          name: formDataObj.name,
          responses: reducedOptions,
        },
      ],
    };

    await fetch(`/api/polls/${poll._id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedPoll),
    });

    router.refresh();
  }

  const totals = poll.participants.reduce(
    (acc, participant) => {
      participant.responses.forEach((response, index) => {
        acc[index] = response ? acc[index] + 1 : acc[index];
      });
      return acc;
    },
    Array.from({ length: poll.options.length }).fill(0),
  );

  const highestTotal = Math.max(...totals);

  return (
    <form onSubmit={onSubmit}>
      <table>
        <thead>
          <tr>
            <th>Participant</th>
            {poll.options.map(option => (
              <th key={option}>{option}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {poll.participants.map((participant, index) => (
            <tr key={index}>
              <td>{participant.name}</td>
              {participant.responses.map((response, index) => (
                <td key={index}>{response ? 'YES' : 'NO'}</td>
              ))}
              <td></td>
            </tr>
          ))}
          <tr>
            <td>
              Your name: <input name="name" />
            </td>
            {poll.options.map((_, index) => (
              <td key={index}>
                <input type="hidden" name="option" value="false" />
                <input type="checkbox" name="option" value="true" />
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
                {value} {value === highestTotal ? '*' : ''}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </form>
  );
}
