import { customAlphabet } from 'nanoid';

export const uniqueid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  14,
);
