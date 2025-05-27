import { log } from 'node:console';
import Coffee from './Coffee';
import { CoffeeMachine } from './CoffeeMachine';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export const readline = createInterface({ input, output });
const TIMEOUT_DURATION = 60_000;

async function askWithTimeout(question: string): Promise<string | number | null> {
  return Promise.race([
    readline.question(question),
    new Promise<string | number | null>((resolve) =>
      setTimeout(() => {
        resolve(null);
        log('\nTimeout! Please try again.');
        readline.close();
        process.exit(1);
      }, TIMEOUT_DURATION),
    ),
  ]);
}

const nature = new Coffee('Nature', 200);
const mokka = new Coffee('Mokka', 500);
const latte = new Coffee('latter', 600);
const creamy = new Coffee('Creamy', 800);

async function main() {
  const coffeeMachine = new CoffeeMachine([mokka, latte, nature, creamy]);

  log('-------------------------');
  log('Welcome to Coffee Machine');
  log('All Available coffee: ');
  coffeeMachine.showAvailableCoffee().map((coffee, index) => {
    log(`${index}: ${coffee.getName()} - ${coffee.getPrice()} Ar`);
  });
  const choice = await askWithTimeout('Enter the number of coffee you want to drink: ');
  const choiceNumber = typeof choice === 'string' ? parseInt(choice, 10) : choice;

  if (typeof choiceNumber !== 'number' || isNaN(choiceNumber)) {
    log('Invalid choice. Please enter a valid number.');
    readline.close();
    process.exit(1);
  }

  const coffee = coffeeMachine.getCoffeeByIndex(choiceNumber);
  coffeeMachine.commandCoffee(coffee, true);
}

main();