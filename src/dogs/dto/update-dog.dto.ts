import { z } from 'zod';

export const updateDogSchema = z.object({
  name: z.string().optional(),
  age: z.number().optional(),
});

export type UpdateDogDto = z.infer<typeof updateDogSchema>;
