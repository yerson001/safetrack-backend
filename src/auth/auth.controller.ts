import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth-dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('register')
    register(@Body() user: RegisterAuthDto){
        return this.authService.register(user);
    }

    @Post('login')//http://localhost/auth/login
    login(@Body() loginData: LoginAuthDto){
        return this.authService.login(loginData);
    }


}
