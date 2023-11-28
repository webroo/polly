import { render, screen } from '@testing-library/react';
import { ErrorAlert, SuccessAlert } from '../Alerts';

describe('SuccessAlert', () => {
  it('renders a title without a list of message', () => {
    render(<SuccessAlert title="Sucess title" />);

    expect(
      screen.getByRole('heading', { name: 'Sucess title' }),
    ).toBeInTheDocument();

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders a title and list of messages', () => {
    render(<SuccessAlert title="Sucess title" messages={['foo', 'bar']} />);

    expect(
      screen.getByRole('heading', { name: 'Sucess title' }),
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole('listitem').map(item => item.textContent),
    ).toEqual(['foo', 'bar']);
  });
});

describe('ErrorAlert', () => {
  it('renders a title without a list of message', () => {
    render(<ErrorAlert title="Error title" />);

    expect(
      screen.getByRole('heading', { name: 'Error title' }),
    ).toBeInTheDocument();

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders a title and list of messages', () => {
    render(<ErrorAlert title="Error title" messages={['foo', 'bar']} />);

    expect(
      screen.getByRole('heading', { name: 'Error title' }),
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole('listitem').map(item => item.textContent),
    ).toEqual(['foo', 'bar']);
  });
});
