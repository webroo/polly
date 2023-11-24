import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addParticipantAction,
  closePollAction,
  createPollAction,
  deleteParticipantAction,
  reopenPollAction,
  updateParticipantAction,
  updatePollAction,
} from '../poll';
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
  addParticipant: jest.fn(),
  createPoll: jest.fn(),
  deleteParticipant: jest.fn(),
  updatePoll: jest.fn(),
  updateParticipant: jest.fn(),
  closePoll: jest.fn(),
  reopenPoll: jest.fn(),
}));

describe('createPollAction', () => {
  it('creates a poll and redirects to the new poll page', async () => {
    jest.mocked(createPoll).mockResolvedValue('mock-poll-id-1');

    const formData = new FormData();
    formData.append('pollId', 'mock-poll-id-1');
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
    expect(redirect).toHaveBeenCalledWith('/polls/mock-poll-id-1');
  });
});

describe('updatePollAction', () => {
  it('updates a poll and redirects to the poll page', async () => {
    jest.mocked(updatePoll).mockResolvedValue('mock-poll-id-1');

    const formData = new FormData();
    formData.append('pollId', 'mock-poll-id-1');
    formData.append('title', 'foo');
    formData.append('description', 'bar');
    formData.append('options[0].id', '');
    formData.append('options[0].name', 'option-one');
    formData.append('options[1].id', '');
    formData.append('options[1].name', 'option-two');

    await updatePollAction({}, formData);

    expect(updatePoll).toHaveBeenCalledWith('mock-poll-id-1', 'foo', 'bar', [
      { id: '', name: 'option-one' },
      { id: '', name: 'option-two' },
    ]);
    expect(revalidatePath).toHaveBeenCalledWith('/polls/[pollId]', 'page');
    expect(redirect).toHaveBeenCalledWith('/polls/mock-poll-id-1');
  });
});

describe('addParticipantAction', () => {
  it('adds a participant and returns the new participant object', async () => {
    const mockParticipant = {
      id: 'mock-poll-id-1',
      name: 'mock-name',
      selectedOptions: ['mock-optn-id-1', 'mock-optn-id-2'],
    };

    jest.mocked(addParticipant).mockResolvedValue(mockParticipant);

    const formData = new FormData();
    formData.append('pollId', 'mock-poll-id-1');
    formData.append('name', 'mock-name');
    formData.append('selectedOptions[]', 'mock-optn-id-1');
    formData.append('selectedOptions[]', 'mock-optn-id-2');

    const result = await addParticipantAction({}, formData);

    expect(result.data).toEqual(mockParticipant);
    expect(addParticipant).toHaveBeenCalledWith('mock-poll-id-1', 'mock-name', [
      'mock-optn-id-1',
      'mock-optn-id-2',
    ]);
    expect(revalidatePath).toHaveBeenCalledWith('/polls/[pollId]', 'page');
  });
});

describe('updateParticipantAction', () => {
  it('updates a participant and redirects to the poll page', async () => {
    const mockParticipant = {
      id: 'mock-poll-id-1',
      name: 'mock-name',
      selectedOptions: ['mock-optn-id-1', 'mock-optn-id-2'],
    };

    jest.mocked(updateParticipant).mockResolvedValue(mockParticipant);

    const formData = new FormData();
    formData.append('pollId', 'mock-poll-id-1');
    formData.append('name', 'mock-name');
    formData.append('selectedOptions[]', 'mock-optn-id-1');
    formData.append('selectedOptions[]', 'mock-optn-id-2');

    await updateParticipantAction({}, formData);

    expect(addParticipant).toHaveBeenCalledWith('mock-poll-id-1', 'mock-name', [
      'mock-optn-id-1',
      'mock-optn-id-2',
    ]);
    expect(revalidatePath).toHaveBeenCalledWith('/polls/[pollId]', 'page');
    expect(redirect).toHaveBeenCalledWith('/polls/mock-poll-id-1');
  });
});

describe('deleteParticipantAction', () => {
  it('deletes a participant and returns true', async () => {
    jest.mocked(deleteParticipant).mockResolvedValue(true);

    const formData = new FormData();
    formData.append('pollId', 'mock-poll-id-1');
    formData.append('participantId', 'mock-part-id-1');

    const result = await deleteParticipantAction({}, formData);

    expect(result.data).toBe(true);
    expect(deleteParticipant).toHaveBeenCalledWith(
      'mock-poll-id-1',
      'mock-part-id-1',
    );
    expect(revalidatePath).toHaveBeenCalledWith('/polls/[pollId]', 'page');
  });
});

describe('closePollAction', () => {
  it('closes a poll and returns true', async () => {
    jest.mocked(closePoll).mockResolvedValue(true);

    const formData = new FormData();
    formData.append('pollId', 'mock-poll-id-1');

    const result = await closePollAction({}, formData);

    expect(result.data).toBe(true);
    expect(revalidatePath).toHaveBeenCalledWith('/polls/[pollId]', 'page');
  });
});

describe('reopenPollAction', () => {
  it('re-opens a poll and returns true', async () => {
    jest.mocked(reopenPoll).mockResolvedValue(true);

    const formData = new FormData();
    formData.append('pollId', 'mock-poll-id-1');

    const result = await reopenPollAction({}, formData);

    expect(result.data).toBe(true);
    expect(revalidatePath).toHaveBeenCalledWith('/polls/[pollId]', 'page');
  });
});
