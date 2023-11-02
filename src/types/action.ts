import { typeToFlattenedError } from 'zod';

export interface ActionResult<InputSchema = any, ResultData = any> {
  data?: ResultData;
  serverError?: string;
  validationErrors?: typeToFlattenedError<InputSchema>;
}
