import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.findOne({ where: { id } });
  }

  async emailExists(email: string) {
    const user = await this.findByEmail(email);
    if (user) return true;
    return false;
  }
}
