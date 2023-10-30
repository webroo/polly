import { z } from 'zod';
import { UNIQUE_ID_SIZE } from '@/lib/uniqueid';

export const pollFormSchema = z.object({
  pollId: z.union([z.string().length(0), z.string().length(UNIQUE_ID_SIZE)]),
  title: z.string().trim().min(1).max(100),
  description: z.string().trim().max(100),
  options: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().trim().max(50),
      }),
    )
    .transform(options => options.filter(option => Boolean(option.name)))
    .pipe(z.array(z.any()).min(2).max(10)),
});

export const addParticipantFormSchema = z.object({
  pollId: z.string().length(UNIQUE_ID_SIZE),
  name: z.string().trim().min(1).max(40),
  selectedOptions: z.array(z.string().length(UNIQUE_ID_SIZE)).default([]),
});

export const editParticipantFormSchema = addParticipantFormSchema.extend({
  participantId: z.string().length(UNIQUE_ID_SIZE),
});

export const deleteParticipantFormSchema = z.object({
  pollId: z.string().length(UNIQUE_ID_SIZE),
  participantId: z.string().length(UNIQUE_ID_SIZE),
});
