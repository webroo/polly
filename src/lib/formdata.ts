import qs from 'qs';

export function parseFormData(formData: FormData): any {
  // Serialize FormData to a query string, removing any NextJS internal keys
  // that start with '$'.
  const querystring = Array.from(formData.entries())
    .filter(entry => !entry[0].startsWith('$'))
    .map(entry => entry.join('='))
    .join('&');

  return qs.parse(querystring, { allowDots: true });
}
