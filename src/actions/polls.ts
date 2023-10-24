'use server';

import { revalidatePath } from 'next/cache';
import { addParticipant, createPoll } from '@/services/polls';
import { PollParticipant, Poll } from '@/types/poll';

export async function createPollAction(formData: FormData): Promise<Poll> {
  const poll = await createPoll(
    String(formData.get('title')),
    String(formData.get('description')),
    formData.getAll('options').map(String),
  );

  revalidatePath('/polls/[pollId]', 'page');

  return poll;
}

export async function addParticipantAction(
  formData: FormData,
): Promise<PollParticipant> {
  const participant = await addParticipant(
    String(formData.get('pollId')),
    String(formData.get('name')),
    formData.getAll('selectedOptions').map(String),
  );

  revalidatePath('/polls/[pollId]', 'page');

  return participant;
}
