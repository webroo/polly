import { typeToFlattenedError } from 'zod';

export interface ActionResult<T = any> {
  data?: T;
  serverError?: string;
  validationErrors?: typeToFlattenedError<T>;
}
