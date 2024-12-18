/**
 * Validates the input to ensure it meets expected requirements.
 * @param {number[]} numbers - Array of numbers.
 * @param {number} targetSum - The target sum to find.
 * @throws {Error} If the input is invalid.
 */
function validateInput(numbers, targetSum) {
  if (!Array.isArray(numbers) || numbers.length === 0 || numbers.some(isNaN)) {
    throw new Error('Invalid input: Please enter a non-empty list of valid numbers.');
  }

  if (typeof targetSum !== 'number' || isNaN(targetSum)) {
    throw new Error('Invalid input: The target sum must be a valid number.');
  }
}

module.exports = validateInput;