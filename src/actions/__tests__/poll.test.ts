import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createPollAction, updatePollAction } from '../poll';
import {
  addParticipant,
  createPoll,
  deleteParticipant,
  updatePoll,
  updateParticipant,
  closePoll,
  reopenPoll,
} from '@/services/poll';

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('../../services/poll', () => ({
  createPoll: jest.fn(),
  updatePoll: jest.fn(),
}));

describe('createPollAction', () => {
  it('creates a poll and redirects to the new poll page', async () => {
    jest.mocked(createPoll).mockResolvedValue('k34hNhf2hw49bv');

    const formData = new FormData();
    formData.append('pollId', 'k34hNhf2hw49bv');
    formData.append('title', 'foo');
    formData.append('description', 'bar');
    formData.append('options[0].id', '');
    formData.append('options[0].name', 'option-one');
    formData.append('options[1].id', '');
    formData.append('options[1].name', 'option-two');

    await createPollAction({}, formData);

    expect(createPoll).toHaveBeenCalledWith('foo', 'bar', [
      { id: '', name: 'option-one' },
      { id: '', name: 'option-two' },
    ]);
    expect(revalidatePath).toHaveBeenCalledWith('/polls/[pollId]', 'page');
    expect(redirect).toHaveBeenCalledWith('/polls/k34hNhf2hw49bv');
  });
});

describe('updatePollAction', () => {
  it('updates a poll and redirects to the poll page', async () => {
    jest.mocked(updatePoll).mockResolvedValue('k34hNhf2hw49bv');

    const formData = new FormData();
    formData.append('pollId', 'k34hNhf2hw49bv');
    formData.append('title', 'foo');
    formData.append('description', 'bar');
    formData.append('options[0].id', '');
    formData.append('options[0].name', 'option-one');
    formData.append('options[1].id', '');
    formData.append('options[1].name', 'option-two');

    await updatePollAction({}, formData);

    expect(updatePoll).toHaveBeenCalledWith('k34hNhf2hw49bv', 'foo', 'bar', [
      { id: '', name: 'option-one' },
      { id: '', name: 'option-two' },
    ]);
    expect(revalidatePath).toHaveBeenCalledWith('/polls/[pollId]', 'page');
    expect(redirect).toHaveBeenCalledWith('/polls/k34hNhf2hw49bv');
  });
});
