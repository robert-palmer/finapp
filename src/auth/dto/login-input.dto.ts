import { PartialType, InputType } from '@nestjs/graphql';
import { RegisterInput } from './register-input.dto';

@InputType()
export class LoginInput extends PartialType(RegisterInput) {}
