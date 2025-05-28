import { error } from 'console';
import Coffee from './coffee';
import CoffeeMachine from './coffee-machine';
import { CoffeeMachineException } from './coffee-machine-exception';

const nature = new Coffee('nature', 200);
const latte = new Coffee('latte', 600);
const creamy = new Coffee('creamy', 800);
const expresso = new Coffee('expresso', 1000);

async function main() {
  const coffeeMachine = new CoffeeMachine([expresso, latte, nature, creamy]);
  try {
    coffeeMachine.showAvailableCoffee();
    
    coffeeMachine.commandCoffee(latte, 600);
  
    coffeeMachine.refill(latte, 10);

    coffeeMachine.addCoffee(new Coffee('cappuccino', 700));
    coffeeMachine.removeCoffee('nature');
    
    coffeeMachine.showAvailableCoffee();
    coffeeMachine.commandCoffee(nature, 200);
    
    coffeeMachine.showAvailableCoffee();
  } catch (err) {
    if (err instanceof CoffeeMachineException) {
      error(`Error: ${err.message}`);
    } else {
      error('An unexpected error occurred');
    }
  }
}

main();
