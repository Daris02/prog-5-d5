import Coffee from "./Coffee";

export class CoffeeMachine {
  private coffees: Coffee[];

  constructor(coffees: Coffee[]) {
    this.coffees = coffees;
  }

  getAllCoffees(): Coffee[] {
    return this.coffees;
  }

  showAvailableCoffee(): Coffee[] {
    return this.coffees.filter((c) => c.isAvailable);
  }

  getCoffeeByIndex(index: number): Coffee {
    return this.coffees[index];
  }

  commandCoffee(coffee: Coffee, payed: boolean) {
    if (!payed) 
      throw new Error(`You need payed before command a coffee`);
    if (!this.showAvailableCoffee().includes(coffee))
      throw new Error (`Coffee ${coffee.getName()} not available`);
    else coffee.brew();
  }
}
