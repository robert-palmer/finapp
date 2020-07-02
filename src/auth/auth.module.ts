import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({}),
    JwtModule.register({
      signOptions: { expiresIn: '12h' },
      secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
        switch (requestType) {
          case JwtSecretRequestType.SIGN:
            return process.env.JWT_SECRET;
          case JwtSecretRequestType.VERIFY:
            return 'publickey';
          default:
            return process.env.JWT_SECRET;
        }
      },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
