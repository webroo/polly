import { customAlphabet } from 'nanoid';

export const UNIQUE_ID_SIZE = 14;

export const uniqueid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  UNIQUE_ID_SIZE,
);
