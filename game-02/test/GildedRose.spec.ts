import { expect } from "chai";
import { GildedRose } from "../app/core/GildedRose";
import { Item } from "../app/models/Item";
import { QualityUpdateStrategyFactory } from "../app/factories/QualityUpdateStrategyFactory";
import { MockStrategy } from "./mocks/MockStrategy";

describe("GildedRose Error Handling", () => {
  const silentLogger = { error: () => {} }; // Logger that does nothing

  it("should throw an error if items is not an array", () => {
    expect(() => new GildedRose(null as any, silentLogger)).to.throw(
      "Invalid input: 'items' must be an array."
    );
  });

  it("should throw an error if any item is not an instance of Item", () => {
    const invalidItem = { name: "Invalid Item", sellIn: 10, quality: 20 };
    expect(() =>
      new GildedRose(
        [invalidItem as any, new Item("Regular Item", 10, 20)],
        silentLogger
      )
    ).to.throw(
      "Invalid input: Each item must be an instance of the Item class."
    );
  });

  it("should handle errors during quality update gracefully", () => {
    const gildedRose = new GildedRose(
      [new Item("Unknown Item", 5, 10)],
      silentLogger
    );
    expect(() => gildedRose.updateQuality()).to.not.throw(); // Should not throw errors during the update
  });

  it("should throw an error if updating quality fails", () => {
    const gildedRose = new GildedRose(
      [new Item(null as any, 5, 10)],
      silentLogger
    );

    expect(() => gildedRose.updateQuality()).to.throw(
      "Failed to update quality for item 'null'. Please check the item data and strategies."
    );
  });

  it("should log and throw an error when updating quality fails", () => {
    const mockLogger = {
      error: (message: string, error: any) => {
        expect(message).to.equal("Error updating item quality");
        expect(error.itemName).to.equal(null); // Expect null item name to be logged
      },
    };

    const gildedRose = new GildedRose(
      [new Item(null as any, 5, 10)],
      mockLogger as any
    );

    expect(() => gildedRose.updateQuality()).to.throw(
      "Failed to update quality for item 'null'. Please check the item data and strategies."
    );
  });

  it("should log and throw an error when strategy fails for an invalid item", () => {
    const mockLogger = {
      error: (message: string, error: any) => {
        expect(message).to.equal("Error updating item quality");
        expect(error.itemName).to.equal("Invalid Item");
      },
    };

    const invalidItem = new Item("Invalid Item", 5, 10);

    // Mock the strategy to force failure
    const originalGetStrategy = QualityUpdateStrategyFactory.getStrategy;
    QualityUpdateStrategyFactory.getStrategy = () => ({
      update: () => {
        throw new Error("Mock strategy failure");
      },
    } as any);

    const gildedRose = new GildedRose([invalidItem], mockLogger as any);

    expect(() => gildedRose.updateQuality()).to.throw(
      "Failed to update quality for item 'Invalid Item'. Please check the item data and strategies."
    );

    // Restore the original strategy factory
    QualityUpdateStrategyFactory.getStrategy = originalGetStrategy;
  });

  it("should log and throw an error when updating item quality fails with a mock strategy", () => {
    const mockLogger = {
      error: (message: string, error: any) => {
        expect(message).to.equal("Error updating item quality");
        expect(error.error.message).to.equal("Mock strategy update failure");
      },
    };

    const mockItem = new Item("Mock Item", 5, 10);

    // Mock the strategy registry to use the MockStrategy
    const originalGetStrategy = QualityUpdateStrategyFactory.getStrategy;
    QualityUpdateStrategyFactory.getStrategy = (item: Item) =>
      new MockStrategy(item);

    const gildedRose = new GildedRose([mockItem], mockLogger as any);

    expect(() => gildedRose.updateQuality()).to.throw(
      "Failed to update quality for item 'Mock Item'. Please check the item data and strategies."
    );

    // Restore the original strategy factory
    QualityUpdateStrategyFactory.getStrategy = originalGetStrategy;
  });

  it("should return the list of items", () => {
    const items = [
      new Item("Aged Brie", 10, 20),
      new Item("Regular Item", 5, 10),
    ];
    const gildedRose = new GildedRose(items);

    const returnedItems = gildedRose.getItems();

    expect(returnedItems).to.deep.equal(items); // Ensure the returned list matches the initialized items
  });
});