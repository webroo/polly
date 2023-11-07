'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import clsx from 'clsx';
import { Poll } from '@/types/poll';
import SubmitButton from '@/components/SubmitButton';
import { closePollAction } from '@/actions/poll';
import {
  ClipboardCheckedIcon,
  ClipboardListIcon,
  LinkIcon,
} from '@/components/Icons';

export interface FooterProps {
  poll: Poll;
}

export default function Footer({ poll }: FooterProps) {
  const [pageUrl, setPageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const [_formState, formAction] = useFormState(closePollAction, {});

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
        <h2 className="mb-2">Share this poll</h2>
        <div className="mb-2 text-sm">
          Share the link below with friends so they can participate in the poll:
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
      <div>
        {!poll.closed && (
          <form action={formAction}>
            <input name="pollId" type="hidden" value={poll.id} />
            <h2 className="mb-2">Poll status</h2>
            <div className="mb-2 text-sm">
              This poll is still open for voting. You can:
            </div>
            <div className="flex items-stretch h-9">
              <Link
                href={`/polls/${poll.id}/edit`}
                className="btn text-xs font-normal text-neutral-600 py-0"
              >
                Edit this poll
              </Link>
              <SubmitButton
                className="btn text-xs font-normal text-neutral-600 py-0 ml-2"
                onClick={e =>
                  confirm('Do you want to conclude and close this poll?')
                    ? undefined
                    : e.preventDefault()
                }
              >
                Conclude this poll
              </SubmitButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
