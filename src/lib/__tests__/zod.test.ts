import { flattenValidationErrors } from '../zod';

describe('flattenValidationErrors', () => {
  it('flattens formErrors and fieldErrors into a single array', () => {
    const flattened = flattenValidationErrors({
      formErrors: ['formError1', 'formError2'],
      fieldErrors: {
        field1: ['field1Error'],
        field2: ['field2Error'],
      },
    });

    expect(flattened).toEqual([
      'formError1',
      'formError2',
      'field1Error',
      'field2Error',
    ]);
  });
});
