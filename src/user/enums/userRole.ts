import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  user = 'USER',
  admin = 'ADMIN',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
