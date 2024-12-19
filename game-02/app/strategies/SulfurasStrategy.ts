import { BaseQualityUpdateStrategy } from "./BaseQualityUpdateStrategy";
import { Item } from "../models/Item";

/**
 * Strategy for handling "Sulfuras" items.
 * "Sulfuras" is a legendary item whose quality is always 80 and does not degrade or change.
 */
export class SulfurasStrategy extends BaseQualityUpdateStrategy {
  /**
   * Updates the quality and sellIn values for "Sulfuras" items.
   * - The quality of "Sulfuras" is always 80, regardless of sellIn or other factors.
   * - The sellIn value does not change for "Sulfuras."
   */
  update(): void {
    // Ensure the quality of Sulfuras is always set to 80
    this.item.quality = 80;

    // SellIn remains unchanged for Sulfuras, as it is a timeless item
  }
}