import { Poll } from '@/types/poll';

export interface MaxParticipantRowProps {
  poll: Poll;
}

export default function MaxParticipantRow({ poll }: MaxParticipantRowProps) {
  return (
    <div className="table-row relative h-20 bg-gray-500/5 outline outline-2 outline-gray-800 outline-offset-[-1px]">
      <div className="table-cell px-2.5 py-2 align-top">
        <div className="absolute left-8 right-8 top-4 p-2 bg-white rounded-md border border-gray-300 shadow-md">
          <div className="text-center">
            <span className="font-serif italic mr-2">
              You&apos;ve reached the maximum number of participants for this
              poll.
            </span>
          </div>
        </div>
      </div>
      {poll.options.map(option => (
        <div
          key={option.id}
          className="table-cell px-2.5 py-2 pt-8 text-center"
        ></div>
      ))}
    </div>
  );
}
