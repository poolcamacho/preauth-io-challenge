import { Item } from "../models/Item";
import { BaseQualityUpdateStrategy } from "../strategies/BaseQualityUpdateStrategy";
import { RegularItemStrategy } from "../strategies/RegularItemStrategy";
import { AgedBrieStrategy } from "../strategies/AgedBrieStrategy";
import { SulfurasStrategy } from "../strategies/SulfurasStrategy";
import { BackstagePassStrategy } from "../strategies/BackstagePassStrategy";
import { ConjuredItemStrategy } from "../strategies/ConjuredItemStrategy";

/**
 * Factory responsible for determining the appropriate quality update strategy for a given item.
 * This allows for flexibility and scalability by associating item names with their corresponding strategies.
 */
export class QualityUpdateStrategyFactory {
  /**
   * Registry of predefined strategies for known item types.
   * Maps the item name to the corresponding strategy class.
   */
  private static strategyRegistry: Record<
    string,
    new (item: Item) => BaseQualityUpdateStrategy
  > = {
    "Aged Brie": AgedBrieStrategy,
    "Sulfuras, Hand of Ragnaros": SulfurasStrategy,
    "Backstage passes to a TAFKAL80ETC concert": BackstagePassStrategy,
    "Conjured Item": ConjuredItemStrategy,
  };

  /**
   * Registers a new strategy for a specific item type.
   * This method allows extending the factory with custom strategies.
   *
   * @param itemName Name of the item to associate with the strategy.
   * @param strategyClass The strategy class to use for the item.
   * @throws Error if either `itemName` or `strategyClass` is not provided.
   */
  static registerStrategy(
    itemName: string,
    strategyClass: new (item: Item) => BaseQualityUpdateStrategy
  ): void {
    if (!itemName || !strategyClass) {
      throw new Error("Both itemName and strategyClass must be provided.");
    }
    this.strategyRegistry[itemName] = strategyClass;
  }

  /**
   * Retrieves the appropriate quality update strategy for a given item.
   * If no specific strategy is registered for the item's name, the default `RegularItemStrategy` is used.
   *
   * @param item The item for which to retrieve the strategy.
   * @returns The quality update strategy for the item.
   * @throws Error if the item or its name is invalid.
   */
  static getStrategy(item: Item): BaseQualityUpdateStrategy {
    if (!item || !item.name) {
      throw new Error(
        `Invalid item: Item at sellIn=${
          item?.sellIn ?? "unknown"
        } with quality=${item?.quality ?? "unknown"} must have a valid name.`
      );
    }

    // Determine the appropriate strategy class for the item's name or use the default strategy
    const StrategyClass =
      this.strategyRegistry[item.name] || RegularItemStrategy;

    // Return an instance of the determined strategy class
    return new StrategyClass(item);
  }
}