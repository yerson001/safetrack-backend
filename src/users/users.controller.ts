import { Body, Controller, Post,Get,Put,UseGuards, Param, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { use } from 'passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';

@Controller('users')
export class UsersController {
    
    constructor(private userService: UsersService){}

    @HasRoles(JwtRole.ADMIN,JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Get()
    finAll(){
        return this.userService.finAll();
    }

    //http://localhost/users/
    @Post()
    create(@Body() user: CreateUserDto){
        return this.userService.create(user);
    }

    //http://localhost:3000/users/:id
    @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id',ParseIntPipe) id:number,@Body() user:UpdateUserDto){
        return this.userService.update(id,user);
    }


    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard)
    updateWithImage(@UploadedFile(
        new ParseFilePipe({
            validators:[
                new MaxFileSizeValidator({ maxSize: 1024*1024*10}),
                new FileTypeValidator({fileType: '.(png|jpeg|jpj)'}),
            ],
        }
    ),
    ) file: Express.Multer.File,@Param('id',ParseIntPipe) id:number,@Body() user:UpdateUserDto) {
    //console.log(file);
    return this.userService.updateWithImage(file,id,user);
    }
}
