import { log } from 'console';
import Coffee from './coffee';
import { CoffeeMachineException } from './coffee-machine-exception';

class CoffeeMachine {
  private coffees: Coffee[];
  private waterLevel: number = 100;
  private milkLevel: number = 100;
  private sugarLevel: number = 100;
  private beneficTotal: number = 0;

  constructor(coffees: Coffee[]) {
    const uniqueCoffees: Coffee[] = [];
    const names = new Set<string>();
    for (const coffee of coffees) {
      const name = coffee.getName().toLowerCase();
      if (!names.has(name)) {
        uniqueCoffees.push(coffee);
        names.add(name);
      }
    }
    this.coffees = uniqueCoffees;
  }

  public getAllCoffees(): Coffee[] {
    return this.coffees;
  }

  public getAllAvailableCoffees(): Coffee[] {
    return this.coffees.filter((c) => c.isAvailable());
  }

  public addCoffee(newCoffee: Coffee): void {
    const name = newCoffee.getName().toLowerCase();
    const exists = this.coffees.some((c) => c.getName().toLowerCase() === name);
    if (exists) {
      throw new CoffeeMachineException(`Coffee "${newCoffee.getName()}" already exists in the machine.`);
    }
    this.coffees.push(newCoffee);
  }

  public removeCoffee(coffeeName: string): void {
    const index = this.coffees.findIndex((c) => c.getName().toLowerCase() === coffeeName.toLowerCase());
    if (index === -1) {
      throw new CoffeeMachineException(`Coffee "${coffeeName}" not found in the machine.`);
    }
    this.coffees.splice(index, 1);
  }

  public showAvailableCoffee(): void {
    const availableCoffees = this.coffees.filter((c) => c.isAvailable);
    log(`Available coffees:\n${availableCoffees.map((c) => c.toString()).join('\n')}`);
  }

  public getCoffeeByName(name: string): Coffee {
    return this.coffees.filter((c) => c.getName().toLowerCase() === name.toLowerCase())[0];
  }

  public commandCoffee(coffee: Coffee, priceAmount: number): void {
    const payed = priceAmount >= coffee.getPrice();
    if (!payed) 
      throw new CoffeeMachineException('You need payed before command a coffee');
    if (!coffee.isAvailable())
      throw new CoffeeMachineException(`Coffee ${coffee.getName()} is not available`);
    if (this.waterLevel < 10)
      throw new CoffeeMachineException('Not enough water to brew coffee');
    if (this.milkLevel < 10 && coffee.getName().toLowerCase() === 'latte')
      throw new CoffeeMachineException('Not enough milk to brew latte');
    if (this.sugarLevel < 10 && coffee.getName().toLowerCase() === 'creamy')
      throw new CoffeeMachineException('Not enough sugar to brew creamy coffee');
    else {
      coffee.brew();
      this.waterLevel -= 10;
      if (coffee.getName().toLowerCase() === 'latte') {
        this.milkLevel -= 10;
      }
      if (coffee.getName().toLowerCase() === 'creamy') {
        this.sugarLevel -= 10;
      }
      this.beneficTotal += coffee.getPrice();
      log(`Enjoy your ${coffee.getName()}!`);
    }
  }

  public brew(coffee: Coffee): void {
    log(`Brewing ${coffee.getName()}...`);
    coffee.brew();
    log(
      `${coffee.getName()} brewed successfully! Remaining quantity: ${coffee.getQuantity()} %`
    );
  }

  public refill(coffee: Coffee, quantity: number): void {
    if (quantity > 100) {
      throw new CoffeeMachineException('Quantity refill most be < 100');
    }
    while (coffee.getQuantity() < 100) {
      if (quantity <= 0) {
        log('No more quantity to refill');
        break;
      }
      coffee.setQuantity(1);
      quantity -= 1;
    }
    log(
      `${coffee.getName()} has been refilled. ${coffee.getName()} is ${coffee.getQuantity()} % now.`
    );
  }
}

export default CoffeeMachine;
