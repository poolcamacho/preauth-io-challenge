/**
 * Finds the first pair of numbers in an array that add up to the target sum.
 * Utilizes a hash map (object) to store seen numbers for O(1) lookup time.
 *
 * @param {number[]} numbers - A non-empty array of integers.
 * @param {number} targetSum - The target sum to find.
 * @returns {number[]} - Array containing the first pair that sums to the target sum, or an empty array if no pair is found.
 */
function findPairWithSum(numbers, targetSum) {
  const seenNumbers = {}; // Hash map to store seen numbers for quick lookup

  // Iterate over the array to find a pair that sums to the target sum
  for (let i = 0; i < numbers.length; i++) {
    const currentNumber = numbers[i]; // Current number in the iteration
    const complement = targetSum - currentNumber; // Complement needed to reach the target sum

    // Check if the complement has already been seen
    if (seenNumbers[complement] !== undefined) {
      return [complement, currentNumber]; // Return the pair if the complement is found
    }

    // Store the current number in the hash map
    seenNumbers[currentNumber] = true;
  }

  // Return an empty array if no valid pair is found
  return [];
}

module.exports = findPairWithSum;