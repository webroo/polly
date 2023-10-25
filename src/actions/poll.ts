'use server';

import { revalidatePath } from 'next/cache';
import { addParticipantFormSchema, createPollFormSchema } from '@/schemas/poll';
import { addParticipant, createPoll } from '@/services/poll';
import { PollParticipant, Poll } from '@/types/poll';
import { ActionResult } from '@/types/action';

export async function createPollAction(
  formData: FormData,
): Promise<ActionResult<Poll>> {
  const pollFormData = createPollFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    options: formData.getAll('options'),
  });

  if (!pollFormData.success) {
    return { validationErrors: pollFormData.error.format() };
  }

  const poll = await createPoll(
    pollFormData.data.title,
    pollFormData.data.description,
    pollFormData.data.options,
  );

  revalidatePath('/polls/[pollId]', 'page');

  return { data: poll };
}

export async function addParticipantAction(
  formData: FormData,
): Promise<ActionResult<PollParticipant>> {
  const participantFormData = addParticipantFormSchema.safeParse({
    pollId: formData.get('pollId'),
    name: formData.get('name'),
    selectedOptions: formData.getAll('selectedOptions'),
  });

  if (!participantFormData.success) {
    return { validationErrors: participantFormData.error.format() };
  }

  const participant = await addParticipant(
    participantFormData.data.pollId,
    participantFormData.data.name,
    participantFormData.data.selectedOptions,
  );

  revalidatePath('/polls/[pollId]', 'page');

  return { data: participant };
}
