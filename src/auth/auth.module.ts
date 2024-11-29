import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwtcontants';

import { RolesService } from 'src/roles/roles.service';
import { Rol } from 'src/roles/rol.entity';
import { JwtStrategy } from './jwt/jwt.strategy';


@Module({
  imports:[TypeOrmModule.forFeature([User,Rol]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '12h' },
  }),],
  providers: [AuthService,JwtStrategy,RolesService],
  controllers: [AuthController]
})
export class AuthModule {}
