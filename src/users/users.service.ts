import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Rol } from 'src/roles/rol.entity';
const uploadToCloudinary = require('../utils/cloud_storage');
//const uploadToCloudinary = require('./ruta/del/archivo');

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRespository: Repository<User>
    ){}

    async create(user: CreateUserDto): Promise<User> {
        const newUser = this.userRespository.create(user);
        return await this.userRespository.save(newUser);
    }

    finAll(){
        return this.userRespository.find({relations:['roles']});
    }

    async update(id: number,user: UpdateUserDto){
        const userFound = await this.userRespository.findOneBy({id: id});

        if(!userFound){
            throw new HttpException('Usuario no Existe',HttpStatus.NOT_FOUND);
        }

        const UpdateUser = Object.assign(userFound,user);

        return this.userRespository.save(UpdateUser);
    }


    async updateWithImage(file: Express.Multer.File,id: number,user:UpdateUserDto) {
        try {
            if (!file) {
                throw new Error('No se proporcionó un archivo para subir.');
            }
            const url = await uploadToCloudinary(file); 
    

            if(url===undefined && url===null){
                throw new HttpException('La Imagen no se pudo Guardar',HttpStatus.INTERNAL_SERVER_ERROR);
            }

            //console.log("URL del archivo subido:", url);

            const userFound = await this.userRespository.findOneBy({id: id});

            if(!userFound){
                throw new HttpException('Usuario no Existe',HttpStatus.NOT_FOUND);
            }
    
            user.image = url;
            const UpdateUser = Object.assign(userFound,user);
            return this.userRespository.save(UpdateUser);
            //return { success: true, url }; 
        } catch (error) {
            console.error("Error al subir la imagen:", error.message);
            throw new Error('Error al subir la imagen');
        }
    }

}
