const {describe, test, expect} = require('@jest/globals');
const findPairWithSum = require('../src/utils/findPairWithSum');

describe('findPairWithSum', () => {
    test('should return the correct pair when a solution exists', () => {
        const numbers = [2, 5, 8, 14, 0];
        const targetSum = 10;
        expect(findPairWithSum(numbers, targetSum)).toEqual([2, 8]);
    });

    test('should return an empty array when no solution exists', () => {
        const numbers = [1, 2, 3, 4];
        const targetSum = 10;
        expect(findPairWithSum(numbers, targetSum)).toEqual([]);
    });

    test('should handle negative numbers correctly', () => {
        const numbers = [-2, -3, 7, 5];
        const targetSum = 2;
        expect(findPairWithSum(numbers, targetSum)).toEqual([-3, 5]);
    });

    test('should return the first valid pair when multiple pairs exist', () => {
        const numbers = [1, 2, 3, 4, 6, 4];
        const targetSum = 8;
        expect(findPairWithSum(numbers, targetSum)).toEqual([2, 6]);
    });

    test('should handle duplicate numbers correctly', () => {
        const numbers = [5, 5, 1, 4];
        const targetSum = 10;
        expect(findPairWithSum(numbers, targetSum)).toEqual([5, 5]);
    });

    test('should return an empty array for an empty input array', () => {
        const numbers = [];
        const targetSum = 10;
        expect(findPairWithSum(numbers, targetSum)).toEqual([]);
    });

    test('should handle a very large array efficiently', () => {
        const numbers = Array.from({length: 1_000_000}, (_, i) => i);
        const targetSum = 1_999_997;
        expect(findPairWithSum(numbers, targetSum)).toEqual([999998, 999999]);
    });

    test('should handle MAX_SAFE_INTEGER values', () => {
        const numbers = [1, Number.MAX_SAFE_INTEGER - 1];
        const targetSum = Number.MAX_SAFE_INTEGER;
        expect(findPairWithSum(numbers, targetSum)).toEqual([1, Number.MAX_SAFE_INTEGER - 1]);
    });

    test('should handle MIN_SAFE_INTEGER values', () => {
        const numbers = [Number.MIN_SAFE_INTEGER, 1];
        const targetSum = Number.MIN_SAFE_INTEGER + 1;
        expect(findPairWithSum(numbers, targetSum)).toEqual([Number.MIN_SAFE_INTEGER, 1]);
    });
});