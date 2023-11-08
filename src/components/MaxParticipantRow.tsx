'use client';

import { Poll } from '@/types/poll';
import SubmitButton from './SubmitButton';
import { useFormState } from 'react-dom';
import { closePollAction } from '@/actions/poll';

export interface MaxParticipantRowProps {
  poll: Poll;
}

export default function MaxParticipantRow({ poll }: MaxParticipantRowProps) {
  const [, formAction] = useFormState(closePollAction, {});

  return (
    <div className="table-row relative h-24 bg-gray-500/5 outline outline-2 outline-gray-800 outline-offset-[-1px]">
      <form action={formAction} className="contents divide-x divide-gray-300">
        <input name="pollId" type="hidden" value={poll.id} />
        <div className="table-cell px-2.5 py-2 align-top">
          <div className="absolute left-8 right-8 top-5 p-2 bg-white rounded-md border border-gray-300 shadow-md">
            <div className="text-center">
              <span className="font-serif italic mr-2">
                You&apos;ve reached the maximum number of participants for this
                poll. You can now
              </span>
              <SubmitButton
                className="btn-primary py-2"
                onClick={e =>
                  !confirm('Do you want to conclude and close this poll?') &&
                  e.preventDefault()
                }
              >
                Conclude Poll
              </SubmitButton>
            </div>
          </div>
        </div>
        {poll.options.map(option => (
          <div
            key={option.id}
            className="table-cell px-2.5 py-2 pt-8 text-center"
          ></div>
        ))}
      </form>
    </div>
  );
}
