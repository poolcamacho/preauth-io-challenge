import { Item } from "../models/Item";

/**
 * Base class for item quality update strategies.
 * This class provides shared methods and serves as the foundation
 * for specific strategies for handling item quality and sellIn values.
 */
export abstract class BaseQualityUpdateStrategy {
  /**
   * Constructor to initialize the strategy with the associated item.
   *
   * @param item The item whose quality and sellIn values will be managed.
   */
  constructor(protected readonly item: Item) {}

  /**
   * Abstract method to be implemented by specific strategies.
   * This method defines how the quality and sellIn values should be updated.
   */
  abstract update(): void;

  /**
   * Increases the quality of the item by 1, ensuring it does not exceed 50.
   * The maximum quality for any item (except Sulfuras) is 50.
   */
  protected increaseQuality(): void {
    if (this.item.quality < 50) {
      this.item.quality += 1;
    }
  }

  /**
   * Decreases the quality of the item by 1, ensuring it does not go below 0.
   * The minimum quality for any item is 0.
   */
  protected decreaseQuality(): void {
    if (this.item.quality > 0) {
      this.item.quality -= 1;
    }
  }

  /**
   * Decreases the sellIn value of the item by 1 to represent the passing of a day.
   */
  protected decreaseSellIn(): void {
    this.item.sellIn -= 1;
  }
}