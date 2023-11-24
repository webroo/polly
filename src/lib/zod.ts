import { typeToFlattenedError } from 'zod';

/**
 * Flattens the object returned by ZodError.flatten() even further, returning
 * an array of all error message strings. This can be useful if you want to
 * display a complete list of validation errors in a summary box.
 *
 * @param validationErrors Zod errors object from ZodError.flatten()
 * @returns Array of error message strings
 */
export function flattenValidationErrors<T, U>(
  validationErrors: typeToFlattenedError<T, U>,
): U[] {
  const fieldErrors = Object.entries(validationErrors.fieldErrors).flatMap(
    ([_fieldKey, fieldValue]) => fieldValue,
  ) as U[];

  return [...validationErrors.formErrors, ...fieldErrors];
}
