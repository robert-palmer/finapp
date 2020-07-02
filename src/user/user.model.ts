import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { UserRole } from './enums/userRole';

@ObjectType()
export class UserModel {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field(() => UserRole)
  role: UserRole;
}
