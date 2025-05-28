import { log } from 'console';
import { CoffeeMachineException } from './coffee-machine-exception';

class Coffee {
  private name: string;
  private price: number;
  private quantity: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
    this.quantity = 100;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public toString(): string {
    return `Coffee: ${this.name}, Price: ${this.price}, Quantity: ${this.quantity} %`;
  }

  public isAvailable(): boolean {
    return this.quantity > 0;
  }

  public setName(name: string): void {
    if (!name || name.trim() === '') throw new CoffeeMachineException('Name cannot be empty');
    this.name = name;
  }

  public setPrice(price: number): void {
    if (price < 0) throw new CoffeeMachineException('Price cannot be negative');
    this.price = price;
  }

  public setQuantity(quantity: number): void {
    if (quantity < 0) throw new CoffeeMachineException('Quantity cannot be negative');
    if (quantity > 100) throw new CoffeeMachineException('Quantity cannot exceed 100');
    this.quantity += quantity;
  }

  public brew(): void {
    if (this.quantity <= 0) throw new CoffeeMachineException(`Coffee ${this.name} is not available`);
    this.quantity -= 5;
    log(`Brewing ${this.name}...`);
  }
}

export default Coffee;
