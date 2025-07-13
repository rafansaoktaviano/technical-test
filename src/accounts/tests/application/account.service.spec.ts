import { AccountService } from '../../application/account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CreateAccount', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should create a new account', () => {
    const acc = service.create('1', 'John Doe');
    expect(acc).toBeDefined();
    expect(acc.getId()).toBe('1');
    expect(acc.getOwner()).toBe('John Doe');
    expect(acc.getBalance()).toBe(0);
  });

  it('should deposit money into an account', () => {
    const acc = service.create('2', 'Rafa1');
    acc.deposit(100);

    expect(acc.getBalance()).toBe(100);
  });

  it('should throw and error when deposit with negative amount', () => {
    const acc = service.create('3', 'Rafa2');

    expect(() => {
      acc.deposit(-50);
    }).toThrowError('Deposit amount must be greater than zero');
  });

  it('should withdraw money from account', () => {
    const acc = service.create('4', 'Rafa3');

    expect(() => {
      acc.deposit(200);
    }).not.toThrow();

    expect(acc.getBalance()).toBe(200);

    acc.withdraw(50);
    expect(acc.getBalance()).toBe(150);
  });

  it('should throw and error when withdrawing with insufficient funds', () => {
    const acc = service.create('1', 'Rafa');

    expect(() => {
      acc.withdraw(100);
    }).toThrowError('Insufficient funds');

    expect(acc.getBalance()).toBe(0);
  });

  it('should throw an error when withdrawing with negative amount', () => {
    const acc = service.create('5', 'Rafa4');

    expect(() => {
      acc.withdraw(-50);
    }).toThrowError('Withdrawal amount must be greater than zero');
  });

  it('should throw an error when account not found', () => {
    expect(() => {
      service.deposit('123', 100);
    }).toThrowError('Account not found');

    expect(() => {
      service.withdraw('123', 50);
    }).toThrowError('Account not found');
  });

  it('should transfer money between accounts', () => {
    const acc1 = service.create('1', 'Rafa1');
    const acc2 = service.create('2', 'Rafa2');

    acc1.deposit(300);
    expect(acc1.getBalance()).toBe(300);
    expect(acc2.getBalance()).toBe(0);

    service.transfer(acc1.getId(), acc2.getId(), 100);

    expect(acc1.getBalance()).toBe(200);
    expect(acc2.getBalance()).toBe(100);
  })
});
