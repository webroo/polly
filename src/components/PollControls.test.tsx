import { render, screen } from '@testing-library/react';
import PollControls from './PollControls';
import { Poll } from '@/types/poll';

jest.mock('../services/poll', () => ({}));

jest.mock('react-dom', () => {
  const originalModule = jest.requireActual('react-dom');
  return {
    ...originalModule,
    useFormState: jest.fn(() => [{}, 'form-action']),
    useFormStatus: jest.fn(() => ({ pending: false })),
  };
});

describe('PollControls', () => {
  let mockPoll: Poll;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';

    mockPoll = {
      id: 'poll-id-1',
      title: 'Foo',
      description: 'Bar',
      options: [{ id: 'option-id-1', name: 'Option one' }],
      participants: [
        {
          id: 'participant-id-1',
          name: 'Participant one',
          selectedOptions: ['option-id-1'],
        },
      ],
      closed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  it('renders the share link', () => {
    render(<PollControls poll={mockPoll} />);

    expect(
      screen.getByDisplayValue('http://localhost:3000/polls/poll-id-1'),
    ).toBeInTheDocument();
  });

  it('renders controls for an open poll', () => {
    mockPoll.closed = false;
    render(<PollControls poll={mockPoll} />);

    expect(
      screen.getByText('This poll is still open for voting.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Edit this poll' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Conclude this poll' }),
    ).toBeInTheDocument();
  });
  it('renders controls for a closed poll', () => {
    mockPoll.closed = true;
    render(<PollControls poll={mockPoll} />);

    expect(
      screen.getByText('This poll is now closed, thank you for participating.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Reopen this poll' }),
    ).toBeInTheDocument();
  });
});
