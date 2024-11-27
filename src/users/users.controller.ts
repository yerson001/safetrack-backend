import { Body, Controller, Post,Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    
    constructor(private userService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    finAll(){
        return this.userService.finAll();
    }

    //http://localhost/users/
    @Post()
    create(@Body() user: CreateUserDto){
        return this.userService.create(user);
    }


}
