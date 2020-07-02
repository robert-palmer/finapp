import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  accessToken: string;
}
