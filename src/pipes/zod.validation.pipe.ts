/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodInvalidTypeIssue, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      const { issues } = error as ZodError;
      const [{ code, expected, received, path }] =
        issues as ZodInvalidTypeIssue[];
      throw new BadRequestException(
        `[${code.toUpperCase()}]: ${path.join()} expected ${expected}, but received ${received}`,
      );
    }
  }
}
