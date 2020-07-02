import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginInput, RegisterInput } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async me(userId: number) {
    if (!userId) {
      return undefined;
    }
    return this.userService.findById(userId);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ email, password }: LoginInput) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw Error('Email or password is incorrect');

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw Error('Email or password is incorrect');

    const payload = { username: user.email, sub: user.id };
    const jwt = this.jwtService.sign(payload);

    return {
      id: user.id,
      email: user.email,
      accessToken: jwt,
    };
  }

  async register({ email, password }: RegisterInput) {
    const userExists = await this.userService.findByEmail(email);
    if (userExists) throw Error('user already exists');

    const encyptedPassword = await bcrypt.hash(password, 10);

    return this.userService.createUser(email, encyptedPassword);
  }
}
