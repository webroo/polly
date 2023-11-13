import clsx from 'clsx';

export interface PollTitleProps {
  title: string;
  description: string;
}

export default function PollTitle({ title, description }: PollTitleProps) {
  return (
    <div className="text-center">
      <h1 className={clsx(description ? 'mb-5' : 'mb-8')}>{title}</h1>
      {description && <h2 className=" ml-0.5 mb-8">{description}</h2>}
    </div>
  );
}
