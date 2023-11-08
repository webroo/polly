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
  DeleteParticipantForm,
  EditParticipantForm,
  AddParticipantForm,
  PollForm,
  MAX_PARTICIPANTS,
  ClosePollForm,
  closePollFormSchema,
  reopenPollFormSchema,
} from '@/schemas/poll';
import {
  addParticipant,
  createPoll,
  deleteParticipant,
  updatePoll,
  updateParticipant,
  getPoll,
  closePoll,
  reopenPoll,
} from '@/services/poll';

export async function createPollAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult<PollForm, Poll> | never> {
  const pollFormData = pollFormSchema.safeParse(parseFormData(formData));

  if (!pollFormData.success) {
    return { validationErrors: pollFormData.error.flatten() };
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
): Promise<ActionResult<PollForm, Poll> | never> {
  const pollFormData = pollFormSchema.safeParse(parseFormData(formData));

  if (!pollFormData.success) {
    return { validationErrors: pollFormData.error.flatten() };
  }

  const poll = await getPoll(pollFormData.data.pollId);

  if (poll?.closed) {
    return { serverError: 'Poll closed' };
  }

  const pollId = await updatePoll(
    pollFormData.data.pollId,
    pollFormData.data.title,
    pollFormData.data.description,
    pollFormData.data.options,
  );

  revalidatePath('/polls/[pollId]', 'page');
  redirect(`/polls/${pollId}`);
}

export async function addParticipantAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult<AddParticipantForm, PollParticipant>> {
  const participantFormData = addParticipantFormSchema.safeParse(
    parseFormData(formData),
  );

  if (!participantFormData.success) {
    return { validationErrors: participantFormData.error.flatten() };
  }

  const poll = await getPoll(participantFormData.data.pollId);

  if (poll?.closed) {
    return { serverError: 'Poll closed' };
  } else if (poll && poll.participants.length >= MAX_PARTICIPANTS) {
    return { serverError: 'Max participants reached' };
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
): Promise<ActionResult<EditParticipantForm, PollParticipant> | never> {
  const participantFormData = editParticipantFormSchema.safeParse(
    parseFormData(formData),
  );

  if (!participantFormData.success) {
    return { validationErrors: participantFormData.error.flatten() };
  }

  const poll = await getPoll(participantFormData.data.pollId);

  if (poll?.closed) {
    return { serverError: 'Poll closed' };
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
): Promise<ActionResult<DeleteParticipantForm, boolean>> {
  const participantFormData = deleteParticipantFormSchema.safeParse(
    parseFormData(formData),
  );

  if (!participantFormData.success) {
    return { validationErrors: participantFormData.error.flatten() };
  }

  const poll = await getPoll(participantFormData.data.pollId);

  if (poll?.closed) {
    return { serverError: 'Poll closed' };
  }

  const success = await deleteParticipant(
    participantFormData.data.pollId,
    participantFormData.data.participantId,
  );

  revalidatePath('/polls/[pollId]', 'page');

  return { data: success };
}

export async function closePollAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult<ClosePollForm, boolean>> {
  const pollFormData = closePollFormSchema.safeParse(parseFormData(formData));

  if (!pollFormData.success) {
    return { validationErrors: pollFormData.error.flatten() };
  }

  const success = await closePoll(pollFormData.data.pollId);

  revalidatePath('/polls/[pollId]', 'page');

  return { data: success };
}

export async function reopenPollAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult<ClosePollForm, boolean>> {
  const pollFormData = reopenPollFormSchema.safeParse(parseFormData(formData));

  if (!pollFormData.success) {
    return { validationErrors: pollFormData.error.flatten() };
  }

  const success = await reopenPoll(pollFormData.data.pollId);

  revalidatePath('/polls/[pollId]', 'page');

  return { data: success };
}
