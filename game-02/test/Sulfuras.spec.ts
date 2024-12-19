import { expect } from "chai";
import { GildedRose } from "../app/core/GildedRose";
import { Item } from "../app/models/Item";

describe("Sulfuras", () => {
  it("should not degrade Sulfuras when sellIn is 0", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(80);
  });

  it("should not change quality or sellIn for Sulfuras when sellIn is greater than 0", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(10);
  });

  it("should keep Sulfuras quality constant at 80 regardless of sellIn value", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(80);
  });

  it("should not allow Sulfuras quality to be set to a value other than 80", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 5, 100),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(5);
    expect(items[0].quality).to.equal(80);
  });

  it("should handle multiple Sulfuras items correctly", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", 5, 80),
      new Item("Sulfuras, Hand of Ragnaros", -10, 80),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(80);

    expect(items[1].sellIn).to.equal(5);
    expect(items[1].quality).to.equal(80);

    expect(items[2].sellIn).to.equal(-10);
    expect(items[2].quality).to.equal(80);
  });

  it("should handle Sulfuras when mixed with other items", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
      new Item("Aged Brie", 5, 10),
      new Item("Regular Item", 3, 15),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(10);
    expect(items[0].quality).to.equal(80);

    expect(items[1].sellIn).to.equal(4);
    expect(items[1].quality).to.equal(11);

    expect(items[2].sellIn).to.equal(2);
    expect(items[2].quality).to.equal(14);
  });

  it("should not degrade Sulfuras when sellIn is extremely negative", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", -100, 80),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(-100);
    expect(items[0].quality).to.equal(80);
  });
});