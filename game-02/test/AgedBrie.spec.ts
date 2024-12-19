import { expect } from "chai";
import { GildedRose } from "../app/core/GildedRose";
import { Item } from "../app/models/Item";

describe("Aged Brie", () => {
  it("should handle basic Aged Brie behavior", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(1);
    expect(items[0].quality).to.equal(1);
  });

  it("should increase quality for Aged Brie as it ages", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(11);
    expect(items[0].sellIn).to.equal(1);
  });

  it("should increase quality twice as fast after sellIn date", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(12);
    expect(items[0].sellIn).to.equal(-1);
  });

  it("should not allow quality to exceed 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 50)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(50);
  });

  it("should handle multiple updates for Aged Brie", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 10)]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(12);
  });

  it("should handle Aged Brie with initial quality of 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(50);
  });

  it("should handle Aged Brie with negative sellIn values", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", -1, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(-2);
    expect(items[0].quality).to.equal(12);
  });

  it("should not increase quality above 50 after multiple updates", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 49)]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(50);
  });

  it("should handle Aged Brie mixed with other items", () => {
    const gildedRose = new GildedRose([
      new Item("Aged Brie", 5, 10),
      new Item("Regular Item", 3, 15),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(11);

    expect(items[1].sellIn).to.equal(2);
    expect(items[1].quality).to.equal(14);
  });

  it("should handle Aged Brie with very high sellIn values", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 100, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(99);
    expect(items[0].quality).to.equal(11);
  });

  it("should handle Aged Brie with sellIn at 0 and quality at 49", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 49)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(50);
  });
});