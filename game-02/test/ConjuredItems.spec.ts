import { expect } from "chai";
import { GildedRose } from "../app/core/GildedRose";
import { Item } from "../app/models/Item";

describe("Conjured Items", () => {
  it("should degrade Conjured items twice as fast as regular items", () => {
    const gildedRose = new GildedRose([new Item("Conjured Item", 5, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(8); // Degrades by 2
  });

  it("should degrade Conjured items four times as fast after sell date", () => {
    const gildedRose = new GildedRose([new Item("Conjured Item", 0, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(6); // Degrades by 4
  });

  it("should not allow quality of Conjured items to drop below 0", () => {
    const gildedRose = new GildedRose([new Item("Conjured Item", 5, 1)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(0); // Quality remains at 0
  });

  it("should handle Conjured items with initial quality of 0", () => {
    const gildedRose = new GildedRose([new Item("Conjured Item", 5, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(0); // Quality remains at 0
  });

  it("should degrade Conjured items correctly with negative sellIn", () => {
    const gildedRose = new GildedRose([new Item("Conjured Item", -1, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(-2);
    expect(items[0].quality).to.equal(6); // Degrades by 4
  });

  it("should handle Conjured items with quality just above 0", () => {
    const gildedRose = new GildedRose([new Item("Conjured Item", 5, 1)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(0); // Quality cannot drop below 0
  });

  it("should handle multiple updates for Conjured items", () => {
    const gildedRose = new GildedRose([new Item("Conjured Item", 5, 10)]);
    gildedRose.updateQuality(); // First update
    const items = gildedRose.updateQuality(); // Second update

    expect(items[0].sellIn).to.equal(3);
    expect(items[0].quality).to.equal(6); // Degrades twice as fast
  });

  it("should handle Conjured items mixed with other items", () => {
    const gildedRose = new GildedRose([
      new Item("Conjured Item", 5, 10),
      new Item("Regular Item", 3, 15),
    ]);
    const items = gildedRose.updateQuality();

    // Conjured Item
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(8); // Degrades by 2

    // Regular Item
    expect(items[1].sellIn).to.equal(2);
    expect(items[1].quality).to.equal(14); // Degrades by 1
  });

  it("should handle Conjured items with extremely negative sellIn values", () => {
    const gildedRose = new GildedRose([new Item("Conjured Item", -10, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(-11);
    expect(items[0].quality).to.equal(6); // Degrades by 4
  });

  it("should not degrade quality below 0 even with multiple updates", () => {
    const gildedRose = new GildedRose([new Item("Conjured Item", 5, 2)]);
    gildedRose.updateQuality(); // First update
    const items = gildedRose.updateQuality(); // Second update

    expect(items[0].sellIn).to.equal(3);
    expect(items[0].quality).to.equal(0); // Quality remains at 0
  });

  it("should handle Conjured items with quality of 50", () => {
    const gildedRose = new GildedRose([new Item("Conjured Item", 5, 50)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(48); // Degrades by 2
  });
});