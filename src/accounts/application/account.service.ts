import { Account } from '../domain/account.entity';

export class AccountService {
  private accounts: Account[] = [];

  create(id: string, owner: string): Account {
    const acc = new Account(id, owner);

    console.log(acc);
    

    this.accounts.push(acc);
    return acc;
  }

  deposit(id: string, amount: number): void {
    const account = this.accounts.find((acc) => acc.getId() === id);

    if (!account) {
      throw new Error('Account not found');
    }

    account.deposit(amount);
  }

  withdraw(id: string, amount: number): void {
    const account = this.accounts.find((acc) => acc.getId() === id);

    if (!account) {
      throw new Error('Account not found');
    }

    account.withdraw(amount);
  }

  transfer(fromId: string, toId: string, amount: number): void {
    const fromAccount = this.accounts.find((acc) => acc.getId() === fromId);
    const toAccount = this.accounts.find((acc) => acc.getId() === toId);

    if (!fromAccount || !toAccount) {
      throw new Error('Account not found');
    }

    fromAccount.withdraw(amount);
    toAccount.deposit(amount);
  }
}
