import { BaseQualityUpdateStrategy } from "./BaseQualityUpdateStrategy";

/**
 * Strategy for handling "Backstage Pass" items.
 * The quality of "Backstage Pass" items increases as the concert approaches,
 * but drops to zero after the concert date.
 */
export class BackstagePassStrategy extends BaseQualityUpdateStrategy {
  /**
   * Updates the quality and sellIn values for "Backstage Pass" items.
   * - If there are more than 10 days left, quality increases by 1.
   * - If there are 10 or fewer days left, quality increases by 2.
   * - If there are 5 or fewer days left, quality increases by 3.
   * - After the concert (sellIn <= 0), quality drops to zero.
   */
  update(): void {
    if (this.item.sellIn > 10) {
      // More than 10 days left: Increase quality by 1
      this.increaseQuality();
    } else if (this.item.sellIn > 5) {
      // 10 days or fewer: Increase quality by 2
      this.increaseQuality();
      this.increaseQuality();
    } else if (this.item.sellIn > 0) {
      // 5 days or fewer: Increase quality by 3
      this.increaseQuality();
      this.increaseQuality();
      this.increaseQuality();
    } else {
      // After the concert: Quality drops to zero
      this.item.quality = 0;
    }

    // Decrease the sellIn value as a day passes
    this.decreaseSellIn();
  }
}