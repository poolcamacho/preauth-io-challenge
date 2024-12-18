/**
 * Parses user input strings into usable data.
 * @param {string} arrayInput - Comma-separated numbers as a string.
 * @param {string} targetSumInput - Target sum as a string.
 * @returns {{ numbers: number[], targetSum: number }} Parsed numbers array and target sum.
 */
function parseInput(arrayInput, targetSumInput) {
  const numbers = arrayInput.split(',').map((num) => parseFloat(num.trim())); // Convert to numbers
  const targetSum = parseFloat(targetSumInput.trim());

  return { numbers, targetSum };
}

module.exports = parseInput;