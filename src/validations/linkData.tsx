import { z } from 'zod';

export const linkSchema = z.object({
  url: z
    .string()
    .url({
      message: 'Please enter a valid URL',
    })
    .max(500),
});

export type LinkData = z.infer<typeof linkSchema>;
