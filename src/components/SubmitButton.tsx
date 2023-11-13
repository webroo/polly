import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function SubmitButton({
  children,
  onClick,
  className,
  ...props
}: SubmitButtonProps) {
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
