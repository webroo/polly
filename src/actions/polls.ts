'use server';

import { revalidatePath } from 'next/cache';
import { addParticipant, createPoll } from '@/services/polls';
import { PollParticipant, Poll } from '@/types/poll';

export async function createPollAction(
  formData: FormData,
): Promise<FormActionResponse<Poll>> {
  try {
    const poll = await createPoll(
      String(formData.get('title')),
      String(formData.get('description')),
      formData.getAll('options').map(String),
    );

    revalidatePath('/polls/[pollId]', 'page');

    return { data: poll };
  } catch (error) {
    return { error: 'Unable to create poll' };
  }
}

export async function addParticipantAction(
  formData: FormData,
): Promise<FormActionResponse<PollParticipant>> {
  try {
    const participant = await addParticipant(
      String(formData.get('pollId')),
      String(formData.get('name')),
      formData.getAll('selectedOptions').map(String),
    );

    revalidatePath('/polls/[pollId]', 'page');

    return { data: participant };
  } catch (error) {
    return { error: 'Unable to add participant response' };
  }
}
