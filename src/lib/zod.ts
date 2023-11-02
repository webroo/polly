import { typeToFlattenedError } from 'zod';

export function flattenValidationErrors<T, U>(
  validationErrors: typeToFlattenedError<T, U>,
): U[] {
  const fieldErrors = Object.entries(validationErrors.fieldErrors).flatMap(
    ([_fieldKey, fieldValue]) => fieldValue,
  ) as U[];

  return [...validationErrors.formErrors, ...fieldErrors];
}
