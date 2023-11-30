import { typeToFlattenedError } from 'zod';

/**
 * Return value of a server action function. This is used to provide a
 * consistent and predictable interface for server action responses.
 */
export interface ActionResult<TFormDataSchema = any, TResultData = any> {
  data?: TResultData;
  serverError?: string;
  validationErrors?: typeToFlattenedError<TFormDataSchema>;
}

/**
 * Function signature for a server action that's executed via a useFormState() hook.
 * This type of server action is used to handle form submissions from the client.
 */
export interface ActionHandler<TFormDataSchema, TResultData> {
  (
    prevState: ActionResult<TFormDataSchema, TResultData>,
    formData: FormData,
  ): Promise<ActionResult<TFormDataSchema, TResultData>>;
}
