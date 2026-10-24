import { z } from 'zod';

export const updateDogSchema = z.object({
  name: z.string(),
  age: z.number(),
});

export type UpdateDogDto = z.infer<typeof updateDogSchema>;
