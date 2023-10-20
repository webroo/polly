import { getPoll } from '@/services/polls';

export default async function Poll({ params }: { params: { id: string } }) {
  const poll = await getPoll(params.id);

  if (!poll) {
    // TODO redirect to 404 page
    throw new Error('Poll not found');
  }

  return (
    <main>
      <h1>{poll.name}</h1>
      <p>{poll.description}</p>
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
          <tr>
            <td>Participant name</td>
            {poll.options.map(option => (
              <td key={option}>X</td>
            ))}
          </tr>
        </tbody>
      </table>
    </main>
  );
}
