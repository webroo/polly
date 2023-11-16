import clsx from 'clsx';
import { Poll, PollParticipant } from '@/types/poll';
import { MAX_PARTICIPANTS } from '@/schemas/poll';
import ParticipantRow from '@/components/ParticipantRow';
import UpdateParticipantRow from '@/components/UpdateParticipantRow';
import MaxParticipantRow from '@/components/MaxParticipantRow';

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
    <div className="table table-fixed w-full border-collapse border border-gray-300 divide-y divide-gray-300">
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
          <div className="table-cell w-0 border-none"></div>
        </div>
      </div>
      <div className="table-row-group divide-y divide-gray-300">
        {poll.participants.map(participant =>
          participant.id === editParticipant?.id ? (
            <UpdateParticipantRow
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
        {!poll.closed && !editParticipant && (
          <>
            {poll.participants.length >= MAX_PARTICIPANTS ? (
              <MaxParticipantRow poll={poll} />
            ) : (
              <UpdateParticipantRow poll={poll} />
            )}
          </>
        )}
      </div>
      <div className="table-footer-group">
        <div className="table-row divide-x divide-gray-300 italic">
          <div className="table-cell px-2.5 py-2 align-middle">Totals</div>
          {totals.map((value, index) => (
            <div
              key={index}
              className={clsx({
                'table-cell p-4 text-center align-middle': true,
                'font-semibold text-2xl': value > 0 && value === highestTotal,
              })}
            >
              {value}
            </div>
          ))}
          <div className="table-cell w-0 border-none"></div>
        </div>
      </div>
    </div>
  );
}
