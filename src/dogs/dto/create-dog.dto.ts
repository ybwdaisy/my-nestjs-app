import { z } from 'zod';

export const createDogSchema = z
  .object({
    name: z.string(),
    age: z.number(),
  })
  .required();

export type CreateDogDto = z.infer<typeof createDogSchema>;
