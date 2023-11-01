import { Poll, PollParticipant } from '@/types/poll';
import ParticipantRow from './ParticipantRow';
import AddParticipantRow from './AddParticipantRow';
import EditParticipantRow from './EditParticipantRow';

interface PollTableProps {
  poll: Poll;
  editParticipant?: PollParticipant;
}

export default function PollTable({ poll, editParticipant }: PollTableProps) {
  const totals: number[] = poll.options.map(option => {
    return poll.participants.reduce((sum, participant) => {
      return participant.selectedOptions.includes(option.id) ? sum + 1 : sum;
    }, 0);
  });

  const highestTotal = Math.max(...totals);

  return (
    <div className="border border-gray-300">
      <div className="table w-full border-collapse divide-y divide-gray-300">
        <div className="table-header-group">
          <div className="table-row divide-x divide-gray-300">
            <div className="table-cell w-72 p-2 rounded-tl-sm" />
            {poll.options.map(option => (
              <div
                key={option.id}
                className="table-cell p-2 font-bold text-center"
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
        <div className="table-row-group divide-y divide-gray-300">
          {poll.participants.map(participant =>
            participant.id === editParticipant?.id ? (
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
          {!editParticipant && <AddParticipantRow poll={poll} />}
        </div>
        <div className="table-footer-group">
          <div className="table-row divide-x divide-gray-300">
            <div className="table-cell p-2">Totals</div>
            {totals.map((value, index) => (
              <div key={index} className="table-cell p-2 text-center">
                {value}
                {value > 0 && value === highestTotal ? '*' : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
