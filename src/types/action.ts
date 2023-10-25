import { ZodFormattedError } from 'zod';

export interface ActionResult<T = any> {
  data?: T;
  serverError?: string;
  validationErrors?: ZodFormattedError<T>;
}
