import { Item } from "../models/Item";
import { QualityUpdateStrategyFactory } from "../factories/QualityUpdateStrategyFactory";

interface Logger {
  /**
   * Logger interface for error handling.
   * @param message The error message to log.
   * @param error Additional error details.
   */
  error: (message: string, error: any) => void;
}

/**
 * Core class for managing the inventory of the Gilded Rose.
 * Responsible for validating input items and updating their quality and sellIn values.
 */
export class GildedRose {
  private readonly logger: Logger;

  /**
   * Constructs a GildedRose instance.
   * @param items Array of items to manage.
   * @param logger Optional logger for error handling (defaults to a no-op logger).
   */
  constructor(private readonly items: Item[], logger?: Logger) {
    // Validate that the input is an array of items
    if (!Array.isArray(items)) {
      throw new Error("Invalid input: 'items' must be an array.");
    }

    // Ensure all elements in the array are instances of the Item class
    for (const item of items) {
      if (!(item instanceof Item)) {
        throw new Error(
          "Invalid input: Each item must be an instance of the Item class."
        );
      }
    }

    // Assign a default logger if none is provided
    this.logger = logger || {
      error: () => {
        /* No-op logger */
      },
    };
  }

  /**
   * Exposes the items array for external access.
   * @returns The array of items managed by this instance.
   */
  public getItems(): Item[] {
    return this.items;
  }

  /**
   * Updates the quality and sellIn values for all items in the inventory.
   * Uses the QualityUpdateStrategyFactory to determine the appropriate strategy for each item.
   * Logs and throws an error if the update process fails for any item.
   * @returns The updated array of items.
   */
  updateQuality(): Item[] {
    for (const item of this.items) {
      try {
        // Retrieve the appropriate strategy for the item
        const strategy = QualityUpdateStrategyFactory.getStrategy(item);
        strategy.update();
      } catch (error) {
        // Log the error and throw a descriptive message
        this.logger.error("Error updating item quality", {
          itemName: item.name,
          sellIn: item.sellIn,
          quality: item.quality,
          error,
        });
        throw new Error(
          `Failed to update quality for item '${item.name}'. Please check the item data and strategies.`
        );
      }
    }
    return this.items;
  }
}