import { render, screen } from '@testing-library/react';
import PollTitle from '../PollTitle';

describe('PollTitle', () => {
  it('renders a poll title without description', () => {
    render(<PollTitle title="Foo" />);

    expect(screen.getAllByRole('heading')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Foo' })).toBeInTheDocument();
  });

  it('renders a poll title with a description', () => {
    render(<PollTitle title="Foo" description="Bar" />);

    expect(screen.getAllByRole('heading')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'Foo' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Bar' })).toBeInTheDocument();
  });
});
