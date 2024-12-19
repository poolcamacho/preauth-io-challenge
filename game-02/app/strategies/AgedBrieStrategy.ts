import { BaseQualityUpdateStrategy } from "./BaseQualityUpdateStrategy";

/**
 * Strategy for handling "Aged Brie" items.
 * "Aged Brie" is a unique item whose quality increases as it ages.
 */
export class AgedBrieStrategy extends BaseQualityUpdateStrategy {
  /**
   * Updates the quality and sellIn values for "Aged Brie" items.
   * - The quality of "Aged Brie" increases as it gets older.
   * - After the sell-by date (`sellIn` < 0), quality increases twice as fast.
   */
  update(): void {
    // Increase the quality of "Aged Brie" as it ages
    this.increaseQuality();

    // Decrease the sellIn value as a day passes
    this.decreaseSellIn();

    // If the sell-by date has passed, increase quality again
    if (this.item.sellIn < 0) {
      this.increaseQuality(); // Quality increases faster after the sell-by date
    }
  }
}