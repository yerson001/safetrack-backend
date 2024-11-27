import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRespository: Repository<User>
    ){}

    async create(user: CreateUserDto): Promise<User> {
        const newUser = this.userRespository.create(user);
        return await this.userRespository.save(newUser);
    }

    finAll(){
        return this.userRespository.find();
    }

}
