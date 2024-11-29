import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { User } from 'src/users/user.entity';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Rol,
      User
    ])

  ],
  providers: [RolesService,JwtStrategy],
  controllers: [RolesController]
})
export class RolesModule {}
