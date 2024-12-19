# Gilded Rose Kata Implementation

This repository contains the implementation of the **Gilded Rose** kata using **TypeScript**. The project applies the **Strategy Design Pattern** to handle the quality and `sellIn` value updates for different types of items in the inventory.

## Features

- Fully implemented inventory management for the Gilded Rose kata.
- Strategy design pattern for maintaining flexibility and extensibility.
- Comprehensive test suite for all item types and edge cases.
- Code coverage support to ensure high-quality code.

## Project Structure

```
game-02/
├── .nyc_output/          # Directory for NYC code coverage reports
├── app/                  # Application source code
│   ├── core/             # Core application logic (e.g., GildedRose class)
│   ├── factories/        # Factory pattern implementation for item strategies
│   ├── models/           # Models used in the application (e.g., Item)
│   ├── strategies/       # Strategy classes for different item types
├── coverage/             # Coverage report output
├── dist/                 # Compiled JavaScript output
├── node_modules/         # Node.js dependencies
├── test/                 # Test files for unit and integration testing
├── .gitignore            # Git ignore file
├── .mocharc.js           # Mocha configuration file
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Dependency lock file
├── tsconfig.json         # TypeScript configuration file
└── README.md             # Project documentation
```

## Implementation Highlights

### Design Decisions
- **Strategy Design Pattern**:
  Each item type has a corresponding strategy class (e.g., `AgedBrieStrategy`, `SulfurasStrategy`, etc.) that defines its quality and `sellIn` update logic.
  
- **Quality Update Strategy Factory**:
  A factory class (`QualityUpdateStrategyFactory`) dynamically determines and assigns the correct strategy based on the item's name.

- **BaseQualityUpdateStrategy**:
  A base class shared across all strategies to provide common operations, such as increasing or decreasing quality and reducing `sellIn`.

### Tests
The test suite is built using **Mocha** and **Chai**, covering all edge cases and ensuring correct functionality:
- **Tests by Item Type**:
  Separate test suites for `Regular Items`, `Aged Brie`, `Backstage Passes`, `Sulfuras`, and `Conjured Items`.
- **Error Handling**:
  Test cases for invalid items, unexpected errors, and logging behaviors.
- **Miscellaneous**:
  Tests for mixed item inventories and edge cases.

### Coverage
- Code coverage is handled using **NYC** and ensures that all code paths are tested.
- Run the coverage report using:
  ```bash
  npm run coverage
  ```

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo/gilded-rose.git
   cd gilded-rose
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile the TypeScript code:
   ```bash
   npm run compile
   ```

4. Run the tests:
   ```bash
   npm test
   ```

5. Generate the coverage report:
   ```bash
   npm run coverage
   ```

## Usage

### Inventory Update
Use the `GildedRose` class to manage the inventory. Here's an example:

```typescript
import { GildedRose } from "./app/core/GildedRose";
import { Item } from "./app/models/Item";

const items = [
  new Item("Aged Brie", 5, 10),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Conjured Item", 3, 6),
  new Item("Regular Item", 10, 5),
];

const gildedRose = new GildedRose(items);
gildedRose.updateQuality();
console.log(gildedRose.getItems());
```

## Key Improvements
- Comprehensive test coverage with Mocha/Chai.
- Modularized design for easier maintenance and scalability.
- Customizable error logging for better debugging.

