'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PollParticipant, Poll } from '@/types/poll';
import { ActionResult } from '@/types/action';
import { parseFormData } from '@/lib/formdata';
import {
  pollFormSchema,
  addParticipantFormSchema,
  editParticipantFormSchema,
  deleteParticipantFormSchema,
} from '@/schemas/poll';
import {
  addParticipant,
  createPoll,
  deleteParticipant,
  udpatePoll,
  updateParticipant,
} from '@/services/poll';

export async function createPollAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult<Poll> | never> {
  const pollFormData = pollFormSchema.safeParse(parseFormData(formData));

  if (!pollFormData.success) {
    return { validationErrors: pollFormData.error.format() };
  }

  const pollId = await createPoll(
    pollFormData.data.title,
    pollFormData.data.description,
    pollFormData.data.options,
  );

  revalidatePath('/polls/[pollId]', 'page');
  redirect(`/polls/${pollId}`);
}

export async function updatePollAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult<Poll> | never> {
  const parsedFormData = parseFormData(formData);

  const validatedFormData = pollFormSchema.safeParse(parsedFormData);

  if (!validatedFormData.success) {
    return { validationErrors: validatedFormData.error.format() };
  }

  const pollId = await udpatePoll(
    validatedFormData.data.pollId,
    validatedFormData.data.title,
    validatedFormData.data.description,
    validatedFormData.data.options,
  );

  revalidatePath('/polls/[pollId]', 'page');
  redirect(`/polls/${pollId}`);
}

export async function addParticipantAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult<PollParticipant>> {
  const participantFormData = addParticipantFormSchema.safeParse(
    parseFormData(formData),
  );

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
): Promise<ActionResult<PollParticipant> | never> {
  const participantFormData = editParticipantFormSchema.safeParse(
    parseFormData(formData),
  );

  if (!participantFormData.success) {
    return { validationErrors: participantFormData.error.format() };
  }

  await updateParticipant(
    participantFormData.data.pollId,
    participantFormData.data.participantId,
    participantFormData.data.name,
    participantFormData.data.selectedOptions,
  );

  revalidatePath('/polls/[pollId]', 'page');
  redirect(`/polls/${participantFormData.data.pollId}`);
}

export async function deleteParticipantAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult<boolean>> {
  const participantFormData = deleteParticipantFormSchema.safeParse(
    parseFormData(formData),
  );

  if (!participantFormData.success) {
    return { validationErrors: participantFormData.error.format() };
  }

  const success = await deleteParticipant(
    participantFormData.data.pollId,
    participantFormData.data.participantId,
  );

  revalidatePath('/polls/[pollId]', 'page');

  return { data: success };
}
