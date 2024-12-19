/**
 * Represents an item in the inventory.
 * Each item has a name, a sellIn value (remaining days to sell), and a quality value (value of the item).
 */
export class Item {
  /**
   * Creates a new item instance.
   *
   * @param name The name of the item.
   * @param sellIn The number of days remaining to sell the item.
   * @param quality The quality value of the item, which determines its worth.
   */
  constructor(
    public readonly name: string, // Name of the item (e.g., "Aged Brie", "Sulfuras").
    public sellIn: number, // Days left to sell the item.
    public quality: number // Quality of the item (must adhere to specific rules defined in the system).
  ) {}
}