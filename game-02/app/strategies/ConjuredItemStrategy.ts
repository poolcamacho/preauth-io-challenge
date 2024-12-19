import { BaseQualityUpdateStrategy } from "./BaseQualityUpdateStrategy";

/**
 * Strategy for handling "Conjured" items.
 * "Conjured" items degrade in Quality twice as fast as regular items.
 */
export class ConjuredItemStrategy extends BaseQualityUpdateStrategy {
  /**
   * Updates the quality and sellIn values for "Conjured" items.
   * - The quality decreases twice as fast as regular items.
   * - After the sell-by date (sellIn < 0), the degradation rate is doubled again.
   */
  update(): void {
    // Decrease quality twice for "Conjured" items
    this.decreaseQuality(); // First degradation
    this.decreaseQuality(); // Second degradation

    // Decrease the sellIn value as a day passes
    this.decreaseSellIn();

    // If the sell-by date has passed, decrease quality twice again
    if (this.item.sellIn < 0) {
      this.decreaseQuality(); // Additional degradation
      this.decreaseQuality(); // Additional degradation
    }
  }
}