'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PollParticipant, Poll } from '@/types/poll';
import { ActionResult } from '@/types/action';
import {
  addParticipantFormSchema,
  createPollFormSchema,
  updateParticipantFormSchema,
} from '@/schemas/poll';
import {
  addParticipant,
  createPoll,
  deleteParticipant,
  updateParticipant,
} from '@/services/poll';

export async function createPollAction(
  _prevState: ActionResult,
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
  redirect(`/polls/${poll.id}`);
}

export async function addParticipantAction(
  _prevState: ActionResult,
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

export async function updateParticipantAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult<PollParticipant>> {
  const participantFormData = updateParticipantFormSchema.safeParse({
    pollId: formData.get('pollId'),
    participantId: formData.get('participantId'),
    name: formData.get('name'),
    selectedOptions: formData.getAll('selectedOptions'),
  });

  if (!participantFormData.success) {
    return { validationErrors: participantFormData.error.format() };
  }

  const participant = await updateParticipant(
    participantFormData.data.pollId,
    participantFormData.data.participantId,
    participantFormData.data.name,
    participantFormData.data.selectedOptions,
  );

  revalidatePath('/polls/[pollId]', 'page');

  return { data: participant };
}

export async function deleteParticipantAction(
  pollId: string,
  participantId: string,
): Promise<ActionResult<boolean>> {
  const success = await deleteParticipant(pollId, participantId);

  revalidatePath('/polls/[pollId]', 'page');

  return { data: success };
}
