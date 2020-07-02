import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RegisterResponse } from './dto/register-response.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/decorators/graphql-auth.guard';
import { GetUserId } from 'src/common/decorators/GetUserId';
import { LoginResponse, LoginInput, RegisterInput } from './dto';
import { ResGql } from 'src/common/decorators/resGql.decorator';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => RegisterResponse)
  @UseGuards(GqlAuthGuard)
  async me(@GetUserId() userId: number) {
    return this.authService.me(userId);
  }

  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginInput, @ResGql() res: Response) {
    const login = await this.authService.login(input);

    res.cookie('token', login.accessToken);

    return login;
  }

  @Mutation(() => RegisterResponse)
  async register(@Args('input') input: RegisterInput) {
    return this.authService.register(input);
  }
}
