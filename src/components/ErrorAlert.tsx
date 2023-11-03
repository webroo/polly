import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { ErrorIcon } from '@/components/Icons';

export interface ErrorAlertProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  messages?: string[];
}

export default function ErrorAlert({
  title,
  messages,
  className,
  ...props
}: ErrorAlertProps) {
  return (
    <div
      className={clsx('flex gap-3 p-3 bg-red-50 rounded-md text-sm', className)}
      {...props}
    >
      <ErrorIcon />
      <div>
        <h3 className="text-red-800 font-semibold">{title}</h3>
        {messages && (
          <ul className="text-red-700 space-y-1 pl-2 mt-1">
            {messages.map(message => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
