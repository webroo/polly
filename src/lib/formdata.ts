import qs from 'qs';

/**
 * A FormData parser that supports nested objects and arrays.
 *
 * @param formData FormData object
 * @returns Plain JavaScript object
 */
export function parseFormData(formData: FormData): any {
  // Serialize FormData to a query string, removing any internal NextJS keys that start with '$'.
  const querystring = Array.from(formData.entries())
    .filter(entry => !entry[0].startsWith('$'))
    .map(entry => entry.join('='))
    .join('&');

  return qs.parse(querystring, { allowDots: true });
}
