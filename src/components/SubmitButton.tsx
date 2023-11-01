import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';

export function SubmitButton({
  children,
  onClick,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={onClick}
      className={className ?? 'btn-primary'}
      {...props}
    >
      {children}
    </button>
  );
}
