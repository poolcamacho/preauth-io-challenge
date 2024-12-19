import { expect } from "chai";
import { GildedRose } from "../app/core/GildedRose";
import { Item } from "../app/models/Item";

describe("Miscellaneous", () => {
  it("should treat unknown items as regular items", () => {
    const gildedRose = new GildedRose([new Item("Unknown Item", 5, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(9); // Degrades by 1 (regular item behavior)
    expect(items[0].sellIn).to.equal(4);
  });

  it("should correctly update multiple items in the inventory", () => {
    const gildedRose = new GildedRose([
      new Item("Regular Item", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Conjured Item", 5, 10),
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(9); // Regular Item
    expect(items[0].quality).to.equal(19);

    expect(items[1].sellIn).to.equal(1); // Aged Brie
    expect(items[1].quality).to.equal(1);

    expect(items[2].sellIn).to.equal(0); // Sulfuras
    expect(items[2].quality).to.equal(80);

    expect(items[3].sellIn).to.equal(14); // Backstage Passes
    expect(items[3].quality).to.equal(21);

    expect(items[4].sellIn).to.equal(4); // Conjured Item
    expect(items[4].quality).to.equal(8);
  });

  it("should not allow quality of any item to drop below 0", () => {
    const gildedRose = new GildedRose([
      new Item("Regular Item", 5, 0),
      new Item("Aged Brie", 5, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0),
      new Item("Conjured Item", 5, 0),
      new Item("Conjured Item", 0, 1),
    ]);

    const items = gildedRose.updateQuality();

    items.forEach((item) => {
      expect(item.quality).to.be.at.least(0); // Quality should not be less than 0
    });
  });

  it("should not allow quality of any item to exceed 50 (except Sulfuras)", () => {
    const gildedRose = new GildedRose([
      new Item("Aged Brie", 2, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 50),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(50); // Aged Brie
    expect(items[1].quality).to.equal(50); // Backstage Passes
    expect(items[2].quality).to.equal(80); // Sulfuras
  });

  it("should properly update items with negative sellIn values", () => {
    const gildedRose = new GildedRose([
      new Item("Regular Item", -1, 10),
      new Item("Aged Brie", -1, 10),
      new Item("Conjured Item", -1, 10),
    ]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(8); // Regular Item
    expect(items[1].quality).to.equal(12); // Aged Brie
    expect(items[2].quality).to.equal(6); // Conjured Item
  });

  it("should throw an error if items is not an array", () => {
    expect(() => new GildedRose(null as any)).to.throw(
      "Invalid input: 'items' must be an array."
    );
  });

  it("should throw an error if any item is not an instance of Item", () => {
    const invalidItem = { name: "Invalid Item", sellIn: 10, quality: 20 };
    expect(() =>
      new GildedRose([invalidItem as any, new Item("Regular Item", 10, 20)])
    ).to.throw(
      "Invalid input: Each item must be an instance of the Item class."
    );
  });

  it("should handle invalid item names gracefully", () => {
    const gildedRose = new GildedRose([new Item("Invalid Item Name", 5, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(9); // Treated as a regular item
    expect(items[0].sellIn).to.equal(4);
  });

  it("should handle errors during quality update gracefully", () => {
    const gildedRose = new GildedRose([new Item("Unknown Item", 5, 10)]);
    expect(() => gildedRose.updateQuality()).to.not.throw();
  });

  it("should throw an error if updating quality fails", () => {
    const gildedRose = new GildedRose([new Item(null as any, 5, 10)]);
    expect(() => gildedRose.updateQuality()).to.throw(
      /Failed to update quality for item/
    );
  });
});