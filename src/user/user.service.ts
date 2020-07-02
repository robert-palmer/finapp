import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async findByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }

  async findById(userId: number) {
    return this.userRepo.findById(userId);
  }

  async createUser(email: string, password: string) {
    if (await this.userRepo.emailExists(email))
      throw Error(`Email ${email} is already taken`);

    const user = await this.userRepo
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({ email, password })
      .execute();

    const userId = user.identifiers[0].id;

    return this.userRepo.findById(userId);
  }
}
