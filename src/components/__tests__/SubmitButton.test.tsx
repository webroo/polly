import { FormStatus, useFormStatus } from 'react-dom';
import { render, screen } from '@testing-library/react';
import SubmitButton from '../SubmitButton';

jest.mock('react-dom', () => {
  const originalModule = jest.requireActual('react-dom');
  return {
    ...originalModule,
    useFormStatus: jest.fn(),
  };
});

describe('SubmitButton', () => {
  beforeEach(() => {
    jest
      .mocked(useFormStatus)
      .mockReturnValue({ pending: false } as FormStatus);
  });

  it('renders a submit button', () => {
    render(<SubmitButton>Submit</SubmitButton>);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders a submit button with a pending state', () => {
    jest.mocked(useFormStatus).mockReturnValue({ pending: true } as FormStatus);

    render(
      <SubmitButton submittingText="Submitting" spinner>
        Submit
      </SubmitButton>,
    );

    expect(
      screen.getByRole('button', { name: 'Submitting' }),
    ).toBeInTheDocument();
  });
});
