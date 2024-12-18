const { describe, test, expect } = require('@jest/globals');
const validateInput = require('../src/utils/validateInput');

describe('validateInput', () => {
  test('should not throw an error for valid input', () => {
    const numbers = [1, 2, 3];
    const targetSum = 5;
    expect(() => validateInput(numbers, targetSum)).not.toThrow();
  });

  test('should throw an error if the array is not an array', () => {
    const numbers = 'invalid';
    const targetSum = 5;
    expect(() => validateInput(numbers, targetSum)).toThrow(
      'Invalid input: Please enter a non-empty list of valid numbers.'
    );
  });

  test('should throw an error if the array contains invalid numbers', () => {
    const numbers = [1, 2, 'invalid'];
    const targetSum = 5;
    expect(() => validateInput(numbers, targetSum)).toThrow(
      'Invalid input: Please enter a non-empty list of valid numbers.'
    );
  });

  test('should throw an error if the array is empty', () => {
    const numbers = [];
    const targetSum = 5;
    expect(() => validateInput(numbers, targetSum)).toThrow(
      'Invalid input: Please enter a non-empty list of valid numbers.'
    );
  });

  test('should throw an error if the targetSum is not a number', () => {
    const numbers = [1, 2, 3];
    const targetSum = 'invalid';
    expect(() => validateInput(numbers, targetSum)).toThrow(
      'Invalid input: The target sum must be a valid number.'
    );
  });
});