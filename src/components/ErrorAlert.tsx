import clsx from 'clsx';
import { HTMLAttributes } from 'react';

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className="w-5 h-5 fill-red-400"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
        ></path>
      </svg>
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
