export class CoffeeMachineException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CoffeeMachineException';
  }
}
