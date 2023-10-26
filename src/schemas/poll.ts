import { z } from 'zod';

export const createPollFormSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim(),
  options: z
    .array(z.string().trim())
    .transform(v => v.filter(Boolean))
    .pipe(z.array(z.string()).min(2)),
});

export const addParticipantFormSchema = z.object({
  pollId: z.string(),
  name: z.string().trim().min(1),
  selectedOptions: z.array(z.string()),
});

export const updateParticipantFormSchema = z.object({
  pollId: z.string(),
  participantId: z.string(),
  name: z.string().trim().min(1),
  selectedOptions: z.array(z.string()),
});
