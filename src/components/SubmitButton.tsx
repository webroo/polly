import { PropsWithChildren } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export function SubmitButton({ children }: PropsWithChildren) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {children}
    </button>
  );
}
