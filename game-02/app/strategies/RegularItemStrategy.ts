import { BaseQualityUpdateStrategy } from "./BaseQualityUpdateStrategy";

/**
 * Strategy for handling regular items.
 * Regular items degrade in quality by 1 per day and degrade twice as fast after the sell-by date.
 */
export class RegularItemStrategy extends BaseQualityUpdateStrategy {
  /**
   * Updates the quality and sellIn values for regular items.
   * - The quality decreases by 1 each day.
   * - After the sell-by date (sellIn < 0), the quality decreases twice as fast.
   */
  update(): void {
    // Decrease quality by 1 for a regular item
    this.decreaseQuality();

    // Decrease the sellIn value as a day passes
    this.decreaseSellIn();

    // If the sell-by date has passed, degrade quality twice as fast
    if (this.item.sellIn < 0) {
      this.decreaseQuality(); // Additional degradation
    }
  }
}