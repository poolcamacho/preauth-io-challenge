import { expect } from "chai";
import { GildedRose } from "../app/core/GildedRose";
import { Item } from "../app/models/Item";

describe("Regular Items", () => {
  it("should update quality for a regular item", () => {
    const gildedRose = new GildedRose([new Item("Regular Item", 10, 20)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(19);
  });

  it("should not allow quality to drop below 0", () => {
    const gildedRose = new GildedRose([new Item("Regular Item", 5, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(0);
  });

  it("should degrade quality twice as fast after sellIn date", () => {
    const gildedRose = new GildedRose([new Item("Regular Item", 0, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(8);
    expect(items[0].sellIn).to.equal(-1);
  });

  it("should handle a regular item with initial quality of 1", () => {
    const gildedRose = new GildedRose([new Item("Regular Item", 5, 1)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(0); // Quality cannot drop below 0
    expect(items[0].sellIn).to.equal(4);
  });

  it("should handle multiple updates for a regular item", () => {
    const gildedRose = new GildedRose([new Item("Regular Item", 5, 10)]);
    gildedRose.updateQuality(); // First update
    const items = gildedRose.updateQuality(); // Second update

    expect(items[0].sellIn).to.equal(3);
    expect(items[0].quality).to.equal(8); // Degrade by 1 twice
  });

  it("should degrade quality to 0 after multiple updates", () => {
    const gildedRose = new GildedRose([new Item("Regular Item", 5, 2)]);
    gildedRose.updateQuality(); // First update
    const items = gildedRose.updateQuality(); // Second update

    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(3);
  });

  it("should degrade quality correctly with negative sellIn", () => {
    const gildedRose = new GildedRose([new Item("Regular Item", -1, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(-2);
    expect(items[0].quality).to.equal(8); // Degrade by 2
  });

  it("should handle a regular item with sellIn of 0 and quality of 1", () => {
    const gildedRose = new GildedRose([new Item("Regular Item", 0, 1)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(0); // Quality cannot drop below 0
    expect(items[0].sellIn).to.equal(-1);
  });

  it("should handle multiple regular items in inventory", () => {
    const gildedRose = new GildedRose([
      new Item("Regular Item", 10, 20),
      new Item("Regular Item", 5, 15),
      new Item("Regular Item", 0, 10),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(19);

    expect(items[1].sellIn).to.equal(4);
    expect(items[1].quality).to.equal(14);

    expect(items[2].sellIn).to.equal(-1);
    expect(items[2].quality).to.equal(8); // Degrade by 2
  });

  it("should handle a regular item with extremely negative sellIn values", () => {
    const gildedRose = new GildedRose([new Item("Regular Item", -10, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(-11);
    expect(items[0].quality).to.equal(8); // Degrade by 2
  });

  it("should handle a regular item with quality of 0 and sellIn of 0", () => {
    const gildedRose = new GildedRose([new Item("Regular Item", 0, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0); // Quality remains 0
  });

  it("should handle a regular item with high initial quality", () => {
    const gildedRose = new GildedRose([new Item("Regular Item", 5, 50)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(49); // Degrade by 1
  });
});