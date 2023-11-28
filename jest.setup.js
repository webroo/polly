import '@testing-library/jest-dom';

jest.mock('nanoid', () => ({
  customAlphabet: () => () => 'k34hNhf2hw49bv',
}));
