export class Account {
  private balance = 0;

  constructor(
    private readonly id: string,
    private readonly owner: string,
  ) {}

  getId(): string {
    return this.id;
  }

  getOwner(): string {
    return this.owner;
  }

  getBalance(): number {
    return this.balance;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error('Deposit amount must be greater than zero');
    }
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be greater than zero');
    }
    if (amount > this.balance) {
      throw new Error('Insufficient funds');
    }
    this.balance -= amount;
  }
}
