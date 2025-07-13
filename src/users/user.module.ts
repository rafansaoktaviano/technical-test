import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application/user.service';
import { User } from './domain/user.entity';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  providers: [UserResolver, UserService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
