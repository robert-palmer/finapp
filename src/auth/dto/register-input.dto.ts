import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
