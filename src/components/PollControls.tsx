'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import clsx from 'clsx';
import { Poll } from '@/types/poll';
import SubmitButton from '@/components/SubmitButton';
import { closePollAction, reopenPollAction } from '@/actions/poll';
import {
  ClipboardCheckedIcon,
  ClipboardListIcon,
  LinkIcon,
} from '@/components/Icons';

export interface PollControlsProps {
  poll: Poll;
}

export default function PollControls({ poll }: PollControlsProps) {
  const [pageUrl, setPageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const [, closePollFormAction] = useFormState(closePollAction, {});
  const [, reopenPollFormAction] = useFormState(reopenPollAction, {});

  function copyLink() {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  useEffect(() => {
    setPageUrl(`${window.location.origin}/polls/${poll.id}`);
  }, [poll]);

  return (
    <div className="flex justify-between mt-10">
      <div className="w-1/2">
        <h2 className="mb-2">
          {poll.closed ? 'Share poll results' : 'Share this poll'}
        </h2>
        <div className="mb-2 text-sm">
          {poll.closed
            ? 'Share the link below with friends so they can see the results:'
            : 'Share the link below with friends so they can participate:'}
        </div>
        <div className="flex items-stretch h-9 gap-1">
          <div className="flex flex-1 items-center border rounded-md border-gray-300 shadow-sm">
            <LinkIcon />
            <input
              value={pageUrl}
              readOnly
              className="flex-1 pl-2 py-0 text-sm border-none shadow-none focus:outline-none"
              onClick={event => (event.target as HTMLInputElement).select()}
            />
          </div>
          <button
            className={clsx(
              'btn text-xs font-normal py-0',
              copied ? 'text-green-600' : 'text-neutral-600',
            )}
            onClick={copyLink}
          >
            <span className="mr-0.5">
              {copied ? 'Copied to Clipboard' : 'Copy to Clipboard'}
            </span>
            {copied ? <ClipboardCheckedIcon /> : <ClipboardListIcon />}
          </button>
        </div>
      </div>
      <form>
        <input name="pollId" type="hidden" value={poll.id} />
        <h2 className="mb-2">
          {poll.closed ? 'Poll concluded' : 'Poll controls'}
        </h2>
        <div className="mb-2 text-sm">
          {poll.closed
            ? 'This poll is now closed, thank you for participating.'
            : 'This poll is still open for voting.'}
        </div>
        <div className="flex items-stretch h-9">
          {poll.closed ? (
            <SubmitButton
              className="btn text-xs font-normal text-neutral-600 py-0"
              formAction={reopenPollFormAction}
              onClick={e =>
                !confirm('Do you want to reopen this poll?') &&
                e.preventDefault()
              }
            >
              Reopen this poll
            </SubmitButton>
          ) : (
            <>
              <Link
                href={`/polls/${poll.id}/edit`}
                className="btn text-xs font-normal text-neutral-600 py-0"
              >
                Edit this poll
              </Link>
              <SubmitButton
                className="btn text-xs font-normal text-neutral-600 py-0 ml-2"
                formAction={closePollFormAction}
                onClick={e =>
                  !confirm('Do you want to close and conclude this poll?') &&
                  e.preventDefault()
                }
              >
                Conclude this poll
              </SubmitButton>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
