import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth-dto';
import { compare} from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService:  JwtService
    ){}

    async register(user: RegisterAuthDto): Promise<{ user: User; token: string }> {
        const { email, phone } = user;
        const emailExist = await this.usersRepository.findOneBy({ email });
        if (emailExist) {
            throw new HttpException('El email ya existe', HttpStatus.CONFLICT);
        }
    
        const phoneExist = await this.usersRepository.findOneBy({ phone });
        if (phoneExist) {
            throw new HttpException('El Telefono ya existe', HttpStatus.CONFLICT);
        }
    
        const newUser = this.usersRepository.create(user);
        const userSaved = await this.usersRepository.save(newUser);
    
        const payload = { id: userSaved.id, name: userSaved.name };
        const token = this.jwtService.sign(payload);
    
        const data = {
            user: userSaved,
            token: 'Bearer ' + token,
        };
    
        delete data.user.password;
        return data; 
    }


    async login(loginData: LoginAuthDto){
        const {email,password} = loginData;
        const userFound = await this.usersRepository.findOneBy({email: email});

        if(!userFound){
            return new HttpException('El email no existe', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await compare(password,userFound.password);
        if(!isPasswordValid){
            return new HttpException('La contraseña es incorrecta',HttpStatus.FORBIDDEN);
        }

        const payload = {id: userFound.id, name: userFound.name};
        const token = this.jwtService.sign(payload);

        const data = {
            user: userFound,
            token: 'Bearer '+token
        }

        delete data.user.password;

        return data;

    }
}
