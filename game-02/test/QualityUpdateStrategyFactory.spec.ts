import { expect } from "chai";
import { QualityUpdateStrategyFactory } from "../app/factories/QualityUpdateStrategyFactory";
import { Item } from "../app/models/Item";
import { RegularItemStrategy } from "../app/strategies/RegularItemStrategy";
import { MockStrategy } from "./mocks/MockStrategy";

describe("QualityUpdateStrategyFactory", () => {
  it("should return RegularItemStrategy for unregistered items", () => {
    const item: Item = new Item("Unknown Item", 10, 10);
    const strategy = QualityUpdateStrategyFactory.getStrategy(item);

    // Verify the default strategy is RegularItemStrategy
    expect(Object.getPrototypeOf(strategy).constructor.name).to.equal(
      "RegularItemStrategy"
    );
  });

  it("should throw an error if item is null or has no name", () => {
    // Null item test
    expect(() =>
      QualityUpdateStrategyFactory.getStrategy(null as any)
    ).to.throw(
      "Invalid item: Item at sellIn=unknown with quality=unknown must have a valid name."
    );

    // Item with null name test
    const invalidItem = new Item(null as any, 5, 10);
    expect(() => QualityUpdateStrategyFactory.getStrategy(invalidItem)).to.throw(
      "Invalid item: Item at sellIn=5 with quality=10 must have a valid name."
    );
  });

  it("should register a new strategy successfully", () => {
    // Register a custom strategy
    QualityUpdateStrategyFactory.registerStrategy("Mock Item", MockStrategy);

    const item = new Item("Mock Item", 5, 10);
    const strategy = QualityUpdateStrategyFactory.getStrategy(item);

    // Verify the strategy is an instance of MockStrategy
    expect(strategy).to.be.instanceOf(MockStrategy);
  });

  it("should throw an error if itemName is not provided", () => {
    expect(() =>
      QualityUpdateStrategyFactory.registerStrategy(null as any, MockStrategy)
    ).to.throw("Both itemName and strategyClass must be provided.");
  });

  it("should throw an error if strategyClass is not provided", () => {
    expect(() =>
      QualityUpdateStrategyFactory.registerStrategy("Mock Item", null as any)
    ).to.throw("Both itemName and strategyClass must be provided.");
  });
});