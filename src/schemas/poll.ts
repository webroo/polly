import { z } from 'zod';

export const pollFormSchema = z.object({
  pollId: z.string(),
  title: z.string().trim().min(1),
  description: z.string().trim(),
  options: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().trim(),
      }),
    )
    .transform(options => options.filter(option => Boolean(option.name)))
    .refine(options => options.length >= 2, {
      message: 'Please provide at least two options',
    }),
});

export const addParticipantFormSchema = z.object({
  pollId: z.string(),
  name: z.string().trim().min(1),
  selectedOptions: z.array(z.string()).default([]),
});

export const updateParticipantFormSchema = z.object({
  pollId: z.string(),
  participantId: z.string(),
  name: z.string().trim().min(1),
  selectedOptions: z.array(z.string()).default([]),
});
