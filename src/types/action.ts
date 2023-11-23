import { typeToFlattenedError } from 'zod';

export interface ActionResult<TFormDataSchema = any, TResultData = any> {
  data?: TResultData;
  serverError?: string;
  validationErrors?: typeToFlattenedError<TFormDataSchema>;
}

export interface ActionHandler<TFormDataSchema, TResultData> {
  (
    prevState: ActionResult<TFormDataSchema, TResultData>,
    formData: FormData,
  ): Promise<ActionResult<TFormDataSchema, TResultData>>;
}
