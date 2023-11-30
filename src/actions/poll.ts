'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PollParticipant, Poll } from '@/types/poll';
import { ActionHandler } from '@/types/action';
import { parseFormData } from '@/lib/formdata';
import { actionErrorHandler } from '@/lib/action';
import {
  pollFormSchema,
  addParticipantFormSchema,
  editParticipantFormSchema,
  deleteParticipantFormSchema,
  DeleteParticipantFormSchema,
  EditParticipantFormSchema,
  AddParticipantFormSchema,
  PollFormSchema,
  ClosePollFormSchema,
  closePollFormSchema,
  reopenPollFormSchema,
} from '@/schemas/poll';
import {
  addParticipant,
  createPoll,
  deleteParticipant,
  updatePoll,
  updateParticipant,
  closePoll,
  reopenPoll,
} from '@/services/poll';

export const createPollAction: ActionHandler<PollFormSchema, Poll> =
  actionErrorHandler(async (_prevState, formData) => {
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
  });

export const updatePollAction: ActionHandler<PollFormSchema, Poll> =
  actionErrorHandler(async (_prevState, formData) => {
    const pollFormData = pollFormSchema.safeParse(parseFormData(formData));

    if (!pollFormData.success) {
      return { validationErrors: pollFormData.error.flatten() };
    }

    const pollId = await updatePoll(
      pollFormData.data.pollId,
      pollFormData.data.title,
      pollFormData.data.description,
      pollFormData.data.options,
    );

    revalidatePath('/polls/[pollId]', 'page');
    redirect(`/polls/${pollId}`);
  });

export const addParticipantAction: ActionHandler<
  AddParticipantFormSchema,
  PollParticipant
> = actionErrorHandler(async (_prevState, formData) => {
  const participantFormData = addParticipantFormSchema.safeParse(
    parseFormData(formData),
  );

  if (!participantFormData.success) {
    return { validationErrors: participantFormData.error.flatten() };
  }

  const participant = await addParticipant(
    participantFormData.data.pollId,
    participantFormData.data.name,
    participantFormData.data.selectedOptions,
  );

  revalidatePath('/polls/[pollId]', 'page');

  return { data: participant };
});

export const updateParticipantAction: ActionHandler<
  EditParticipantFormSchema,
  PollParticipant
> = actionErrorHandler(async (_prevState, formData) => {
  const participantFormData = editParticipantFormSchema.safeParse(
    parseFormData(formData),
  );

  if (!participantFormData.success) {
    return { validationErrors: participantFormData.error.flatten() };
  }

  await updateParticipant(
    participantFormData.data.pollId,
    participantFormData.data.participantId,
    participantFormData.data.name,
    participantFormData.data.selectedOptions,
  );

  revalidatePath('/polls/[pollId]', 'page');
  redirect(`/polls/${participantFormData.data.pollId}`);
});

export const deleteParticipantAction: ActionHandler<
  DeleteParticipantFormSchema,
  boolean
> = actionErrorHandler(async (_prevState, formData) => {
  const participantFormData = deleteParticipantFormSchema.safeParse(
    parseFormData(formData),
  );

  if (!participantFormData.success) {
    return { validationErrors: participantFormData.error.flatten() };
  }

  const success = await deleteParticipant(
    participantFormData.data.pollId,
    participantFormData.data.participantId,
  );

  revalidatePath('/polls/[pollId]', 'page');

  return { data: success };
});

export const closePollAction: ActionHandler<ClosePollFormSchema, boolean> =
  actionErrorHandler(async (_prevState, formData) => {
    const pollFormData = closePollFormSchema.safeParse(parseFormData(formData));

    if (!pollFormData.success) {
      return { validationErrors: pollFormData.error.flatten() };
    }

    const success = await closePoll(pollFormData.data.pollId);

    revalidatePath('/polls/[pollId]', 'page');

    return { data: success };
  });

export const reopenPollAction: ActionHandler<ClosePollFormSchema, boolean> =
  actionErrorHandler(async (_prevState, formData) => {
    const pollFormData = reopenPollFormSchema.safeParse(
      parseFormData(formData),
    );

    if (!pollFormData.success) {
      return { validationErrors: pollFormData.error.flatten() };
    }

    const success = await reopenPoll(pollFormData.data.pollId);

    revalidatePath('/polls/[pollId]', 'page');

    return { data: success };
  });
