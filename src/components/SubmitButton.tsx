import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';

export function SubmitButton({
  children,
  onClick,
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} onClick={onClick}>
      {children}
    </button>
  );
}
