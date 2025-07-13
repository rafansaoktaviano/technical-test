import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from '../../users/application/user.service';
import { User } from '../../users/domain/user.entity';
import { CreateUserInput } from '../application/dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'createUser' })
  createUser(@Args('user') input: CreateUserInput): Promise<User> {
    const user = new User();
    user.name = input.name;
    user.email = input.email;
    user.password = input.password;
    user.is_authenticated = false;

    return this.userService.createUser(user);
  }

  @Query(() => [User], { name: 'getAllUsers' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Query(() => User, { name: 'getUserById' })
  getUserById(@Args('id') id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }
}
