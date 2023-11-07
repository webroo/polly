import { z } from 'zod';
import { UNIQUE_ID_SIZE } from '@/lib/uniqueid';

export const MAX_PARTICIPANTS = 30;

export const pollFormSchema = z.object({
  pollId: z.union([z.string().length(0), z.string().length(UNIQUE_ID_SIZE)]),
  title: z
    .string()
    .trim()
    .min(1, 'Please enter a name for your poll')
    .max(50, 'The name of your poll is too long'),
  description: z
    .string()
    .trim()
    .max(100, 'The additional information is too long'),
  options: z
    .array(
      z.object({
        id: z.string(),
        name: z
          .string()
          .trim()
          .max(50, 'One or more of your options is too long'),
      }),
    )
    .transform(options => options.filter(option => Boolean(option.name)))
    .pipe(
      z
        .array(z.any())
        .min(2, 'Please provide at least 2 options')
        .max(10, 'Too many options provided'),
    ),
});

export const addParticipantFormSchema = z.object({
  pollId: z.string().length(UNIQUE_ID_SIZE),
  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name')
    .max(40, 'The name you entered is too long'),
  selectedOptions: z.array(z.string().length(UNIQUE_ID_SIZE)).default([]),
});

export const editParticipantFormSchema = addParticipantFormSchema.extend({
  participantId: z.string().length(UNIQUE_ID_SIZE),
});

export const deleteParticipantFormSchema = z.object({
  pollId: z.string().length(UNIQUE_ID_SIZE),
  participantId: z.string().length(UNIQUE_ID_SIZE),
});

export const closePollFormSchema = z.object({
  pollId: z.string().length(UNIQUE_ID_SIZE),
});

export type PollForm = z.infer<typeof pollFormSchema>;
export type AddParticipantForm = z.infer<typeof addParticipantFormSchema>;
export type EditParticipantForm = z.infer<typeof editParticipantFormSchema>;
export type DeleteParticipantForm = z.infer<typeof deleteParticipantFormSchema>;
export type ClosePollForm = z.infer<typeof closePollFormSchema>;
