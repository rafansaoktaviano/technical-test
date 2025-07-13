import { Module } from '@nestjs/common';
import { AccountsController } from './controller/account.controller';
import { AccountService } from './application/account.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountService],
})
export class AccountsModule {}