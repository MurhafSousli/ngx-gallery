import { gapTransform, itemSizeTransform, itemsPerViewTransform, stepsTransform } from './utils';

describe('Transform Utilities', () => {

  describe('gapTransform', () => {
    it.each([
      { input: 10, expected: 10 },
      { input: '24', expected: 24 },
      { input: 0, expected: 0 },
      { input: '0', expected: 0 },
      { input: -5, expected: 0 },
      { input: 'abc', expected: 0 },
      { input: '', expected: 0 },
      { input: null, expected: 0 },
      { input: undefined, expected: 0 },
    ])('should transform $input to $expected', ({ input, expected }) => {
      expect(gapTransform(input as any)).toBe(expected);
    });
  });

  describe('itemSizeTransform', () => {
    it.each([
      { input: 'auto', expected: 'auto' },
      { input: 100, expected: '100px' },
      { input: '50', expected: '50px' },
      { input: 0, expected: undefined },
      { input: -10, expected: undefined },
      { input: 'not-a-number', expected: undefined },
      { input: '', expected: undefined },
      { input: null, expected: undefined },
    ])('should transform $input to $expected', ({ input, expected }) => {
      expect(itemSizeTransform(input as any)).toBe(expected);
    });
  });

  describe('stepsTransform', () => {
    it.each([
      { input: 'page', expected: 'page' },
      { input: 5, expected: 5 },
      { input: '3', expected: 3 },
      { input: 0, expected: undefined },
      { input: -1, expected: undefined },
      { input: '', expected: undefined },
      { input: null, expected: undefined },
    ])('should transform $input to $expected', ({ input, expected }) => {
      expect(stepsTransform(input as any)).toBe(expected);
    });
  });

  describe('itemsPerViewTransform', () => {
    it.each([
      { input: 5, expected: 5, label: 'valid number' },
      { input: '3', expected: 3, label: 'numeric string' },
      { input: 1, expected: 1, label: 'minimum boundary' },
      { input: 0, expected: 1, label: 'zero (should floor at 1)' },
      { input: -5, expected: 1, label: 'negative number (should floor at 1)' },
      { input: 'invalid', expected: 1, label: 'non-numeric string (fallback to 1)' },
      { input: '', expected: 1, label: 'empty string' },
      { input: null, expected: 1, label: 'null value' },
      { input: undefined, expected: 1, label: 'undefined value' },
    ])('should return $expected when input is $label ($input)', ({ input, expected }) => {
      expect(itemsPerViewTransform(input as any)).toBe(expected);
    });
  });
});
