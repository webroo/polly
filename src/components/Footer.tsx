'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Poll } from '@/types/poll';
import { ClipboardCheckedIcon, ClipboardListIcon, LinkIcon } from './Icons';

export interface FooterProps {
  poll: Poll;
}

export default function Footer({ poll }: FooterProps) {
  const [pageUrl, setPageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  useEffect(() => {
    setPageUrl(`${window.location.origin}/polls/${poll.id}`);
  }, [poll]);

  return (
    <div className="w-1/2 mx-auto mt-10">
      <h2 className="mb-2">Share this poll</h2>
      <div className="mb-2 text-sm">
        Share the link below with friends so they can participate in the poll:
      </div>
      <div className="flex items-stretch gap-1">
        <div className="flex flex-1 items-center border rounded-md border-gray-300 shadow-sm">
          <LinkIcon />
          <input
            value={pageUrl}
            readOnly
            className="flex-1 pl-2 text-sm border-none shadow-none focus:outline-none"
            onClick={event => (event.target as HTMLInputElement).select()}
          />
        </div>
        <button
          className={clsx(
            'btn text-xs font-normal py-1',
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
  );
}
