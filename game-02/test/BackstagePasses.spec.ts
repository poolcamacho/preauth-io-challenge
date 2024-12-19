import { expect } from "chai";
import { GildedRose } from "../app/core/GildedRose";
import { Item } from "../app/models/Item";

describe("Backstage Passes", () => {
  it("should increase quality by 1 when more than 10 days remain", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(11);
    expect(items[0].sellIn).to.equal(10);
  });

  it("should increase quality by 2 when 10 days or less remain", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(12);
    expect(items[0].sellIn).to.equal(9);
  });

  it("should increase quality by 3 when 5 days or less remain", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(13);
    expect(items[0].sellIn).to.equal(4);
  });

  it("should drop quality to 0 after the concert", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(-1);
  });

  it("should not allow quality to exceed 50 when increasing by 1", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 50),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(10);
  });

  it("should not allow quality to exceed 50 when increasing by 2", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(9);
  });

  it("should not allow quality to exceed 50 when increasing by 3", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(4);
  });

  it("should handle multiple updates for Backstage Passes", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 10),
    ]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(10);
    expect(items[0].quality).to.equal(12);
  });

  it("should handle Backstage Passes with sellIn exactly 10 and quality 50", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(9);
  });

  it("should handle Backstage Passes with sellIn exactly 5 and quality 50", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(4);
  });

  it("should handle Backstage Passes mixed with other items", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
      new Item("Regular Item", 3, 15),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(13);

    expect(items[1].sellIn).to.equal(2);
    expect(items[1].quality).to.equal(14);
  });

  it("should handle Backstage Passes with sellIn exactly 1", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(13);
    expect(items[0].sellIn).to.equal(0);
  });

  it("should handle Backstage Passes with sellIn 0 and maximum quality", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(-1);
  });
});