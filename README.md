# Coffee Machine

This repository is a simulation of coffee machine management in TypeScript.

## Main Files

- [`Main.ts`](Main.ts): Entry point of the program. Handles display, user coffee selection, and interaction with the coffee machine.
- [`Coffee.ts`](Coffee.ts): Defines the `Coffee` class, representing a type of coffee with its name, price, and quantity.
- [`CoffeeMachine.ts`](CoffeeMachine.ts): Contains the `CoffeeMachine` class, which manages the list of available coffees, ordering, and preparation.

## Features

- Displays available coffees with their prices.
- User can select a coffee.
- Simulated payment management.
- Prepares the selected coffee.
- Manages quantities and availability.

## How to Run

1. Install dependencies if needed:
    ```sh
    npm install
    ```

2. Run the program with ts-node or compile with tsc and run with Node.js:
    ```sh
    npx ts-node Main.ts
    ```
    or
    ```sh
    tsc && node Main.js
    ```
    
## Example Usage
```
-------------------------
Welcome to Coffee Machine
All Available coffee: 
0: Mokka - 500 Ar
1: latter - 600 Ar
2: Nature - 200 Ar
3: Creamy - 800 Ar
Enter the number of coffee you want to drink: 
```