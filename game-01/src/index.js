const readline = require('readline');
const validateInput = require('./utils/validateInput');
const parseInput = require('./utils/parseInput');
const findPairWithSum = require('./utils/findPairWithSum');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Prompts the user with a question and returns their input.
 * @param {string} query - The question to display to the user.
 * @returns {Promise<string>} - The user's input as a string.
 */
function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

/**
 * Main function: orchestrates user input, validation, and logic execution.
 */
async function main() {
  try {
    console.log('=== Find First Pair With Sum ===');

    // Collect user inputs
    const arrayInput = await askQuestion('Enter an array of numbers (e.g., 2,5,8,14,0): ');
    const targetSumInput = await askQuestion('Enter the target sum (e.g., 10): ');

    // Parse inputs
    const { numbers, targetSum } = parseInput(arrayInput, targetSumInput);

    // Validate inputs
    validateInput(numbers, targetSum);

    // Execute the main logic
    const result = findPairWithSum(numbers, targetSum);

    // Display result
    if (result.length > 0) {
      console.log(`The first pair that sums to ${targetSum} is: [${result.join(', ')}]`);
    } else {
      console.log(`No pair of numbers found that adds up to ${targetSum}.`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    rl.close();
  }
}

// Execute the main function
main().catch((error) => {
  console.error(`Unhandled Error: ${error.message}`);
  process.exit(1);
});