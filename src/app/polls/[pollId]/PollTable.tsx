import { Poll, PollParticipant } from '@/types/poll';
import ParticipantRow from './ParticipantRow';
import AddParticipantRow from './AddParticipantRow';
import EditParticipantRow from './EditParticipantRow';

interface PollTableProps {
  poll: Poll;
  existingParticipant?: PollParticipant;
}

export default function PollTable({
  poll,
  existingParticipant,
}: PollTableProps) {
  const totals: number[] = poll.options.map(option => {
    return poll.participants.reduce((sum, participant) => {
      return participant.selectedOptions.includes(option.id) ? sum + 1 : sum;
    }, 0);
  });

  const highestTotal = Math.max(...totals);

  return (
    <div style={{ display: 'table' }}>
      <div style={{ display: 'table-header-group' }}>
        <div style={{ display: 'table-row' }}>
          <div style={{ display: 'table-cell' }}>Participant</div>
          {poll.options.map(option => (
            <div key={option.id} style={{ display: 'table-cell' }}>
              {option.name}
            </div>
          ))}
          <div style={{ display: 'table-cell' }}>Actions</div>
        </div>
      </div>
      <div style={{ display: 'table-row-group' }}>
        {poll.participants.map(participant =>
          participant.id === existingParticipant?.id ? (
            <EditParticipantRow
              key={participant.id}
              poll={poll}
              participant={participant}
            />
          ) : (
            <ParticipantRow
              key={participant.id}
              poll={poll}
              participant={participant}
            />
          ),
        )}
        {!existingParticipant && <AddParticipantRow poll={poll} />}
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
  );
}
