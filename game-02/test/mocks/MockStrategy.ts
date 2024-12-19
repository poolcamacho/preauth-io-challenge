import { BaseQualityUpdateStrategy } from "../../app/strategies/BaseQualityUpdateStrategy";
import { Item } from "../../app/models/Item";

/**
 * Mock implementation of BaseQualityUpdateStrategy for testing purposes.
 * Used to simulate specific behavior or failure scenarios in tests.
 */
export class MockStrategy extends BaseQualityUpdateStrategy {
  /**
   * Constructs the mock strategy with the given item.
   * @param item The item to associate with this strategy.
   */
  constructor(item: Item) {
    super(item); // Calls the base class constructor with the item.
  }

  /**
   * Overrides the update method to throw a mock failure error.
   * This is used to simulate a strategy failure during tests.
   */
  update(): void {
    throw new Error("Mock strategy update failure");
  }

  /**
   * Optionally overrides the increaseQuality method.
   * Calls the base class implementation for default behavior.
   * Can be customized for specific testing needs.
   */
  increaseQuality(): void {
    super.increaseQuality();
  }

  /**
   * Optionally overrides the decreaseQuality method.
   * Calls the base class implementation for default behavior.
   * Can be customized for specific testing needs.
   */
  decreaseQuality(): void {
    super.decreaseQuality();
  }

  /**
   * Optionally overrides the decreaseSellIn method.
   * Calls the base class implementation for default behavior.
   * Can be customized for specific testing needs.
   */
  decreaseSellIn(): void {
    super.decreaseSellIn();
  }
}