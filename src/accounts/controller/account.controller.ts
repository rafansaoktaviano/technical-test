import { Controller, Post, Body, Param } from '@nestjs/common';
import { AccountService } from '../application/account.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountService) {}

  @Post('create')
  create(@Body() body: { id: string; owner: string }) {
    return this.accountService.create(body.id, body.owner);
  }

  @Post(':id/deposit')
  deposit(@Param('id') id: string, @Body() body: { amount: number }) {
    this.accountService.deposit(id, body.amount);
    return { message: 'Deposit successful' };
  }

  @Post(':id/withdraw')
  withdraw(@Param('id') id: string, @Body() body: { amount: number }) {
    this.accountService.withdraw(id, body.amount);
    return { message: 'Withdrawal successful' };
  }

  @Post('transfer')
  transfer(@Body() body: { fromId: string; toId: string; amount: number }) {
    this.accountService.transfer(body.fromId, body.toId, body.amount);
    return { message: 'Transfer successful' };
  }
}
