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

  public setQuantity(quantity: number): void {
    if (quantity > 100 && quantity < 0) {
      throw new Error ('Quantity most be in between of 100 % or 0 %');
    }
    this.quantity = quantity;
  }

  public toString(): string {
    return `Coffee: ${this.name}, Price: ${this.price}, Quantity: ${this.quantity} %`;
  }

  public isAvailable(): boolean {
    return this.quantity > 0;
  }

  public brew(): void {
    console.log(`Brewing ${this.name}...`);
    this.quantity--;
    console.log(
      `${this.name} brewed successfully! Remaining quantity: ${this.quantity}`
    );
  }

  public refill(quantity: number): void {
    if (quantity > 100) {
      throw new Error('Quantity refill most be < 100');
    }
    while (this.quantity <= 100 || quantity !== 0) {
      this.quantity++;
    }
    console.log(
      `${this.name} has been refilled. New quantity: ${this.quantity}`
    );
  }

  public getDetails(): string {
    return `Coffee Name: ${this.name}, Price: ${this.price}, Quantity: ${this.quantity}`;
  }
}

export default Coffee;
