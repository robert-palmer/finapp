import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserModel } from './user.model';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async test() {
    return 'Test is successful';
  }

  @Mutation(() => UserModel)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.userService.createUser(email, password);
  }
}
